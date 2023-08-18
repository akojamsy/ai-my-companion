import React from "react";
import { Button } from "./button";
import {
  ChevronLeft,
  Edit,
  MessageSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatclientProps } from "@/app/(chat)/(root)/chat/[chatId]/components/client";
import BotAvatar from "./bot-avatar";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const ChatHeader = ({ companion }: ChatclientProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      const res: any = await axios.delete(`/api/companion/${companion._id}`);
      console.log(res);
      if (res.status === 200) {
        toast({
          description: res.data?.message,
          variant: "success",
        });
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className='flex w-full justify-between items-center border-b border-primary/10 pb-4'>
      <div className='flex gap-x-2 items-center'>
        <Button size='icon' variant='ghost' onClick={() => router.back()}>
          <ChevronLeft className='h-8 w-8' />
        </Button>
        <BotAvatar src={companion?.src} />
        <div className='flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-2'>
            <p className='font-bold'>{companion?.name}</p>
            <div className='flex items-center text-xs'>
              <MessageSquare className='w-3 h-3 mr-1' />
              {companion?.messageCount}
            </div>
          </div>
          <p className='text-xs text-muted-foreground'>
            Created by {companion?.userName}
          </p>
        </div>
      </div>
      {user?.id === companion?.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size='icon'>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => router.push(`/companion/${companion._id}`)}
            >
              <Edit className='w-4 h-4 mr-2 pl-1' /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => onDelete()}
            >
              <Trash className='w-4 h-4 mr-2' /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ChatHeader;
