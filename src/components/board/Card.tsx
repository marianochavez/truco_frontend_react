import {Image} from "@chakra-ui/react";

interface Props {
  src: string;
  onClick?: () => void;
}

export const Card = ({src, onClick}: Props) => {
  return <Image border={"1px"} borderRadius={"5px"} src={src} w={20} onClick={onClick} />;
};
