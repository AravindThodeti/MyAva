import * as React from "react";
import { Create, SimpleForm, TextInput, SelectInput, required } from "react-admin";
import { getChoices } from "utils";
import { ACTIVITY_TYPES } from "@ava/common";

const ResourceCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <SelectInput
        source="activity_type"
        label="Exercise Type"
        choices={getChoices(ACTIVITY_TYPES)}
        validate={required()}
      />
      <TextInput source="name" validate={required()} />
      <TextInput source="video_url" />
    </SimpleForm>
  </Create>
);

export default ResourceCreate;
