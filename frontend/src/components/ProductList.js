
import { useContext, useEffect, useState } from "react"
import productService from "../service/login/product/productService"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import ReactPaginate from "react-paginate"
//import Header from "./Header"
import { Slider } from "@mui/material"
import { debounce } from "lodash"; // Import debounce từ thư viện lodash (cần cài đặt lodash trước)
import cartService from "../service/login/cart/cartService"
import Swal from "sweetalert2"
import { QuantityContext } from "./QuantityContext"

export default function ProductList() {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectRadio, setSelectRadio] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();
    const [productTypeList, setProductTypeList] = useState([])
    const [producerList, setProducerList] = useState([])
    const search = new URLSearchParams(location.search).get('search') || '';

    const fetchOrders = async () => {
        try {
            const res = await productService.orderProductList();
            setProductList(res.data); // Điều chỉnh nếu cấu trúc phản hồi khác
        } catch (err) {
            console.error("Lỗi khi lấy đơn hàng:", err);
            setError(err.message || "Đã xảy ra lỗi khi lấy đơn hàng.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    
    const [valueSearch, setValueSearch] = useState({
        name: '',
        productTypeId: '',
        producerId: '',
        minPrice: 0,
        maxPrice: 100000000,
        nameSort:'',
    })
    const sortList = ['Tên: A-Z', 'Tên: Z-A', 'Giá: Giảm dần', 'Giá: Tăng dần']
    const { iconQuantity, setIconQuantity } = useContext(QuantityContext)
    const role = localStorage.getItem('role')
    const navigate = useNavigate()
    const findByName = async () => {
        try {
            const res = await productService.findByName({ ...valueSearch, name: search })
            console.log(res.data.content);
            setProductList(res.data.content)
            setCurrentPage(res.data.number)
            setPageCount(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    }
    const findAllProductType = async () => {
        try {
            const res = await productService.findAllProductType()
            setProductTypeList(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const findAllProducer = async () => {
        try {
            const res = await productService.findAllProducer()
            setProducerList(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        document.title = "Danh Sách Sản Phẩm";
    }, [])
    useEffect(() => {
        findByName()
    }, [valueSearch, search])
    useEffect(() => {
        findAllProductType()
        findAllProducer()
    }, [])
    const handleProductType = (id) => {
        setValueSearch({
            ...valueSearch,
            productTypeId: id,
        })
    }
    const handlePageClick = async (page) => {
        setCurrentPage(page.selected);
        const res = await productService.findByName(valueSearch, page.selected)
        setProductList(res.data.content)
    };
    const handleCancelRadio = (id) => {
        setValueSearch({
            ...valueSearch,
            producerId: id,
        })
        if (selectRadio === id) {
            setSelectRadio('');
            setValueSearch({
                ...valueSearch,
                producerId: '',
            })
        } else {
            setSelectRadio(id);
        }
    }
    const handlePriceChange = debounce((event) => {
        setValueSearch({
            ...valueSearch,
            minPrice: event.target.value[0],
            maxPrice: event.target.value[1]
        })
    }, 100);
    const handleSortProduct = async (event) => {
       setValueSearch({ ...valueSearch, nameSort : event.target.value })
        const res = await productService.findByName({ ...valueSearch,nameSort : event.target.value }, currentPage)
        setProductList(res.data.content)
    }
    const handleCreateCart = async (price, idCapacityProduct) => {
        try {
            const value = {
                quantity: '1',
                price: price,
                idCapacityProduct: idCapacityProduct,
            }
            const res = await cartService.createCart(value)
            console.log(res);
            if (res.data.message === 'Thêm sản phẩm vào giỏ hàng thành công') {
                setIconQuantity(iconQuantity + 1)
            }
            Swal.fire({
                icon: 'success',
                title: 'Sản phẩm đã được thêm vào giỏ hàng',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.log(error);
            if (error.response.status === 403) {
                navigate('/login')
                Swal.fire({
                    icon: 'error',
                    title: 'Vui lòng đăng nhập để mua hàng',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (error.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }

    }
    const handdleDeleteProduct = (id, image) => {
        Swal.fire({
            color: '#d4969a',
            text: 'BẠN CHẮC CHẮN MUỐN XÓA SẢN PHẨM ?',
            imageUrl: image,
            imageHeight: '150px',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Không',
            confirmButtonText: 'Có'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await productService.deleteProduct(id)
                    const res = await productService.findByName(valueSearch, productList.length === 1 ? currentPage - 1 : currentPage)
                    setCurrentPage(res.data.number)
                    setPageCount(res.data.totalPages);
                    setProductList(res.data.content)
                    Swal.fire({
                        title: 'Xóa sản phẩm thành công',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }
    console.log(productTypeList)
    return (
        <>
            <div className="row mx-0" style={{ marginTop: '117px' }}>
                <div className="px-0 image-container" style={{ height: '400px' }}>
                    <img src='/canteen.avif' width={'100%'} height={'100%'} />
                    <p className="image-text"></p>
                </div>
            </div>
            <div className="container mb-5" >
                <div className="row mx-0 px-5 py-3">
                    <div className="col-3 text-secondary py-5">
                        <div>
                            <h4>Danh mục</h4>
                        </div>
                        <hr />

                        {
                            role === 'ROLE_ADMIN' &&
                            <>
                                <div className="accordion-header mt-2 ms-2" id="headingOne">
                                    <button
                                        className="accordion-button fs-6 fw-bold"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#managerProduct"
                                        aria-expanded="true"
                                        aria-controls="collapseOne">
                                        Quản lí sản phẩm
                                    </button>
                                </div>
                                <div id="managerProduct"
                                    className="accordion-collapse collapse show "
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample">
                                    <div className="nav-item my-2 ms-4">
                                        <NavLink to={'/product/create'} className="nav-link link-dark  text-truncate"
                                            aria-current="page">Thêm mới sản phẩm</NavLink>
                                    </div>
                                    <div className="nav-item my-2 ms-4">
                                        <NavLink to={'/product/not-data'} className="nav-link link-dark  text-truncate"
                                            aria-current="page">Danh sách chưa nhập liệu</NavLink>
                                    </div>
                                    <div className="nav-item my-2 ms-4">
                                        <NavLink to={'/order/'} className="nav-link link-dark  text-truncate"
                                            aria-current="page">Quản lý đơn hàng</NavLink>
                                    </div>
                                    
                                </div>
                            </>
                        }
                        <div className="accordion-header mt-2 ms-2" id="headingOne">
                            <button
                                className="accordion-button fs-6 fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne">
                                Loại sản phẩm
                            </button>
                        </div>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse show "
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            {
                                productTypeList.map((element, index) => (
                                    <div className="nav-item my-2 ms-4" key={index}>
                                        <button
                                            className="nav-link link-dark  text-truncate"
                                            aria-current="page"
                                            onClick={() => handleProductType(element.id)}
                                        >
                                            {element.name}
                                        </button>
                                    </div>
                                ))
                            }
                            <div className="nav-item my-2 ms-4">
                                <button className="nav-link link-dark text-truncate fw-bold"
                                    aria-current="page"
                                    onClick={() => setValueSearch({
                                        ...valueSearch,
                                        productTypeId: ''
                                    })}>Tất cả sản phẩm</button>
                            </div>
                        </div>
                        <div className="accordion-header mt-2 ms-2" id="headingOne">
                            <button
                                className="accordion-button fs-6 fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne1"
                                aria-expanded="true"
                                aria-controls="collapseOne">
                                Thương hiệu
                            </button>
                        </div>
                        <div
                            id="collapseOne1"
                            className="accordion-collapse collapse show "
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            {
                                producerList.map((element, index) => (
                                    <div className="nav-item my-2 ms-4" key={index}>
                                        <input className="form-check-input-1" type="radio"
                                            checked={selectRadio === element.id}
                                            onClick={() => handleCancelRadio(element.id)}
                                            name="radio" id={element.id} />
                                        <label
                                            className="link-dark form-check-label text-truncate ms-2"
                                            htmlFor={element.id}
                                            aria-current="page"
                                        >
                                            {element.name}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="accordion-header mt-2 ms-2" id="headingTwo">
                            <button
                                className="accordion-button fs-6 fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne2"
                                aria-expanded="true"
                                aria-controls="collapseOne">
                                Khoảng giá
                            </button>
                        </div>
                        <div
                            id="collapseOne2"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample">
                            <div className="price-slider-wrapper">
                                <Slider
                                    valueLabelDisplay="on"
                                    aria-labelledby="price-slider"
                                    className='bg-white mt-5'
                                    valueLabelFormat={(value) => (value).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                    min={0} max={500000}
                                    value={[valueSearch.minPrice, valueSearch.maxPrice]}
                                    onChange={handlePriceChange} />
                            </div>
                        </div>
                    </div>
                    <div className="col-9 text-secondary p-5">
                        {
                            productList?.length === 0 ?
                                <div className="mt-5">
                                    <h4 className="text-danger">Xin lỗi! Hiện tại chưa có sản phẩm này</h4>
                                </div>
                                :
                                <>
                                    <div className="d-flex justify-content-between">
                                        <h4 >Tất cả sản phẩm</h4>
                                        <div className="float-end ">
                                            <label className="fs-5 text-secondary me-2">Sắp xếp </label>
                                            <select className="select-dieucosmetics border border-2" onChange={handleSortProduct}>
                                                <option className="select-sort" value={""}>---Chọn---</option>
                                                {
                                                    sortList.map((element, index) => (
                                                        <option className="select-sort" key={index} value={element}>
                                                            {element}
                                                        </option>
                                                    ))
                                                }

                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {
                                            productList?.map((element, index) => (
                                                <div type='button' className="card-list col-4 mt-2" key={index}>
                                                    <div className="cart-icon">
                                                        <i type="button" onClick={() => { handleCreateCart(element.capacityProductSet[0].priceSale, element.capacityProductSet[0].id) }} className="bi bi-cart-plus" aria-hidden="true"></i>
                                                    </div>
                                                    {
                                                        role === 'ROLE_ADMIN' &&
                                                        <>
                                                            <div className="trash-icon">
                                                                <i type='button' onClick={() => { handdleDeleteProduct(element.id, element.imageSet[0].name) }} className="bi bi-trash" />
                                                            </div>
                                                            <div className="edit-icon">
                                                                <NavLink to={`/product/update/${element.id}`} type='button' className="bi bi-pencil-square text-decoration-none edit-icon-nav" ></NavLink>
                                                            </div>
                                                        </>
                                                    }
                                                    <NavLink to={`detail/${element.id}`} className={'text-decoration-none text-secondary'}>
                                                        <img src={element.imageSet[0].name}
                                                            className="card-img-top" alt="..." width={'100%'} />
                                                        <div className="card-body">
                                                            {
                                                                element.name.length > 25 ? <h6>{element.name.slice(0, 25)}...</h6> : <h6>{element.name}</h6>
                                                            }
                                                            <p>
                                                                <span className='text-decoration-line-through'>{
                                                                    +element.capacityProductSet[0].price === 0 ? "" :
                                                                        (+element.capacityProductSet[0].price).toLocaleString(
                                                                            "vi-VN",
                                                                            { style: "currency", currency: "VND" }
                                                                        )
                                                                }</span>
                                                                <span className='text-danger fs-5 float-end fw-bold'>{
                                                                    (+element.capacityProductSet[0].priceSale).toLocaleString(
                                                                        "vi-VN",
                                                                        { style: "currency", currency: "VND" }
                                                                    )
                                                                }</span>
                                                            </p>
                                                        </div>
                                                    </NavLink>
                                                </div>
                                            ))
                                        }
                                        <div className="mt-5 d-flex justify-content-center">
                                            <ReactPaginate
                                                previousLabel="Trước"
                                                nextLabel="Sau"
                                                pageCount={pageCount}
                                                onPageChange={handlePageClick}
                                                containerClassName="pagination"
                                                previousClassName="page-item"
                                                previousLinkClassName="page-link"
                                                nextClassName="page-item"
                                                nextLinkClassName="page-link"
                                                pageClassName="page-item"
                                                pageLinkClassName="page-link"
                                                activeClassName="active"
                                                activeLinkClassName="page-link"
                                                // disabledLinkClassName="d-none"
                                                forcePage={currentPage}
                                            />
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}