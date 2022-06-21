import {Box, Button, Flex, Grid, GridItem, HStack} from "@chakra-ui/react";

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

export const TwoPlayerTable = ({game, currentPl, handleDealCards, handlePlayCard}: Props) => {
  const currentPlayer: any = game[currentPl as keyof Game];

  return (
    <>
      <Box>
        <Grid
          gap={2}
          gridTemplateRows={"1fr 50px 1fr"}
          marginTop={2}
          templateColumns="repeat(6, 1fr)"
        >
          <GridItem bg="yellow" colSpan={1} rowSpan={1} />
          <GridItem bg="red" colSpan={4} rowSpan={1}>
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
          <GridItem bg="yellow" colSpan={1} rowSpan={1} />

          <GridItem
            alignItems={"center"}
            bg="yellow"
            colSpan={6}
            display={"flex"}
            justifyContent={"center"}
            rowSpan={1}
          >
            <Button colorScheme={"orange"} size={"lg"} onClick={handleDealCards}>
              Repartir
            </Button>
          </GridItem>

          <GridItem bg="yellow" colSpan={1} rowSpan={1} />
          <GridItem bg="red" colSpan={4} rowSpan={1}>
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
          </GridItem>
          <GridItem bg="yellow" colSpan={1} rowSpan={1} />
        </Grid>
      </Box>

      <Box alignContent={"center"} display={"flex"} justifyContent={"center"} p={4}>
        <HStack>
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
