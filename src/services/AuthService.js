import axios from 'axios';

const API_DOMAIN = "http://localhost:4000/v1";

export default class AuthService {

    static doLogin(data){
        return new Promise((resolve, reject) => {
            axios.post(`${API_DOMAIN}/auth/signin`, data)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }





}

