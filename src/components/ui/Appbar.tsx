import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {useContext} from "react";
import {Link as LinkRouter, Outlet, useLocation} from "react-router-dom";

import {PlayerContext} from "../../providers/PlayerProvider";

export default function Appbar() {
  const {isOpen, onToggle} = useDisclosure();
  const {isLogged} = useContext(PlayerContext);
  const currentPath = useLocation().pathname;

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
            <Text
              color={useColorModeValue("gray.800", "white")}
              fontFamily={"heading"}
              textAlign={useBreakpointValue({base: "center", md: "left"})}
            >
              TRUCO
            </Text>

            <Flex display={{base: "none", md: "flex"}} ml={10}>
              <DesktopNav />
            </Flex>
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
                  _hover={{
                    bg: "pink.300",
                  }}
                  bg={"pink.400"}
                  color={"white"}
                  display={{base: "none", md: "inline-flex"}}
                  fontSize={"sm"}
                  fontWeight={600}
                >
                  Registrarme
                </Button>
              </LinkRouter>
            </Stack>
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
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover placement={"bottom-start"} trigger={"hover"}>
            <PopoverTrigger>
              <Link
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                color={linkColor}
                fontSize={"sm"}
                fontWeight={500}
                href={navItem.href ?? "#"}
                p={2}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                bg={popoverContentBgColor}
                border={0}
                boxShadow={"xl"}
                minW={"sm"}
                p={4}
                rounded={"xl"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({label, href, subLabel}: NavItem) => {
  return (
    <Link
      _hover={{bg: useColorModeValue("pink.50", "gray.900")}}
      display={"block"}
      href={href}
      p={2}
      role={"group"}
      rounded={"md"}
    >
      <Stack align={"center"} direction={"row"}>
        <Box>
          <Text _groupHover={{color: "pink.400"}} fontWeight={500} transition={"all .3s ease"}>
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          _groupHover={{opacity: "100%", transform: "translateX(0)"}}
          align={"center"}
          flex={1}
          justify={"flex-end"}
          opacity={0}
          transform={"translateX(-10px)"}
          transition={"all .3s ease"}
        >
          <Icon as={ChevronRightIcon} color={"pink.400"} h={5} w={5} />
        </Flex>
      </Stack>
    </Link>
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
      <Flex
        _hover={{
          textDecoration: "none",
        }}
        align={"center"}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        py={2}
      >
        <Text color={useColorModeValue("gray.600", "gray.200")} fontWeight={600}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            h={6}
            transform={isOpen ? "rotate(180deg)" : ""}
            transition={"all .25s ease-in-out"}
            w={6}
          />
        )}
      </Flex>

      <Collapse animateOpacity in={isOpen} style={{marginTop: "0!important"}}>
        <Stack
          align={"start"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          borderLeft={1}
          borderStyle={"solid"}
          mt={2}
          pl={4}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} href={child.href} py={2}>
                {child.label}
              </Link>
            ))}
        </Stack>
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
