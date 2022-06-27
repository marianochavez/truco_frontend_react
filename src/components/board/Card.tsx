import {Image} from "@chakra-ui/react";

interface Props {
  src: string;
  size?: string;
  onClick?: () => void;
}

export const Card = ({src, size = "20", onClick}: Props) => {
  return (
    <Image
      border={"1px"}
      borderRadius={"5px"}
      className="animate__animated animate__zoomIn"
      src={src}
      w={size}
      onClick={onClick}
    />
  );
};
