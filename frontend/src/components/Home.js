import { useEffect, useState } from "react"
import productService from "../service/login/product/productService"

import {  useNavigate } from "react-router-dom"
export default function Home() {
    const [productSaleList, setProductSaleList] = useState([])
    
    const getProductSaleList = async () => {
        try {
            const res = await productService.productSaleList()
            console.log(res);
            setProductSaleList(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProductSaleList()
        document.title = "Trang Chủ";
    }, [])

    const navigate = useNavigate()
    const handleDetailProduct = (id)=>{
        navigate('/product/detail/' + id)
    }
    console.log(productSaleList);
    return (
        <>
            <div style={{ marginTop: 117 }}>
                {/* Carousel */}
                <div id="demo" className="carousel slide" data-bs-ride="carousel">
                    {/* Indicators/dots */}
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#demo"
                            data-bs-slide-to={0}
                            className="active"
                        />
                        <button type="button" data-bs-target="#demo" data-bs-slide-to={1} />
                        <button type="button" data-bs-target="#demo" data-bs-slide-to={2} />
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="/anh2.jfif"
                                alt="New York"
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />


                        </div>
                        <div className="carousel-item">
                            <img
                                src="/anh1.png"
                                alt=""
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />

                        </div>
                        <div className="carousel-item">
                            <img
                                src="/anh3.jfif"
                                alt=""
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" />
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" />
                    </button>
                </div>
            </div>
            <section className="service-policy-area section-space container">
                <div className='container mt-5'>
                    <div className="d-flex">
                        <div className="col-lg-2 mx-4 px-0">
                            <a href="">
                                <img src="/haohao.png"
                                    className="d-block w-100  h-100 img-producer" alt="..." />
                            </a>
                        </div>
                        <div className="col-lg-2 mx-4 px-0">
                            <a href="">
                                <img src="/hongha.png"
                                    className="d-block w-100 h-100 img-producer" alt="..." />
                            </a>
                        </div>
                        <div className="col-lg-2 mx-4 px-0">
                            <a href="">
                                <img src="oishi.png"
                                    className="d-block w-100 h-100 img-producer" alt="..." />
                            </a>
                        </div>
                        <div className="col-lg-2 mx-4 px-0">
                            <a href="">
                                <img src="lavie.png"
                                    className="d-block w-100 h-100 img-producer" alt="..." />
                            </a>
                        </div>
                        <div className="col-lg-2 mx-4 px-0">
                            <a href="">
                                <img src="/merino.png"
                                    className="d-block w-100 h-100 img-producer" alt="..." />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="service-policy-area section-space container">
                <div ><h2 className='text-center bg-home text-secondary py-3'>SẢN PHẨM KHUYẾN MÃI</h2></div>
                <div className='container'>
                    <div id="carouselExampleControls" className="carousel carousel-dark slide " data-bs-ride="carousel">
                        <div className="carousel-inner ">
                            <div className="carousel-item active">
                                <div className="row d-flex justify-content-center mt-3">
                                    {
                                        productSaleList.slice(0,4).map((element, index) => (
                                            <div className="col-lg-2 mx-4 px-0" key={index}>
                                                <div type='button' onClick={()=>handleDetailProduct(element.id)} className="card-1" >
                                                    <img src={element.imageName} className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <div>{
                                                            element.name.length > 20 ? <h6>{element.name.slice(0, 20)}...</h6> : <h6>{element.name}</h6>
                                                        }</div>
                                                        <p>
                                                                <span className='text-decoration-line-through'>{
                                                                    +element.capacityProductPrice === 0 ? "": 
                                                                    (+element.capacityProductPrice).toLocaleString(
                                                                        "vi-VN",
                                                                        { style: "currency", currency: "VND" }
                                                                    )
                                                                }</span>
                                                                <span className='text-danger fs-6 float-end fw-bold'>{
                                                                    (+element.capacityProductPriceSale).toLocaleString(
                                                                        "vi-VN",
                                                                        { style: "currency", currency: "VND" }
                                                                    )
                                                                }</span>
                                                            </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row d-flex justify-content-center mt-3">
                                {
                                        productSaleList.slice(4).map((element, index) => (
                                            <div className="col-lg-2 mx-4 px-0" key={index}>
                                                <div type='button' onClick={()=>handleDetailProduct(element.id)} className="card-1" >
                                                    <img src={element.imageName} className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <div>{
                                                            element.name.length > 20 ? <h6>{element.name.slice(0, 20)}...</h6> : <h6>{element.name}</h6>
                                                        }</div>
                                                        <p>
                                                                <span className='text-decoration-line-through'>{
                                                                    +element.capacityProductPrice === 0 ? "": 
                                                                    (+element.capacityProductPrice).toLocaleString(
                                                                        "vi-VN",
                                                                        { style: "currency", currency: "VND" }
                                                                    )
                                                                }</span>
                                                                <span className='text-danger fs-6 float-end fw-bold'>{
                                                                    (+element.capacityProductPriceSale).toLocaleString(
                                                                        "vi-VN",
                                                                        { style: "currency", currency: "VND" }
                                                                    )
                                                                }</span>
                                                            </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </section>
            <hr className='mx-5 hr-dieucosmetics' />

            <div className="container px-0 mt-5">
                <div className="row mx-0 mt-2 mb-5 ms-5">
                    <div className="col-4">
                        <h4 style={{ color: 'GrayText', marginTop: 20 }}>
                        Kem Merino x trái cây rừng xốt dâu mang một hương chua nhẹ pha trộn với vị ngọt tự nhiên tinh tế của các loại trái cây rừng, tạo nên một cảm giác mát lạnh và sảng khoái trên đầu lưỡi. 
                        </h4>
                    </div>
                    <div className="col-4">
                        <img
                            className="w-100 h-100 shadow"
                            src="/merino_kem.webp"
                            alt=""
                        />
                    </div>
                    <div className="col-4">
                        <h4 style={{ textAlign: "center", color: 'GrayText', paddingTop: 20 }}>
                        Kem Merino kool trái cây rừng
                        </h4>
                        <h6 style={{
                            color: 'black',
                            lineHeight: 2,
                            fontFamily: '"Cormorant Infant", "serif"'
                        }}>
                           Kem Merino thơm ngon với các hương vị truyền thống quen thuộc luôn là món tráng miệng tuyệt vời cho cả gia đình. Hãy tận hưởng cuộc vui bên cạnh bạn bè và gia đình cùng với những sản phẩm thơm ngon thiệt đã nhé!
                        </h6>
                    </div>
                </div>
                <div className="shadow-cosmetics-1">
                    <div className="row mx-0 bg-home text-white ">
                        <div className="row container mx-0 px-0">
                            <div className="column col-6 px-0 figure" id="zoomIn">
                                <img className="w-100 h-100 " src="/goihaohao.jfif" />
                            </div>
                            <div className="col-6 mt-2" style={{background: "white"}}>
                                <h3 style={{ textAlign: "center", color: 'GrayText', paddingTop: 30 }}>Mì hảo hảo tôm chua cay gói 75g</h3>
                                <h6 style={{
                                    color: 'black',
                                    lineHeight: 2,
                                    paddingTop: 20,
                                    paddingLeft: 30,
                                    paddingRight: 30,
                                    fontFamily: '"Cormorant Infant", "serif"',
                                    background: "white"
                                }}>
                                    Mì ăn liền dai ngon hòa quyện trong nước súp tôm chua cay, đậm đà chính hãng mì Hảo Hảo, hương thơm quyến rũ ngất ngây. Mì Hảo Hảo vị tôm chua cay gói 75g là lựa chọn hấp dẫn không thể bỏ qua đặc biệt là cho những ngày bận rộn cần bổ sung năng lượng nhanh chóng đơn giản mà vẫn đủ chất
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-0 ">
                        <div className="row container mx-0 px-0 ">
                            <div className="col-6 mt-2 px-0" >
                                <h3 style={{ textAlign: "center", color: 'GrayText', paddingTop: 30 }}>LaVie 350ml</h3>
                                <h6 style={{
                                    color: 'black',
                                    lineHeight: 2,
                                    paddingTop: 10,
                                    paddingLeft: 30,
                                    paddingRight: 30,
                                    fontFamily: '"Cormorant Infant", "serif"'
                                }}>
                                     Sinh ra từ nguồn khoáng quý , nước khoáng thiên nhiên La Vie giữ trọn hương vị thanh khiết cùng với 6 loại khoáng chất thiết yếu, giúp mang đến cho bạn Chút Yên từ Thiên Nhiên để tái tạo tâm trí và cơ thể, điều mà các loại nước tinh khiết đóng chai không có.</h6>
                            </div>
                            <div className="col-6 px-0 column figure" id="zoomIn">
                                <img className="w-100 h-100 " src="/chailavie.jpg" style={{height: "100px!important"}}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <hr className='mx-5 hr-dieucosmetics mt-5' />

            <div className="container mt-5 py-5 mb-5" style={{background: "white"}}>
                <div className="row ">
                    <div className="col-lg-3 col-md-6 col-sm-6">

                        <div className="service-policy-item">
                            <div className="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/free_shipping.png" alt=""/>
                            </div>
                            <div className="policy-terms">
                                <h5>Miễn Phí Giao Hàng</h5>
                                <p>Miễn phí giao hàng toàn quốc</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">

                        <div className="service-policy-item">
                            <div className="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/support247.png" alt="" />
                            </div>
                            <div className="policy-terms">
                                <h5>Hỗ Trợ 24/7</h5>
                                <p>Hỗ trợ 24h trong 1 ngày</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">

                        <div className="service-policy-item">
                            <div className="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/money_back.png" alt="" />
                            </div>
                            <div className="policy-terms">
                                <h5>Hoàn Trả Lại Tiền</h5>
                                <p>Hoàn trả lại tiền trong vòng 30 ngày</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">

                        <div className="service-policy-item">
                            <div className="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/promotions.png" alt="" />
                            </div>
                            <div className="policy-terms">
                                <h5>Giảm Giá Đặt Hàng</h5>
                                <p>Giảm giá 5% trên mỗi đơn hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}