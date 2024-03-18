import * as React from "react";
import { Create, SimpleForm, TextInput, required } from "react-admin";

const TagCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput label="Tag" source="name" validate={required()} />
    </SimpleForm>
  </Create>
);

export default TagCreate;
