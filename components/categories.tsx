"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import qs from "query-string";

interface Category {
  _id: string;
  name: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Categories = () => {
  const { data, error, isLoading } = useSWR(`/api/categories`, fetcher);

  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = searchParams.get("categoryId");

  const handleCategorySearch = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl(
      { url: window.location.href, query },
      { skipNull: true }
    );

    router.push(url);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (data?.data?.length > 0) {
    return (
      <div className='w-full overflow-x-auto space-x-2 flex p-1'>
        <button
          onClick={() => handleCategorySearch(undefined)}
          className={cn(
            `flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition`
          )}
          type='button'
        >
          Newest
        </button>
        {data?.data?.map((category: Category) => (
          <button
            onClick={() => handleCategorySearch(category._id)}
            className={cn(
              `flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition`,
              category._id === categoryId
                ? "bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-600 text-white"
                : "bg-primary/10"
            )}
            type='button'
            key={category?._id}
          >
            {category?.name}
          </button>
        ))}
      </div>
    );
  }
};

export default Categories;
