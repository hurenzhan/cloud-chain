import Dispatch from '@/libs/dispatch'
import { axios } from '@/libs/request'

export const loginDispatch = new Dispatch({
    register: ['/ctag/authenticate/register', 'post'],
    loginPassword: ['/ctag/authenticate/login/password', 'post'],
    loginCaptcha: ['/ctag/authenticate/login/captcha', 'post'],
})

export const fetchCaptcha = (data: Record<string, any>): Promise<any> => {
    return axios.post('/ctag/authenticate/captcha', data)
}