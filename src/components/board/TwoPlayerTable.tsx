/* eslint-disable react-hooks/exhaustive-deps */
import {Avatar, Box, Button, Flex, Grid, GridItem, HStack, Text} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {AiOutlineStar} from "react-icons/ai";

import {Counters, Game} from "../../providers/GameProvider";
import {Player} from "../../providers/PlayerProvider";

import {Card} from "./Card";
import {Counter} from "./Counter";

interface Props {
  game: Game;
  player: Player;
  currentPl: string;
  counter: Counters;
  handleDealCards: () => void;
  handlePlayCard: (card: string) => void;
  incrementCounter: (counter: string) => void;
  decrementCounter: (counter: string) => void;
  resetCounter: () => void;
  setAvatar: (username: string) => Promise<string>;
  handleGoToDeck: () => void;
  handleBurnCard: (card: string) => void;
}

export const TwoPlayerTable = ({
  game,
  currentPl,
  counter,
  handleDealCards,
  handlePlayCard,
  incrementCounter,
  decrementCounter,
  resetCounter,
  setAvatar,
  handleGoToDeck,
  handleBurnCard,
}: Props) => {
  const currentPlayer: any = game[currentPl as keyof Game];
  const [player1avatar, setPlayer1avatar] = useState("");
  const [player2avatar, setPlayer2avatar] = useState("");

  useEffect(() => {
    setAvatar(game.player_1.username).then((res) => setPlayer1avatar(res));
    setAvatar(game.player_2.username).then((res) => setPlayer2avatar(res));
  }, []);

  return (
    <>
      <Box>
        <Text
          alignItems="center"
          color="yellow.200"
          display="flex"
          flexDir="row"
          fontSize="2xl"
          fontWeight="bold"
          gap={3}
          justifyContent="center"
        >
          <AiOutlineStar color="yellow" />
          Ronda {game.round}
          <AiOutlineStar color="yellow" />
        </Text>
        <Grid
          className="animate__animated animate__fadeIn animate__slower"
          gridTemplateRows={"1fr 50px 1fr"}
          marginTop={2}
          templateColumns="repeat(4, 1fr)"
        >
          <GridItem colSpan={1} rowSpan={1} />
          <GridItem bg={"green.500"} border={"2px"} borderRadius={"5px"} colSpan={2} rowSpan={1}>
            <Text
              alignContent={"center"}
              color={"orange.200"}
              display={"flex"}
              fontSize={"2xl"}
              justifyContent={"center"}
            >
              <Avatar mr={1} size="sm" src={player2avatar} />
              {game.player_2.username}
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box p={4}>
                {game.player_2.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_2.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_2.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_2.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_2.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_2.played_cards[2]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
            </Flex>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} />

          <GridItem
            alignItems={"center"}
            colSpan={6}
            display={"flex"}
            gap={4}
            justifyContent={"center"}
            rowSpan={2}
          >
            <Button colorScheme={"yellow"} size={"lg"} onClick={handleDealCards}>
              Repartir
            </Button>
            <Counter
              counter={counter}
              decrementCounter={decrementCounter}
              incrementCounter={incrementCounter}
              resetCounter={resetCounter}
            />
          </GridItem>

          <GridItem colSpan={1} rowSpan={1} />
          <GridItem bg={"green.500"} border={"2px"} borderRadius={"5px"} colSpan={2} rowSpan={1}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box p={4}>
                {game.player_1.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_1.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_1.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_1.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_1.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_1.played_cards[2]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
            </Flex>
            <Text
              alignContent={"center"}
              color={"orange.200"}
              display={"flex"}
              fontSize={"2xl"}
              justifyContent={"center"}
            >
              <Avatar mr={1} size="sm" src={player1avatar} />
              {game.player_1.username}
            </Text>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1} />
        </Grid>
      </Box>

      <Box
        alignContent={"center"}
        className="animate__animated animate__fadeIn animate__slower"
        display={"flex"}
        gap={4}
        justifyContent={"center"}
        p={4}
      >
        <HStack bg={"orange.300"} border={"2px"} borderRadius={"5px"} p={3}>
          {currentPlayer.cards.length === 0 ? (
            <Text fontWeight={"bold"}>Sin cartas</Text>
          ) : (
            <Text fontWeight={"bold"}>Mis cartas</Text>
          )}
          <Box>
            {currentPlayer.cards[0]?.length > 0 && (
              <Flex alignItems="center" flexDir="column" gap={1} justifyContent="center">
                <Card
                  src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${currentPlayer.cards[0]}`}
                  onClick={() => handlePlayCard(currentPlayer.cards[0])}
                />
                <Button
                  colorScheme="orange"
                  size="sm"
                  onClick={() => handleBurnCard(currentPlayer.cards[0])}
                >
                  Quemar
                </Button>
              </Flex>
            )}
          </Box>
          <Box>
            {currentPlayer.cards[1]?.length > 0 && (
              <Flex alignItems="center" flexDir="column" gap={1} justifyContent="center">
                <Card
                  src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${currentPlayer.cards[1]}`}
                  onClick={() => handlePlayCard(currentPlayer.cards[1])}
                />
                <Button
                  colorScheme="orange"
                  size="sm"
                  onClick={() => handleBurnCard(currentPlayer.cards[1])}
                >
                  Quemar
                </Button>
              </Flex>
            )}
          </Box>
          <Box>
            {currentPlayer.cards[2]?.length > 0 && (
              <Flex alignItems="center" flexDir="column" gap={1} justifyContent="center">
                <Card
                  src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${currentPlayer.cards[2]}`}
                  onClick={() => handlePlayCard(currentPlayer.cards[2])}
                />
                <Button
                  colorScheme="orange"
                  size="sm"
                  onClick={() => handleBurnCard(currentPlayer.cards[2])}
                >
                  Quemar
                </Button>
              </Flex>
            )}
          </Box>
        </HStack>
        {currentPlayer.cards.length !== 0 && (
          <Button colorScheme={"red"} onClick={handleGoToDeck}>
            Irse al mazo
          </Button>
        )}
      </Box>
    </>
  );
};
