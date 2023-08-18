"use client";
import { redirect } from "next/navigation";
import useSWR from "swr";
import Chatclient from "@/app/(chat)/(root)/chat/[chatId]/components/client";

export interface SingleChatProps {
  params: {
    chatId: string;
  };
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const SingleChat = ({ params }: SingleChatProps) => {
  const { data, error, isLoading } = useSWR(
    `/api/chat/${params.chatId}`,
    fetcher
  );

  return <Chatclient companion={data?.companions} />;
};

export default SingleChat;
