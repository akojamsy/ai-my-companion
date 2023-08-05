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

  return (
    <CompanionForm initialData={data?.data} categories={data?.categories} />
  );
};

export default CompanionPage;
