import Dispatch from '@/libs/dispatch'
import { axios } from '@/libs/request'
import { AxiosPromise } from 'axios'

export const loginDispatch = new Dispatch({
    login: ['/api/breeds/image/random', 'get'],
})

// export const testServiceGet = () => {
//     return axios.get('/api/breeds/image/random')
// }

// export const testServicePost = (data: Record<string, any>): AxiosPromise<any> => {
//     return axios.post('/api/breeds/image/random', data)
// }