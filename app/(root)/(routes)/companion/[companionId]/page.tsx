"use client";
import useSWR from "swr";
import CompanionForm from "./components/companion-form";

interface CompanionPageProps {
  params: {
    companionId: string;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CompanionPage = ({ params }: CompanionPageProps) => {
  const { data, error, isLoading } = useSWR(
    `/api/companion/${params.companionId}`,
    fetcher
  );

  const initialData = {
    name: data?.companion?.name,
    description: data?.companion?.description,
    src: data?.companion?.src,
    instructions: data?.companion?.instructions,
    seed: data?.companion?.seed,
    categoryId: data?.companion?.categoryId,
  };

  if (data?.companion || params.companionId === "new") {
    return (
      <CompanionForm
        initialData={initialData}
        categories={data?.categories}
        params={params}
      />
    );
  }
};

export default CompanionPage;
