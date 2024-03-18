import * as React from "react";
import { useRouter } from "next/router";
import PendingAssingment from "@/components/programs/PendingAssignment";

export default function Confirm() {
  const router = useRouter();
  const { id } = router.query;
  return <PendingAssingment id={id} />;
}
