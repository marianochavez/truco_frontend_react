import {Box, Button, Flex, Grid, GridItem, Image, Spacer, Text} from "@chakra-ui/react";
import React from "react";
import {useContext} from "react";
import {Navigate} from "react-router-dom";

import {GameContext} from "../../providers/GameProvider";
import {PlayerContext} from "../../providers/PlayerProvider";

export const FourthPlayerTable = () => {
  const {game, currentPlayer, isGameCreated, isGameJoined, deal} = useContext(GameContext);
  const {player} = useContext(PlayerContext);
  const {id: idCurrent} = currentPlayer;

  const handleDealCards = async () => {
    await deal(game.id, player.token);
  };

  if (!isGameCreated || !isGameJoined) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Box>
        <Grid gap={2} marginTop={2} templateColumns="repeat(6, 1fr)" templateRows="repeat(8, 1fr)">
          <GridItem bg="yellow" colSpan={1} rowSpan={1} />
          <GridItem bg="red" colSpan={4} rowSpan={1}>
            <Flex>
              <Box p={4}>
                {/* <Image
                  src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${game.player_1.cards[0]}`}
                /> */}
                2
              </Box>
              <Spacer />
              <Box p={4}>2</Box>
              <Spacer />
              <Box p={4}>2</Box>
            </Flex>
          </GridItem>
          <GridItem bg="yellow" colSpan={1} rowSpan={1} />

          <GridItem bg="red" colSpan={1} rowSpan={1}>
            <Flex flexDir={"column"}>
              <Box p={4}>3</Box>
              <Spacer />
              <Box p={4}>3</Box>
              <Spacer />
              <Box p={4}>3</Box>
            </Flex>
          </GridItem>
          <GridItem
            alignItems={"center"}
            bg="yellow"
            colSpan={4}
            display={"flex"}
            justifyContent={"center"}
            rowSpan={2}
          >
            <Button colorScheme={"twitter"} size={"lg"} onClick={handleDealCards}>
              Repartir
            </Button>
          </GridItem>
          <GridItem bg="red" colSpan={1} rowSpan={1}>
            <Flex flexDir={"column"}>
              <Box p={4}>6</Box>
              <Spacer />
              <Box p={4}>6</Box>
              <Spacer />
              <Box p={4}>6</Box>
            </Flex>
          </GridItem>

          <GridItem bg="red" colSpan={1} rowSpan={1}>
            <Flex flexDir={"column"}>
              <Box p={4}>4</Box>
              <Spacer />
              <Box p={4}>4</Box>
              <Spacer />
              <Box p={4}>4</Box>
            </Flex>
          </GridItem>
          <GridItem bg="red" colSpan={1} rowSpan={1}>
            <Flex flexDir={"column"}>
              <Box p={4}>5</Box>
              <Spacer />
              <Box p={4}>5</Box>
              <Spacer />
              <Box p={4}>5</Box>
            </Flex>
          </GridItem>

          <GridItem bg="yellow" colSpan={1} rowSpan={1} />
          <GridItem bg="red" colSpan={4} rowSpan={1}>
            <Flex>
              <Box p={4}>
                {game.player_1.played_cards[0] ? (
                  <Image
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_1.played_cards[0]
                    }`}
                    w={20}
                  />
                ) : (
                  <Image
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`}
                    w={20}
                  />
                )}
              </Box>
              <Spacer />
              <Box p={4}>
                {game.player_1.played_cards[1] ? (
                  <Image
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_1.played_cards[1]
                    }`}
                    w={20}
                  />
                ) : (
                  <Image
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`}
                    w={20}
                  />
                )}
              </Box>
              <Spacer />
              <Box p={4}>
                {game.player_1.played_cards[2] ? (
                  <Image
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${
                      game.player_1.played_cards[2]
                    }`}
                    w={20}
                  />
                ) : (
                  <Image
                    src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/reverso.jpg`}
                    w={20}
                  />
                )}
              </Box>
            </Flex>
          </GridItem>
          <GridItem bg="yellow" colSpan={1} rowSpan={1} />
        </Grid>
      </Box>
    </>
  );
};
