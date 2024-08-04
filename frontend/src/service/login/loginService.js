import request from "../../request"

const login = (value)=>{
    try {
        return request.post('/api/login', { ...value })
    } catch (error) {
        return error
    }
    
}
const register = (value)=>{
    try {
        return request.post('/api/register', { ...value })
    } catch (error) {
        return error
    }
    
}
const changePassword = (value)=>{
    const token = localStorage.getItem('token')
    return request.put('/api/change-password',{ ...value }, {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    })
}

const forgotPassword = (value)=>{
    return request.post('/api/forgot-password', { ...value })
}

const checkOtp = (value)=>{
    return request.put('/api/check-otp', { ...value } )
}

const resetPassword = (value)=>{
    return request.put('/api/reset-password',{ ...value })
}

const loginService = {
    login,
    changePassword,
    forgotPassword,
    checkOtp,
    resetPassword,
    register
}
export default loginService