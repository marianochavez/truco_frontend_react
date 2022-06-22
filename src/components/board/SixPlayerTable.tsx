import {Box, Button, Flex, Grid, GridItem, HStack, Text} from "@chakra-ui/react";
import {AiOutlineUser} from "react-icons/ai";

import {Game} from "../../providers/GameProvider";
import {Player} from "../../providers/PlayerProvider";

import {Card} from "./Card";

interface Props {
  game: Game;
  player: Player;
  currentPl: string;
  handleDealCards: () => void;
  handlePlayCard: (card: string) => void;
}

export const SixPlayerTable = ({game, currentPl, handleDealCards, handlePlayCard}: Props) => {
  const currentPlayer: any = game[currentPl as keyof Game];

  return (
    <>
      <Box>
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
              <AiOutlineUser fontSize="2rem" />
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
              <AiOutlineUser fontSize="2rem" />
              {game.player_3.username}
            </Text>
            <Flex alignItems={"center"} flexDir={"column"} justifyContent={"center"}>
              <Box p={4}>
                {game.player_3.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_3.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_3.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_3.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_3.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_3.played_cards[2]
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
            justifyContent={"center"}
            rowSpan={2}
          >
            <Button colorScheme={"orange"} size={"lg"} onClick={handleDealCards}>
              Repartir
            </Button>
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
              <AiOutlineUser fontSize="2rem" />
              {game.player_5.username}
            </Text>
            <Flex alignItems={"center"} flexDir={"column"} justifyContent={"center"}>
              <Box p={4}>
                {game.player_5.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_5.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_5.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_5.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_5.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_5.played_cards[2]
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
              <AiOutlineUser fontSize="2rem" />
              {game.player_6.username}
            </Text>
            <Flex alignItems={"center"} flexDir={"column"} justifyContent={"center"}>
              <Box p={4}>
                {game.player_6.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_6.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_6.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_6.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_6.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_6.played_cards[2]
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
              <AiOutlineUser fontSize="2rem" />
              {game.player_4.username}
            </Text>
            <Flex alignItems={"center"} flexDir={"column"} justifyContent={"center"}>
              <Box p={4}>
                {game.player_4.played_cards[0] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_4.played_cards[0]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_4.played_cards[1] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_4.played_cards[1]
                    }`}
                  />
                ) : (
                  <Card src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`} />
                )}
              </Box>
              <Box p={4}>
                {game.player_4.played_cards[2] ? (
                  <Card
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_4.played_cards[2]
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
              <AiOutlineUser fontSize="2rem" />
              {game.player_1.username}
            </Text>
          </GridItem>
          {/* ----------------------------------- */}
          <GridItem colSpan={1} rowSpan={1} />
          {/* ----------------------------------- */}
        </Grid>
      </Box>

      <Box alignContent={"center"} display={"flex"} justifyContent={"center"} p={4}>
        <HStack bg={"orange.300"} border={"2px"} borderRadius={"5px"} p={3}>
          {currentPlayer.cards.length === 0 ? (
            <Text fontWeight={"bold"}>Sin cartas</Text>
          ) : (
            <Text fontWeight={"bold"}>Mis cartas</Text>
          )}
          <Box>
            {currentPlayer.cards[0]?.length > 0 && (
              <Card
                src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${currentPlayer.cards[0]}`}
                onClick={() => handlePlayCard(currentPlayer.cards[0])}
              />
            )}
          </Box>
          <Box>
            {currentPlayer.cards[1]?.length > 0 && (
              <Card
                src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${currentPlayer.cards[1]}`}
                onClick={() => handlePlayCard(currentPlayer.cards[1])}
              />
            )}
          </Box>
          <Box>
            {currentPlayer.cards[2]?.length > 0 && (
              <Card
                src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${currentPlayer.cards[2]}`}
                onClick={() => handlePlayCard(currentPlayer.cards[2])}
              />
            )}
          </Box>
        </HStack>
      </Box>
    </>
  );
};
