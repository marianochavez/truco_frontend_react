import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  HStack,
  Tag,
} from "@chakra-ui/react";
import {HamburgerIcon, CloseIcon} from "@chakra-ui/icons";
import {useContext} from "react";
import {Link, Link as LinkRouter, Outlet, useLocation} from "react-router-dom";

import {PlayerContext} from "../../providers/PlayerProvider";
import {GameContext} from "../../providers/GameProvider";

export default function Appbar() {
  const {isOpen, onToggle} = useDisclosure();
  const {clearGame, leave} = useContext(GameContext);
  const {player, isLogged, logout} = useContext(PlayerContext);
  const currentPath = useLocation().pathname;

  const handleLogout = () => {
    leave(player.token);
    clearGame();
    logout();
  };

  return (
    <>
      <Box>
        <Flex
          align={"center"}
          bg={useColorModeValue("white", "gray.800")}
          borderBottom={1}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          borderStyle={"solid"}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          px={{base: 4}}
          py={{base: 2}}
        >
          <Flex display={{base: "flex", md: "none"}} flex={{base: 1, md: "auto"}} ml={{base: -2}}>
            <IconButton
              aria-label={"Toggle Navigation"}
              icon={isOpen ? <CloseIcon h={3} w={3} /> : <HamburgerIcon h={5} w={5} />}
              variant={"ghost"}
              onClick={onToggle}
            />
          </Flex>
          <Flex flex={{base: 1}} justify={{base: "center", md: "start"}}>
            <Link to="/">
              <Text
                alignItems={"center"}
                className="animate__animated animate__lightSpeedInLeft"
                color={"gray.700"}
                display={"flex"}
                fontFamily={"heading"}
                fontSize={{base: "lg", md: "xl"}}
                fontWeight={"bold"}
                justifyContent={"center"}
                textAlign={useBreakpointValue({base: "center", md: "left"})}
              >
                TRUCO
              </Text>
            </Link>

            {isLogged && (
              <Flex display={{base: "none", md: "flex"}} ml={10}>
                <DesktopNav />
              </Flex>
            )}
          </Flex>

          {!isLogged && currentPath === "/" && (
            <Stack direction={"row"} flex={{base: 1, md: 0}} justify={"flex-end"} spacing={6}>
              <LinkRouter to="/login">
                <Button fontSize={"sm"} fontWeight={400} variant="unstyled">
                  Ingresar
                </Button>
              </LinkRouter>
              <LinkRouter to="/register">
                <Button
                  colorScheme={"yellow"}
                  display={{base: "none", md: "inline-flex"}}
                  fontSize={"sm"}
                  fontWeight={600}
                >
                  Registrarme
                </Button>
              </LinkRouter>
            </Stack>
          )}

          {isLogged && (
            <HStack border={"px"}>
              <Avatar name={player.name} size={"sm"} src={player.avatar} />
              <Tag colorScheme="blackAlpha" fontWeight={"bold"} size="md" variant="solid">
                {player.name}
              </Tag>
              <Button colorScheme={"yellow"} size="sm" variant={"solid"} onClick={handleLogout}>
                Salir
              </Button>
            </HStack>
          )}
        </Flex>

        <Collapse animateOpacity in={isOpen}>
          <MobileNav />
        </Collapse>
      </Box>
      <Outlet />
    </>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover placement={"bottom-start"} trigger={"hover"}>
            <PopoverTrigger>
              <LinkRouter to={navItem.href ?? "#"}>
                <Text
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                  color={linkColor}
                  fontSize={"sm"}
                  fontWeight={500}
                  p={2}
                >
                  {navItem.label}
                </Text>
              </LinkRouter>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} display={{md: "none"}} p={4}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({label, children, href}: NavItem) => {
  const {isOpen, onToggle} = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <LinkRouter to={href ?? "#"}>
        <Box
          _hover={{
            textDecoration: "none",
          }}
          alignItems={"center"}
          display={"flex"}
          justifyContent={"center"}
          py={2}
        >
          <Text color={useColorModeValue("gray.600", "gray.200")} fontWeight={600}>
            {label}
          </Text>
        </Box>
      </LinkRouter>

      <Collapse animateOpacity in={isOpen} style={{marginTop: "0!important"}}>
        <Stack
          align={"start"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          borderLeft={1}
          borderStyle={"solid"}
          mt={2}
          pl={4}
        />
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Juego",
    href: "/game",
  },
];
