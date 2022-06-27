/* eslint-disable react-hooks/exhaustive-deps */
import {Avatar, Box, Button, Flex, Grid, GridItem, HStack, Text} from "@chakra-ui/react";
import {AiOutlineStar} from "react-icons/ai";
import {useState, useEffect} from "react";

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

export const SixPlayerTable = ({
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
  let [team1player1, team1player2, team1player3]: any[] = game.team_1;
  let [team2player1, team2player2, team2player3]: any[] = game.team_2;

  team1player1 = game[team1player1 as keyof Game];
  team1player2 = game[team1player2 as keyof Game];
  team1player3 = game[team1player3 as keyof Game];
  team2player1 = game[team2player1 as keyof Game];
  team2player2 = game[team2player2 as keyof Game];
  team2player3 = game[team2player3 as keyof Game];

  const [team1player1avatar, setteam1player1avatar] = useState("");
  const [team1player2avatar, setteam1player2avatar] = useState("");
  const [team1player3avatar, setteam1player3avatar] = useState("");
  const [team2player1avatar, setteam2player1avatar] = useState("");
  const [team2player2avatar, setteam2player2avatar] = useState("");
  const [team2player3avatar, setteam2player3avatar] = useState("");

  useEffect(() => {
    setAvatar(team1player1.username).then((res) => setteam1player1avatar(res));
    setAvatar(team1player2.username).then((res) => setteam1player2avatar(res));
    setAvatar(team1player3.username).then((res) => setteam1player3avatar(res));
    setAvatar(team2player1.username).then((res) => setteam2player1avatar(res));
    setAvatar(team2player2.username).then((res) => setteam2player2avatar(res));
    setAvatar(team2player3.username).then((res) => setteam2player3avatar(res));
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
        <Grid gap={2} marginTop={2} p={4} templateColumns="repeat(6, 1fr)">
          {/* ----------------------------------- */}
          <GridItem colSpan={1} rowSpan={1} />
          {/* ----------------------------------- */}
          <GridItem bg={"green.500"} border={"2px"} borderRadius={"5px"} colSpan={4} rowSpan={1}>
            <Text
              alignContent={"center"}
              color={"orange.200"}
              display={"flex"}
              fontSize={"2xl"}
              justifyContent={"center"}
            >
              <Avatar mr={1} size="sm" src={team2player1avatar} />
              {team2player1.username}
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box p={4}>
                {team2player1.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team2player1.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team2player1.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team2player1.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team2player1.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team2player1.played_cards[2]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
            </Flex>
          </GridItem>
          {/* ----------------------------------- */}
          <GridItem colSpan={1} rowSpan={1} />
          {/* ----------------------------------- */}
          <GridItem bg={"green.500"} border={"2px"} borderRadius={"5px"} colSpan={1} rowSpan={1}>
            <Text
              alignContent={"center"}
              color={"orange.200"}
              display={"flex"}
              fontSize={"2xl"}
              justifyContent={"center"}
            >
              <Avatar mr={1} size="sm" src={team1player2avatar} />
              {team1player2.username}
            </Text>
            <Flex alignItems={"center"} flexDir={"column"} justifyContent={"center"}>
              <Box p={4}>
                {team1player2.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team1player2.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team1player2.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team1player2.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team1player2.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team1player2.played_cards[2]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
            </Flex>
          </GridItem>

          {/* ----------------------------------- */}
          <GridItem
            alignItems={"center"}
            colSpan={4}
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
          {/* ----------------------------------- */}
          <GridItem bg={"green.500"} border={"2px"} borderRadius={"5px"} colSpan={1} rowSpan={1}>
            <Text
              alignContent={"center"}
              color={"orange.200"}
              display={"flex"}
              fontSize={"2xl"}
              justifyContent={"center"}
            >
              <Avatar mr={1} size="sm" src={team1player3avatar} />
              {team1player3.username}
            </Text>
            <Flex alignItems={"center"} flexDir={"column"} justifyContent={"center"}>
              <Box p={4}>
                {team1player3.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team1player3.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team1player3.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team1player3.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team1player3.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team1player3.played_cards[2]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
            </Flex>
          </GridItem>
          {/* ----------------------------------- */}
          <GridItem bg={"green.500"} border={"2px"} borderRadius={"5px"} colSpan={1} rowSpan={1}>
            <Text
              alignContent={"center"}
              color={"orange.200"}
              display={"flex"}
              fontSize={"2xl"}
              justifyContent={"center"}
            >
              <Avatar mr={1} size="sm" src={team2player2avatar} />
              {team2player2.username}
            </Text>
            <Flex alignItems={"center"} flexDir={"column"} justifyContent={"center"}>
              <Box p={4}>
                {team2player2.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team2player2.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team2player2.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team2player2.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team2player2.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team2player2.played_cards[2]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
            </Flex>
          </GridItem>
          {/* ----------------------------------- */}
          <GridItem bg={"green.500"} border={"2px"} borderRadius={"5px"} colSpan={1} rowSpan={1}>
            <Text
              alignContent={"center"}
              color={"orange.200"}
              display={"flex"}
              fontSize={"2xl"}
              justifyContent={"center"}
            >
              <Avatar mr={1} size="sm" src={team2player3avatar} />
              {team2player3.username}
            </Text>
            <Flex alignItems={"center"} flexDir={"column"} justifyContent={"center"}>
              <Box p={4}>
                {team2player3.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team2player3.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team2player3.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team2player3.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team2player3.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team2player3.played_cards[2]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
            </Flex>
          </GridItem>
          {/* ----------------------------------- */}
          <GridItem colSpan={1} rowSpan={1} />
          {/* ----------------------------------- */}
          <GridItem bg={"green.500"} border={"2px"} borderRadius={"5px"} colSpan={4} rowSpan={1}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box p={4}>
                {team1player1.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team1player1.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team1player1.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team1player1.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {team1player1.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      team1player1.played_cards[2]
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
              <Avatar mr={1} size="sm" src={team1player1avatar} />
              {team1player1.username}
            </Text>
          </GridItem>
          {/* ----------------------------------- */}
          <GridItem colSpan={1} rowSpan={1} />
          {/* ----------------------------------- */}
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
