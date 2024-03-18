import * as React from "react";
import { useRouter } from "next/router";
import * as constant from "@/constants/index";
import ProfileForm from "@/components/ProfileForm";
import { saveUserProgramProfile } from "@/actions/api.action";

export default function Confirm() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <ProfileForm
      submitButtonLabel="Confirm"
      navigateTo={constant.URL_USER_PROGRAM_DETAIL_FORMAT}
      navigateAs={constant.URL_USER_PROGRAM_DETAIL(id)}
      saveFunction={saveUserProgramProfile}
      functionArguments={id}
    />
  );
}
