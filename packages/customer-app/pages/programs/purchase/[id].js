import * as React from "react";
import { useRouter } from "next/router";
import Payment from "@/components/programs/Payment";

export default function PaymentPage() {
  const router = useRouter();
  const { id } = router.query;
  return <Payment id={id} />;
}
