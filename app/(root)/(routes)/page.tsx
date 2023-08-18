"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import SearchInput from "@/components/search-input";
import Categories from "@/components/categories";
import Companion from "@/components/Companion";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function RootPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const categoryId = searchParams.get("categoryId");
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:3000/api/companion?name=${name}&categoryId=${categoryId}`,
    fetcher
  );

  return (
    <div className='h-full p-4 space-y-2'>
      <SearchInput />
      <Categories />
      <Companion data={data?.companions} />
    </div>
  );
}
