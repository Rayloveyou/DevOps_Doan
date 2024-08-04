import React from 'react'
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom'
import productService from '../service/login/product/productService';
import { useEffect } from 'react';

export default function ListProductNotData() {
  const [productListNotData, setProductListNotData] = useState([])
  const role = localStorage.getItem('role')
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const listNotData = async () => {
    try {
      const res = await productService.productListNotData()
      setProductListNotData(res.data.content)
      setCurrentPage(res.data.number)
      setPageCount(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    listNotData()
  }, [])

  const handlePageClick = async (page) => {
    setCurrentPage(page.selected);
    const res = await productService.productListNotData(page.selected)
    setProductListNotData(res.data.content)
  };
  return (
    <>
      {
        role !== "ROLE_ADMIN" ?
          <div>
            <img src="" width={'100%'} height={'100%'} />
          </div> :
          <div style={{
            marginTop: 150
          }} className="mb-5 ">
            <div>
              <NavLink to={'/'} className="bi bi-house text-secondary fs-4 text-decoration-none ms-5 ps-5">
                <span className="ms-2 fw-normal fs-5">Trang chủ</span>
              </NavLink>
              <span className="ms-2 fw-normal fs-5 text-secondary">/</span>
              <NavLink to={'/product'} className={'text-secondary fs-4 text-decoration-none  ps-2'}>
                <span className="fw-normal fs-5">Sản phẩm</span>
              </NavLink>
              
            </div>
            <div className="container p-5 shadow-cosmetics-1 mt-3 bg-white">
              <div>
                <h3 className="text-center text-secondary bg-home py-2">Danh Sách Sản Phẩm Chưa Nhập Dữ Liệu</h3>
              </div>
              <div className='p-5'>
                <div className="row px-5">
                  {
                    productListNotData.map((element, index) => (
                      <div type='button' className="card-list-not-data col-3 my-2" key={index}>
                        <div className={'text-decoration-none text-secondary'}>
                          <img src={element.imageSet[0].name} className="card-img-top" alt="..." width={'100%'} />
                          <div className="card-body">
                            {
                              <h6>{element.name}</h6>
                            }
                          </div>
                          <div className="capacity-overlay">
                            <NavLink to={`/product/data-entry/${element.id}/${element.name}/${encodeURIComponent(element.imageSet[0].name.replaceAll('%', '*'))}`} ton className="button-data-entry">Nhập dữ liệu</NavLink>
                          </div>
                        </div>
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
                      forcePage={currentPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}
