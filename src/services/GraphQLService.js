import {ShelfApi} from './Api';

export default class GraphQLService {

    static list(data) {
        return new Promise((resolve, reject) => {
            ShelfApi.post(`/graphql`, data)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }
}

