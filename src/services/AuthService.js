import {ShelfApi} from './Api';

export default class AuthService {

    static doLogin(data) {
        return new Promise((resolve, reject) => {
            ShelfApi.post(`/auth/signin`, data)
                .then(response => {
                    ShelfApi.defaults.headers.common['Authorization'] =  `Bearer ${response.data.token}`;
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }
}

