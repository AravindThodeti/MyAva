import * as React from "react";
import { useRouter } from "next/router";
import SlotSelector from "@/components/SlotSelector";

export default function Slots() {
  const router = useRouter();
  const { id, consultantId } = router.query;
  return <SlotSelector userProgramId={id} consultantId={consultantId} />;
}
