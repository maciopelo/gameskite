import axios from "axios";
import React, { useState, useRef, useCallback } from "react";
import "../styles/mainPage.scss";
import "../styles/modal.scss";
import ResultsList from "../components/ResultsList";
import useGamesSearch from "../hooks/useGamesSearch";
import GameSelectModal from "../components/GameSelectModal"



const SearchInput = ({gameTitle,handleGameSearch}) => {
  return ( 
    <div className="search-bar-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Enter a game title..."
          value={gameTitle}
          onChange={handleGameSearch}
        />
    </div>
   );
}
 

const MainPage = () => {

  const [gameTitle, setGameTitle] = useState("");
  const [pageNubmer, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false)
  const [chosenGame, setChosenGame] = useState(null)


  const { games, gamesDetails, isLoading, isError, hasMore } = useGamesSearch(gameTitle, pageNubmer);

  const observer = useRef();

  const lastGameElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const handleGameSearch = (e) => {
    setGameTitle(e.target.value);
    setPageNumber(1);
  };

  const handleModalHide = () =>{
    setChosenGame(null);
    setShowModal(false);
  }

  return (
    <div className="main-content">

      <SearchInput 
        gameTitle={gameTitle} 
        handleGameSearch={handleGameSearch}/>

      <ResultsList 
        games={gamesDetails} 
        lastGameElementRef={lastGameElementRef} 
        handleGameClick={() => setShowModal(true)}
        setChosenGame={setChosenGame}
      />

      <GameSelectModal show={showModal}  chosenGame={chosenGame} onHide={handleModalHide}/>

      <div>{isLoading && "Loading..."}</div>
      <div>{isError && "Something went wrong :("}</div>

    </div>
  );
};

export default MainPage;
