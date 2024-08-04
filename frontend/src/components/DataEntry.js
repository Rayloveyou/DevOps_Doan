
import { Field, Form, Formik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import productService from '../service/login/product/productService';
import Swal from 'sweetalert2';

export default function DataEntry() {
  const role = localStorage.getItem('role')
  const params = useParams()
  const [capacityList, setCapacityList] = useState([])
  const [listData, setListData] = useState([])
  const navigate = useNavigate()
  const handleListData = (values, resetForm) => {
    console.log(values);
    if (values.capacity === '' || values.priceSale === '' || values.quantity === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Chưa nhập đầy đủ dữ liệu',
        showConfirmButton: false,
        timer: 1500
      })
    }
    const capacity = capacityList.filter(element => +element.id === +values.capacity)
    const newData = {
      capacity: capacity[0],
      quantity: values.quantity,
      price: values.price,
      priceSale: values.priceSale
    };
    const updatedListData = [...listData, newData];
    setListData(updatedListData);
    resetForm({ values: { ...values, capacity: '', quantity: '', price: '', priceSale: '' } });
  }
  const findAllCapacity = async () => {
    try {
      const rs = await productService.fildAllCapacity()
      setCapacityList(rs.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    findAllCapacity()
  }, [])
  const handleDeleteDataProduct = (id) => {
    setListData(listData.filter(element => element.capacity.id != id))
  }
  return (
    <>
      {
        role !== "ROLE_ADMIN" ?
          <div>
            <img src="" width={'100%'} height={'100%'} />
          </div> :
          <div style={{
            marginTop: 150
          }} className="mb-5">
            <div>
              <NavLink to={'/'} className="bi bi-house text-secondary fs-4 text-decoration-none ms-5 ps-5">
                <span className="ms-2 fw-normal fs-5">Trang chủ</span>
              </NavLink>
            </div>
            <div className="container col-7 m-auto p-5 shadow-cosmetics-1 mt-3 bg-white">
              <div>
                <h3 className="text-center text-secondary bg-home py-2">Nhập Dữ Liệu Sản Phẩm</h3>
              </div>
              <div className="card-list-not-data col-3 my-2 m-auto">
                        <div className={'text-decoration-none text-secondary'}>
                          <img src={decodeURIComponent(params.img).replaceAll('*','%')} className="card-img-top" alt="..." width={'100%'} />
                          <div className="card-body">
                            <h6>{params.name}</h6>
                          </div>
                        </div>
                      </div>
              <div className='px-5'>
                <Formik
                  initialValues={{
                    productId: '',
                    capacityProductDTOS: [],
                    capacity: '',
                    price: '',
                    priceSale: '',
                    quantity: ''
                  }}
                  onSubmit={(value) => {
                    console.log(value);
                    const dataEntry = async () => {
                      value.productId = params.id
                      value.capacityProductDTOS = listData
                      try {
                         await productService.dataEntry(value);
                         Swal.fire({
                          icon: 'success',
                          title: 'Nhập dữ liệu thành công',
                          showConfirmButton: false,
                          timer: 1500
                        })
                         navigate('/product')
                      } catch (error) {
                        console.log(error);
                      }
                    }
                    dataEntry()
                  }}
                >
                  {({ values, resetForm }) => (
                    <Form>
                      <div className="row mt-4">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="capacity">Dung tích : </label>
                            <div className="input-field">
                              <Field component='select' className="input-login" name="capacity" id="capacity">
                                <option value=''>---Chọn---</option>
                                {
                                  capacityList.map((element, index) => (
                                    <option value={element.id} key={index}>
                                      {element.name}
                                    </option>
                                  ))
                                }
                              </Field>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="quantity">Số lượng :</label>
                            <div className="input-field">
                              <Field type="text" className="input-login" name="quantity" id="quantity" placeholder="" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="price">Giá dự kiến (Không bắt buộc) :</label>
                            <div className="input-field">
                              <Field type="text" className="input-login" name="price" id="price" placeholder="" />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="priceSale">Giá chính thức : </label>
                            <div className="input-field">
                              <Field type="text" className="input-login" name="priceSale" id="priceSale" placeholder="" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-4"></div>
                        <div className="col-4"></div>
                        <div className="col-4 text-end ">
                          <button
                            type="button"
                            onClick={() =>
                              handleListData(values, resetForm)
                            }
                            className=" button-buy">Nhập dữ liệu
                          </button>
                        </div>
                      </div>
                      <div className='mt-3'>
                        <div>
                          <h3 className="text-center text-secondary bg-home py-2">Danh Sách Dữ Liệu</h3>
                        </div>
                        <div>
                          {
                            listData.length !== 0 ?
                              <table className="w-100 mt-3 text-center table table-striped">
                                <thead>
                                  <tr className="text-dieucosmetics my-2">
                                    <th>Dung tích</th>
                                    <th>Số lượng</th>
                                    <th>Giá dự kiến</th>
                                    <th>Giá chính thức</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    listData.map(element => (
                                      <tr className="py-2">
                                        <td scope="row">{element.capacity.name}</td>
                                        <td>{element.quantity}</td>
                                        <td>{(+element.price).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}</td>
                                        <td>{(+element.priceSale).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}</td>
                                        <td><span type='button' onClick={() => handleDeleteDataProduct(element.capacity.id)} className="capacity-delete bi bi-trash text-dieucosmetics fs-5"></span></td>
                                      </tr>
                                    ))
                                  }
                                </tbody>
                              </table>
                              :
                              <div className='pt-2'>
                                <h5 className='text-danger text-center'>Chưa Có Danh Sách Dữ Liệu</h5>
                              </div>
                          }
                        </div>
                        <div className="row mt-4">
                          <div className="col-6 mt-3">
                            <NavLink to={'/product/not-data'} type='button' className="text-decoration-none button-buy float-end">Quay Lại</NavLink>
                          </div>
                          {
                            listData.length === 0 ?
                              <div className="col-6 mt-3">
                                <button className="button-buy" type="button" onClick={() => {
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Chưa có danh sách dữ liệu',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                                }}>Lưu dữ liệu</button>
                              </div> :
                              <div className="col-6 mt-3">
                                <button className="button-buy" type="submit">Lưu dữ liệu</button>
                              </div>
                          }
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>

            </div>
          </div>
      }
    </>
  )
}
