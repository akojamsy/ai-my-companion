import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import SearchInput from "@/components/search-input";
import Categories from "@/components/categories";

export default function RootPage() {
  return (
    <div className='h-full p-4 space-y-2'>
      <SearchInput />
      <Categories />
    </div>
  );
}
