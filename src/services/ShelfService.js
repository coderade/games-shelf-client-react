const API_DOMAIN = "http://localhost:4000/v1";

export default class ShelfService {
    static getAllGames() {
        return new Promise((resolve, reject) => {
            fetch(`${API_DOMAIN}/games`)
                .then(response => {
                    if (!response.ok){
                        reject(response)
                    }
                    else{
                        response.json().then(json => resolve(json))
                    }
                })
        })

    }

    static getGame(gameId) {
        return new Promise((resolve, reject) => {
            fetch(`${API_DOMAIN}/games/${gameId}`)
                .then(response => {
                    if (!response.ok){
                        reject(response)
                    }
                    else{
                        response.json().then(json => resolve(json))
                    }
                })
        })

    }
}

