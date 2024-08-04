import request from "../../../request"

const detail = () => {
    const token = localStorage.getItem('token')
    try {
        const res = request.get('/api/customer/detail',
            {
                headers:
                {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        return res
    } catch (error) {
        console.log(error);
    }
}
const update = (value) => {
    const token = localStorage.getItem('token')
    try {
        const res = request.patch('/api/customer',{...value},
            {
                headers:
                {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        return res
    } catch (error) {
        console.log(error);
    }
}
export const customerService = {
    detail,
    update
}
export default customerService