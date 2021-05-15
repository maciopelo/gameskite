import React from 'react';
import gameImg from "../assets/game-pad.png"
import "../styles/myGames.scss"


const GAMES = [

    {
        image:gameImg,
        title:"Lego Avengers",
        status:"Played",
        rate:"7",
    },
    {
        image:gameImg,
        title:"Lego Avengers",
        status:"Played",
        rate:"7",
    },
    {
        image:gameImg,
        title:"Lego Avengers",
        status:"Played",
        rate:"7",
    },
    {
        image:gameImg,
        title:"Lego Avengers",
        status:"Played",
        rate:"7",
    },
    {
        image:gameImg,
        title:"Lego Avengers",
        status:"Played",
        rate:"7",
    },
    {
        image:gameImg,
        title:"Lego Avengers",
        status:"Played",
        rate:"7",
    },
    {
        image:gameImg,
        title:"Lego Avengers",
        status:"Played",
        rate:"7",
    },
    {
        image:gameImg,
        title:"Lego Avengers",
        status:"Played",
        rate:"7",
    }
]


const MyGamesPage = () => {


    const gamesResultList = GAMES.map( (game, idx) => {
        return(
        <div className="results-top-bar">
            <p className="results-game-num">{idx}</p>
            <p className="results-game-miniature"><img src={game.image} alt="Game Miniature"/></p>
            <p className="results-title">{game.title}</p>
            <p className="results-game-status">{game.status}</p>
            <p className="results-game-rate">{game.rate}</p>
        </div>
        );
    })


    return ( 
    <div className="my-games-page-container">
        <div className="my-games-content">

            <div className="content-header">

                <div className="content-text">
                    <p>Favourites</p>
                </div>

                <nav className="my-games-menu-list">
                    <ul>
                        <li>All</li>
                        <li>Games</li>
                        <li>Devs</li>
                        <li>Favs</li>
                        <li>Other</li>
                    </ul>
                </nav>

            </div>

            
            <div className="chosen-section">
                <p>Games</p>
            </div>

            <div className="my-games-result">
                <div className="results-top-bar">
                    <p className="results-game-num">#</p>
                    <p className="results-game-miniature">Minature</p>
                    <p className="results-title">Title</p>
                    <p className="results-game-status">Status</p>
                    <p className="results-game-rate">Rate</p>
                </div>
                {gamesResultList}
            </div>

        </div>
    </div> );
}
 
export default MyGamesPage;