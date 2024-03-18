import * as React from "react";
import * as constant from "../../../../constants";
import ProfileForm from "../../../../components/ProfileForm";

export default function Confirm() {
  return (
    <ProfileForm
      submitButtonLabel="Confirm"
      navigateTo={`${constant.URL_CONSULTATION_LIST}`}
    />
  );
}
