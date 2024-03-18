import * as React from "react";
import { useRouter } from "next/router";
import Consultation from "@/components/consultation/Consultation";

export default function Message() {
  const router = useRouter();
  const { id } = router.query;
  return <Consultation id={id} />;
}
