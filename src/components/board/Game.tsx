import {useContext} from "react";
import {Navigate} from "react-router-dom";

import {getPlayer} from "../../helpers/authApi";
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

  const setAvatar = async (username: string) => {
    const res = await getPlayer(username);

    // console.log(res.data[0].avatar);
    if (res.status === "OK") {
      return res.data[0].avatar;
    }
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
        setAvatar={setAvatar as any}
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
        setAvatar={setAvatar as any}
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
        setAvatar={setAvatar as any}
      />
    </>
  );
};
