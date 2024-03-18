import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { fetchUserSuccess } from "@/actions/user.action";
import { fetchProfileSuccess } from "@/actions/profile.action";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
    dispatch(fetchUserSuccess(null));
    dispatch(fetchProfileSuccess(null));
    router.push("/user/otpLogin");
  }, []);

  return <></>;
}
