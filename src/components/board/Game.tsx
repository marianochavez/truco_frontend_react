import {useContext} from "react";
import {Navigate} from "react-router-dom";

import {GameContext} from "../../providers/GameProvider";
import {PlayerContext} from "../../providers/PlayerProvider";

import {FourthPlayerTable} from "./FourthPlayerTable";
import {SixPlayerTable} from "./SixPlayerTable";
import {TwoPlayerTable} from "./TwoPlayerTable";

export const Game = () => {
  const {game, currentPlayer, isGameCreated, isGameJoined, deal, playerPlayCard} =
    useContext(GameContext);
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

  if (game.player_quantity === 6) {
    return <SixPlayerTable />;
  } else if (game.player_quantity === 4) {
    return (
      <FourthPlayerTable
        currentPl={currentPlayer}
        game={game}
        handleDealCards={handleDealCards}
        handlePlayCard={handlePlayCard}
        player={player}
      />
    );
  }

  return (
    <>
      <TwoPlayerTable
        currentPl={currentPlayer}
        game={game}
        handleDealCards={handleDealCards}
        handlePlayCard={handlePlayCard}
        player={player}
      />
    </>
  );
};
