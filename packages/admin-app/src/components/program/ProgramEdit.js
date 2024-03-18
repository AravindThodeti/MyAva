import * as React from "react";
import { Edit, SimpleForm, TextInput, required } from "react-admin";
import EditToolbarWithoutDelete from "../EditToolbarWithoutDelete";

const ProgramEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<EditToolbarWithoutDelete />}>
      <TextInput disabled source="id" />
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default ProgramEdit;
