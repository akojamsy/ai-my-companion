import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  src: string;
}

const BotAvatar = ({ src }: AvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} className='object-cover' />
    </Avatar>
  );
};

export default BotAvatar;
