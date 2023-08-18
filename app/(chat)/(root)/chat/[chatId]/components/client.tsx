"use client";
import { useCompletion } from "ai/react";
import { Companion } from "@/app/(root)/(routes)/companion/[companionId]/components/companion-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ChatHeader from "@/components/ui/chat-header";
import { ChevronLeft } from "lucide-react";
import React, { FormEvent, useState } from "react";
import ChatForm from "@/components/ui/chat-form";

export interface ChatclientProps {
  companion: Companion & {
    messages: [string];
    messageCount: number;
    userName: string;
    userId: string;
    _id: string;
  };
}

const Chatclient = ({ companion }: ChatclientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>(companion?.messages);

  const { input, isLoading, handleSubmit, handleInputChange, setInput } =
    useCompletion({
      api: `/api/chat/${companion?._id}`,
      onFinish(prompt, completion) {
        const systemMessage = {
          role: "system",
          content: completion,
        };
        setMessages((current) => [...current, systemMessage]);

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  };

  return (
    <div className='flex flex-col h-full p-4 space-y-2'>
      <ChatHeader companion={companion} />
      <div>Messages TODO</div>
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
