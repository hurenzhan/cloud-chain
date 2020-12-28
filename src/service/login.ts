import Dispatch from '@/libs/dispatch'
import { axios } from '@/libs/request'
import { AxiosPromise } from 'axios'

export const loginDispatch = new Dispatch({
    register: ['/ctag/authenticate/register', 'post'],
})

export const fetchCaptcha = (data: Record<string, any>): AxiosPromise<any> => {
    return axios.post('/ctag/authority/captcha', data)
}