import React from 'react'
import GamesAppImage from "../static/images/n64-image.webp"

const Home = () => {
    return (<div className="text-center">
        <h2>Games Shelf App</h2>
        <img src={GamesAppImage} alt="Games Shelf App"/>
    </div>);
}

export default Home;