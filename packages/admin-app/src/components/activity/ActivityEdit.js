import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
} from "react-admin";
import EditToolbarWithoutDelete from "../EditToolbarWithoutDelete";
import { getChoices } from "utils";
import { ACTIVITY_TYPES } from "@ava/common";

const ActivityEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<EditToolbarWithoutDelete />}>
      <TextInput disabled source="id" />
      <SelectInput
        source="activity_type"
        label="Exercise Type"
        choices={getChoices(ACTIVITY_TYPES)}
        validate={required()}
      />
      <TextInput source="name" validate={required()} />
      <TextInput source="video_url" />
    </SimpleForm>
  </Edit>
);

export default ActivityEdit;
