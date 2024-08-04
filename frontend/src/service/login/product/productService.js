import request from "../../../request"

const detail = (id)=>{
    try {
        return request.get(`/api/product/detail?id=${id}`)
    } catch (error) {
        console.log(error);
    }
}
const findByName = ({name,productTypeId,producerId,minPrice,maxPrice,nameSort},page)=>{
    console.log({ name,productTypeId,producerId,minPrice,maxPrice,nameSort});
    try {
        return request.get(`/api/product?name=${name?name:''}&productTypeId=${productTypeId?productTypeId:''}&producerId=${producerId?producerId:''}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page ? page : 0}&sortType=${nameSort}`)
    } catch (error) {
        console.log(error);
    }
}
const productListNotData = (page)=>{
    const token = localStorage.getItem('token')
    try {
        return request.get(`/api/product/not-data?page=${page ? page : 0}`, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const findAllProductType = ()=>{
    try {
        return request.get(`/api/product-type`)
    } catch (error) {
        console.log(error);
    }
}
const findAllProducer = ()=>{
    try {
        return request.get(`/api/producer`)
    } catch (error) {
        console.log(error);
    }
}
const fildAllCapacity = ()=>{
    try {
        return request.get(`/api/capacity`)
    } catch (error) {
        console.log(error);
    }
}
const productSaleList = ()=>{
    try {
        return request.get(`/api/product/sale-list`)
    } catch (error) {
        console.log(error);
    }
}


const orderProductList =async (value)=>{
    const token = localStorage.getItem('token');
    console.log(value);
    try {
        const res = await request.get(`/api/order/`, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


const productCreate = (value)=>{
    const token = localStorage.getItem('token')
    console.log(value);
    try {
        return request.post(`/api/product/create`,{ ...value }, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const deleteProduct = (id)=>{
    const token = localStorage.getItem('token')
    try {
        return request.delete(`/api/product/delete?id=${id}`, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const dataEntry = (value)=>{
    const token = localStorage.getItem('token')
    try {
        return request.post(`/api/product/data-entry`,{ ...value }, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const dataEntryUpdate = (value)=>{
    for (const element of value.capacityProductDTOS) {
        if(element.price===null){
          element.price = ''
        }
    }
    const token = localStorage.getItem('token')
    try {
        return request.put(`/api/product/data-entry-update`,{ ...value }, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const productUpdate = (value)=>{
    const token = localStorage.getItem('token')
    try {
        return request.put(`/api/product/update`,{ ...value }, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}



export const productService = {
    detail,
    findByName,
    findAllProductType,
    findAllProducer,
    productSaleList,
    fildAllCapacity,
    productCreate,
    deleteProduct,
    productListNotData,
    dataEntry,
    productUpdate,
    dataEntryUpdate,
    orderProductList

}
export default productService