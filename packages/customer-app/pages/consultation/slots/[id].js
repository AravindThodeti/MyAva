import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SlotSelector from "../../../components/SlotSelector";
import { useDispatch, useSelector } from "react-redux";
import { ConsultantDetails } from "@/components/ConsultantList";
import { getConsultants } from "../../../store/actions/api.action";

export default function Slots() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [consulantDetail, setconsulantDetail] = useState(null);
  const { id } = router.query;
  const consultants = useSelector(
    (state) => state.consultantReducer.consultants
  );

  useEffect(() => {
    if (consultants) {
      // null is for all department data.
      const data = consultants[null].filter((datum) => datum.id === Number(id));
      setconsulantDetail(data[0]);
    }
  }, [consultants]);

  React.useEffect(() => {
    if (
      consultants === undefined ||
      (consultants && consultants[null] === undefined)
    ) {
      dispatch(getConsultants(null));
    }
  }, [consultants]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ margin: "15px", paddingTop: "15px" }}>
        <ConsultantDetails data={consulantDetail} />
      </div>
      <SlotSelector consultantId={id} />
    </div>
  );
}
