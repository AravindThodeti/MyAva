import * as React from "react";
import { useRouter } from "next/router";
import ConsultantList from "@/components/ConsultantList";

export default function Consultation() {
  const router = useRouter();
  const { name } = router.query;
  return <ConsultantList name={name} />;
}
