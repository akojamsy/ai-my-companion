"use client"
import { Companion } from "@/app/(root)/(routes)/companion/[companionId]/components/companion-form";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";

interface CompanionProps {
  data: (Companion & {
    _id: string;
    userName: string;
    messages?: [string];
  })[];
}

const Companion = ({ data }: CompanionProps) => {
  if (data?.length === 0) {
    return (
      <div className='pt-10 flex flex-col items-center justify-center space-y-3'>
        <div className='relative w-64 h-60'>
          <Image
            src='/empty.png'
            className='grayscale'
            fill
            alt='no companions'
          />
        </div>
        <p className='text-sm text-muted-foreground'>No companions found.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pb-10 gap-2'>
      {data?.map((item) => (
        <Card className='bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0'>
          <Link href={`/chat/${item?._id}`}>
            <CardHeader
              key={item?._id}
              className='flex items-center justify-center text-center text-muted-foreground'
            >
              <div className='relative w-32 h-32'>
                <Image
                  src={item?.src}
                  fill
                  alt='companion avatar'
                  className='rounded-xl object-cover'
                />
              </div>
              <p className='font-bold'>{item?.name}</p>
              <p className='text-xs'>{item?.description}</p>
            </CardHeader>
            <CardFooter className='flex items-center justify-between text-xs text-muted-foreground'>
              <p className='lowercase'>@{item?.userName}</p>
              <div className='flex items-center'>
                <MessagesSquare className='w-3 h-3 mr-1' />
                {item.messages?.length ? item.messages?.length : 0}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Companion;
