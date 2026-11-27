import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ALL_PROVINCES, getProvinceBySlug } from "@/data/provinces";
import { ProvinceDetailClient } from "@/components/province/ProvinceDetailClient";

export function generateStaticParams() {
  return ALL_PROVINCES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const province = getProvinceBySlug(slug);
  if (!province) return {};
  return {
    title: `${province.name.id} — Budaya & Arsitektur 3D`,
    description: province.description.id,
  };
}

export default async function ProvincePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const province = getProvinceBySlug(slug);
  if (!province) notFound();

  return <ProvinceDetailClient province={province} />;
}
