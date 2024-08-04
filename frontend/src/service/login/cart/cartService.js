import request from "../../../request"

const findAllCart = (page)=>{
    const token = localStorage.getItem('token')
    try {
        return request.get(`/api/cart?page=${page ? page : 0}`,{
            headers:
            {
                'Authorization': 'Bearer ' + token
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const createCart = (value)=>{
    console.log(value);
    const token = localStorage.getItem('token')
    try {
        return request.post(`/api/cart`,{ ...value },{
            headers:
            {
                'Authorization': 'Bearer ' + token
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const updateCart = (value)=>{
    console.log(value);
    const token = localStorage.getItem('token')
    try {
        return request.put(`/api/cart`,value,{
            headers:
            {
                'Authorization': 'Bearer ' + token
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const deleteCart = (id)=>{
    const token = localStorage.getItem('token')
    try {
        return request.delete(`/api/cart/${id}`,{
            headers:
            {
                'Authorization': 'Bearer ' + token
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const payment = (value)=>{
    const token = localStorage.getItem('token')
    try {
        return request.post(`/api/cart/payment`,{ ...value },{
            headers:
            {
                'Authorization': 'Bearer ' + token
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const handleVNPay = (value)=>{
    const token = localStorage.getItem('token')
    try {
        return request.post(`/api/payment`,{ ...value },{
            headers:
            {
                'Authorization': 'Bearer ' + token
            }
        })
    } catch (error) {
        console.log(error);
    }
}
export const cartService = {
    findAllCart,
    createCart,
    deleteCart,
    updateCart,
    payment,
    handleVNPay
}
export default cartService