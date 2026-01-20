'use client';

import { FC } from "react";
import { useParams } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

// const ProductPage: FC<Props> = async ({ params }) => {
//   const { id } = await params;
//   return <div>Product {id}</div>;
// };

const ProductPage: FC<Props> = () => {
  const { id } = useParams();
  return <div>Product {id}</div>;
};

export default ProductPage;