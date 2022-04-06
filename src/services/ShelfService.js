import axios from 'axios';

const API_DOMAIN = "http://localhost:4000/v1";

export default class ShelfService {
    static getAllGames(genreId, platformId) {

        const params = {};

        if (genreId) params.genre_id = genreId
        if (platformId) params.platform_id = platformId

        return new Promise((resolve, reject) => {
            axios.get(`${API_DOMAIN}/games`, {params: params})
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })

    }

    static getGame(gameId) {
        return new Promise((resolve, reject) => {
            axios.get(`${API_DOMAIN}/games/${gameId}`)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }

    static getGenres() {
        return new Promise((resolve, reject) => {
            axios.get(`${API_DOMAIN}/genres`)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }

    static getPlatforms() {
        return new Promise((resolve, reject) => {
            axios.get(`${API_DOMAIN}/platforms`)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                reject(err)
            })
        })
    }
}

