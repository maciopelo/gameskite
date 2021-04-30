import React from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import defaultIcon from "../assets/game-pad.png";

const ResultsList = ({ games, lastGameElementRef, handleGameClick, setChosenGame}) => {
  const gamesGrid = () => {
    const gamesRows = games.map((game, idx) => {

      const miniature = game.background_image || defaultIcon;

      if (games.length === idx + 1) {
        return (
          <Col xl={3} lg={6} md={6} sm={6}
            className="games-col"
            key={game + idx}
            ref={lastGameElementRef}
            onClick={()=> {
              setChosenGame(game);
              handleGameClick();
            }}
          >
            <Image src={miniature} className="game-miniature" />
            <h5>{game.name}</h5>
          </Col>
        );
      }

      return (
        <Col xl={3} lg={6} md={6} sm={6}
          className="games-col"
          key={game + idx}
          onClick={()=> {
            setChosenGame(game);
            handleGameClick();
          }}
        >
          <Image src={miniature} className="game-miniature" />
          <h5>{game.name}</h5>
        </Col>
      );
    });

    let result = [];
    let row = [];

    for (let idx = 0; idx < gamesRows.length + 1; idx++) {
      if (idx !== 0 && idx % 4 === 0) {
        result.push(<Row key={`row no.${idx}`}>{row}</Row>);
        row = [];
      }

      row.push(gamesRows[idx]);
    }

    return result;
  };


  return (
    <div className="games-results-list">
      <Container fluid>{gamesGrid()}</Container>
    </div>
  );
};

export default ResultsList;
