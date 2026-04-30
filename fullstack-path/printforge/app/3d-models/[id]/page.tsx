import type { ModelDetailPageProps } from "@/app/types";
import { getModelById } from "@/app/lib/models";
import Image from "next/image";

export default async function ModelDetailPage({
  params,
}: ModelDetailPageProps) {
  const { id } = await params;
  const model = await getModelById(id);

  return (
    <div>
      <h1>{model.name}</h1>
      <p>{model.description}</p>
      <p>Likes: {model.likes}</p>
      <Image src={model.image} alt={model.name} width={400} height={400} />
      <p>Category: {model.category}</p>
      <p>Date Added: {model.dateAdded}</p>
    </div>
  );
}
