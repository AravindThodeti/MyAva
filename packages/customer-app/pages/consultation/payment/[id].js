import * as React from "react";
import { useRouter } from "next/router";
import ConsultationPayment from "@/components/ConsultationPayment";

export default function Slots() {
  const router = useRouter();
  const { id } = router.query;
  return <ConsultationPayment id={id} />;
}
