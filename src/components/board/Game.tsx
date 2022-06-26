import {useContext} from "react";
import {Navigate} from "react-router-dom";

import {GameContext} from "../../providers/GameProvider";
import {PlayerContext} from "../../providers/PlayerProvider";

import {FourthPlayerTable} from "./FourthPlayerTable";
import {SixPlayerTable} from "./SixPlayerTable";
import {TwoPlayerTable} from "./TwoPlayerTable";

export const Game = () => {
  const {
    game,
    counter,
    currentPlayer,
    isGameCreated,
    isGameJoined,
    deal,
    playerPlayCard,
    incrementCounter,
    decrementCounter,
    resetCounter,
  } = useContext(GameContext);
  const {player} = useContext(PlayerContext);

  const handleDealCards = async () => {
    await deal(game.id, player.token);
  };

  const handlePlayCard = async (card: string) => {
    await playerPlayCard(card);
  };

  if (!isGameCreated || !isGameJoined) {
    return <Navigate replace to="/" />;
  }

  if (game.player_quantity === "Six") {
    return (
      <SixPlayerTable
        counter={counter}
        currentPl={currentPlayer}
        decrementCounter={decrementCounter}
        game={game}
        handleDealCards={handleDealCards}
        handlePlayCard={handlePlayCard}
        incrementCounter={incrementCounter}
        player={player}
        resetCounter={resetCounter}
      />
    );
  } else if (game.player_quantity === "Fourth") {
    return (
      <FourthPlayerTable
        counter={counter}
        currentPl={currentPlayer}
        decrementCounter={decrementCounter}
        game={game}
        handleDealCards={handleDealCards}
        handlePlayCard={handlePlayCard}
        incrementCounter={incrementCounter}
        player={player}
        resetCounter={resetCounter}
      />
    );
  }

  return (
    <>
      <TwoPlayerTable
        counter={counter}
        currentPl={currentPlayer}
        decrementCounter={decrementCounter}
        game={game}
        handleDealCards={handleDealCards}
        handlePlayCard={handlePlayCard}
        incrementCounter={incrementCounter}
        player={player}
        resetCounter={resetCounter}
      />
    </>
  );
};
