import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_API_URL = "https://api.rawg.io/api";

const useGamesSearch = (gameName, pageNumber) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [games, setGames] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => { setGames([]); }, [gameName]);

  useEffect(  () => {
    setIsLoading(true);
    setIsError(false);

    let cancel;

    axios({
      method: "GET",
      url: `${BASE_API_URL}/games`,
      params: {
        key: process.env.REACT_APP_API_TOKEN,
        search: gameName,
        page: pageNumber,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        const foundGames = res.data.results;
        const nextPage = res.data.next;
        setGames((prevGames) => {
          return [...new Set([...prevGames, ...foundGames])];
        });
        setHasMore(nextPage !== null);
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setIsError(true);
      });

    return () => cancel();
  }, [gameName, pageNumber]);

  return { games, isLoading, isError, hasMore };
};

export default useGamesSearch;
