import {Box, Button, Flex, Text} from "@chakra-ui/react";
import React from "react";

import {Counters} from "../../providers/GameProvider";

interface Props {
  counter: Counters;
  incrementCounter: (counter: string) => void;
  decrementCounter: (counter: string) => void;
  resetCounter: () => void;
}

export const Counter = ({counter, incrementCounter, decrementCounter, resetCounter}: Props) => {
  const {counter_1, counter_2} = counter;

  const handleIncrement = (counter: string) => {
    incrementCounter(counter);
  };

  const handleDecrement = (counter: string) => {
    decrementCounter(counter);
  };

  const handleReset = () => {
    resetCounter();
  };

  return (
    <Box bg="white" border="1px" borderRadius="5px" borderWidth="2px" p="2">
      <Flex alignItems="center" flexDir="row" gap={2} justifyContent="center">
        <Box border="1px" borderRadius="5px">
          <Text align="center">Equipo 1</Text>
          <Text align="center" borderBottom="1px" borderTop="1px" fontWeight="bold">
            {counter_1}
          </Text>
          <Button colorScheme="green" variant="ghost" onClick={() => handleIncrement("counter_1")}>
            +1
          </Button>
          <Button colorScheme="red" variant="ghost" onClick={() => handleDecrement("counter_1")}>
            -1
          </Button>
        </Box>
        <Box border="1px" borderRadius="5px">
          <Text align="center">Equipo 2</Text>
          <Text align="center" borderBottom="1px" borderTop="1px" fontWeight="bold">
            {counter_2}
          </Text>
          <Button colorScheme="green" variant="ghost" onClick={() => handleIncrement("counter_2")}>
            +1
          </Button>
          <Button colorScheme="red" variant="ghost" onClick={() => handleDecrement("counter_2")}>
            -1
          </Button>
        </Box>
        <Button colorScheme="yellow" variant="ghost" onClick={handleReset}>
          Reset
        </Button>
      </Flex>
    </Box>
  );
};
