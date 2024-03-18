import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import RichTextInput from 'ra-input-rich-text';
import EditToolbarWithoutDelete from "../../EditToolbarWithoutDelete";

const PlanEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<EditToolbarWithoutDelete />}>
      <TextInput disabled source="id" />
      <ReferenceInput label="Program" source="program_id" reference="programs">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" validate={required()} />
      <RichTextInput source="details" validate={required()} />
      <NumberInput source="priority" validate={required()} />
      <NumberInput source="price" validate={required()} />
      <NumberInput source="discounted_price" validate={required()} />
      <NumberInput source="validity" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default PlanEdit;
