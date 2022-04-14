import {ShelfApi} from './Api';

export default class ShelfService {
    static addGame(data) {
        return new Promise((resolve, reject) => {
            ShelfApi.post(`/games/add`, data)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }

    static editGame(data) {
        return new Promise((resolve, reject) => {
            ShelfApi.put(`/games/edit/${data.id}`, data)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }

    static deleteGame(id) {
        return new Promise((resolve, reject) => {
            ShelfApi.delete(`/games/delete/${id}`)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err.message)
            })
        })
    }


    static getAllGames(genreId, platformId) {
        const params = {};
        if (genreId) params.genre_id = genreId
        if (platformId) params.platform_id = platformId

        return new Promise((resolve, reject) => {
            ShelfApi.get(`/games`, {params: params})
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }

    static getGame(gameId) {
        return new Promise((resolve, reject) => {
            ShelfApi.get(`/games/${gameId}`)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }

    static getGenres() {
        return new Promise((resolve, reject) => {
            ShelfApi.get(`/genres`)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }

    static getPlatforms() {
        return new Promise((resolve, reject) => {
            ShelfApi.get(`/platforms`)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }
}

