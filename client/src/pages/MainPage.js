import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import "../styles/mainPage.scss";
import ResultsList from "../components/ResultsList";
import useGamesSearch from "../hooks/useGamesSearch";

const BASE_API_URL = "https://api.rawg.io/api";
const PAGE_SIZE = 40;

const MainPage = () => {

  const [gameTitle, setGameTitle] = useState("");
  const [pageNubmer, setPageNumber] = useState(1);

  const { games, isLoading, isError, hasMore } = useGamesSearch(gameTitle, pageNubmer);

  const observer = useRef();

  const lastGameElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
          console.log("visible");
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [isLoading, hasMore]
  );

  const handleGameSearch = (e) => {
    setGameTitle(e.target.value);
    setPageNumber(1);
  };

  return (
    <div className="main-content">
      <div>
        <p>SearchBar</p>
        <input
          type="text"
          placeholder="Enter a game title..."
          value={gameTitle}
          onChange={handleGameSearch}
        />
      </div>
      <ResultsList games={games} lastGameElementRef={lastGameElementRef} />
      <div>{isLoading && "Loading..."}</div>
      <div>{isError && "Something went wrong :("}</div>
    </div>
  );
};

export default MainPage;
