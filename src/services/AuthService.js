import {ShelfApi} from './Api';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class AuthService {

    static doLogin(data) {
        return new Promise((resolve, reject) => {
            ShelfApi.post(`/auth/signin`, data)
                .then(response => {
                    const token = response.data.token;
                    ShelfApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    cookies.set('token', token, {path: '/'});
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }
}

