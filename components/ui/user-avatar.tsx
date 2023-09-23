"use client";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = () => {
  const { user } = useUser();
  return (
    <Avatar>
      <AvatarImage src={user?.imageUrl} className='object-cover' />
    </Avatar>
  );
};

export default UserAvatar;
