"use client";
import { ElementRef, useEffect, useRef, useState } from "react";
import { Companion } from "@/app/(root)/(routes)/companion/[companionId]/components/companion-form";
import React from "react";
import ChatMessage, { ChatMessageProps } from "./chat-message";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

const ChatMessages = ({
  isLoading,
  messages,
  companion,
}: ChatMessagesProps) => {
  const [stimulatedLoading, setStimulatedLoading] = useState(
    messages?.length === (0 || undefined) ? true : false
  );
  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setStimulatedLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <ChatMessage
        role='system'
        isLoading={stimulatedLoading}
        content={`Hello, I am ${companion?.name}, ${companion?.description}`}
        src={companion?.src}
      />
      {isLoading && (
        <ChatMessage role='system' isLoading src={companion?.src} />
      )}
      {messages?.map((message, i) => (
        <ChatMessage
          key={i}
          role={message?.role}
          content={message?.content}
          src={message?.src}
        />
      ))}
      <div />
    </>
  );
};

export default ChatMessages;
