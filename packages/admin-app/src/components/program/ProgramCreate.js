import * as React from "react";
import { Create, SimpleForm, TextInput, required } from "react-admin";

const ProgramCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Create>
);

export default ProgramCreate;
