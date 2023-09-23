"use client";
import { useCompletion } from "ai/react";
import { Companion } from "@/app/(root)/(routes)/companion/[companionId]/components/companion-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ChatHeader from "@/components/ui/chat-header";
import { ChevronLeft } from "lucide-react";
import React, { FormEvent, useState } from "react";
import ChatForm from "@/components/ui/chat-form";
import ChatMessages from "@/components/ui/chat-messages";
import { ChatMessageProps } from "@/components/ui/chat-message";

export interface ChatclientProps {
  companion: Companion & {
    messages: ChatMessageProps[];
    messageCount: number;
    userName: string;
    userId: string;
    _id: string;
  };
}

const Chatclient = ({ companion }: ChatclientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion?.messages || []
  );

  const { input, isLoading, handleSubmit, handleInputChange, setInput } =
    useCompletion({
      api: `/api/chat/${companion?._id}`,
      onFinish(prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };
        setMessages((current) => [...current, systemMessage]);

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  };

  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
      <ChatHeader companion={companion} />
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        companion={companion}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Chatclient;
