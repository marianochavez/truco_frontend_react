import {Box, Flex, Grid, GridItem, Image, Spacer} from "@chakra-ui/react";
import React from "react";
import {useContext} from "react";
import {Navigate} from "react-router-dom";

import {GameContext} from "../../providers/GameProvider";

export const Game = () => {
  const {game, isGameCreated, isGameJoined} = useContext(GameContext);

  if (!isGameCreated || !isGameJoined) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Grid
        gap={4}
        h="200px"
        marginTop={2}
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(4, 1fr)"
      >
        <GridItem bg="yellow" colSpan={1} rowSpan={1} />
        <GridItem bg="red" colSpan={4} rowSpan={1}>
          <Flex>
            <Box p={4}>
              <Image
                src={`${import.meta.env.VITE_REACT_APP_API_CLOUDINARY}/${game.player_1.cards[0]}`}
              />
            </Box>
            <Spacer />
            <Box p={4}>hola</Box>
            <Spacer />
            <Box p={4}>hola</Box>
          </Flex>
        </GridItem>
        <GridItem bg="yellow" colSpan={1} rowSpan={1} />

        <GridItem bg="red" colSpan={1} rowSpan={1}>
          <Flex flexDir={"column"}>
            <Box p={4}>hola</Box>
            <Spacer />
            <Box p={4}>hola</Box>
            <Spacer />
            <Box p={4}>hola</Box>
          </Flex>
        </GridItem>
        <GridItem bg="yellow" colSpan={4} rowSpan={2} />
        <GridItem bg="red" colSpan={1} rowSpan={1}>
          <Flex flexDir={"column"}>
            <Box p={4}>hola</Box>
            <Spacer />
            <Box p={4}>hola</Box>
            <Spacer />
            <Box p={4}>hola</Box>
          </Flex>
        </GridItem>

        <GridItem bg="red" colSpan={1} />
        <GridItem bg="red" colSpan={1} />

        <GridItem bg="yellow" colSpan={1} rowSpan={1} />
        <GridItem bg="red" colSpan={4} rowSpan={1}>
          <Flex>
            <Box p={4}>hola</Box>
            <Spacer />
            <Box p={4}>hola</Box>
            <Spacer />
            <Box p={4}>hola</Box>
          </Flex>
        </GridItem>
        <GridItem bg="yellow" colSpan={1} rowSpan={1} />
      </Grid>
    </>
  );
};
