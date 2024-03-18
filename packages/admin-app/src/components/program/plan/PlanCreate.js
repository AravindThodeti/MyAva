import * as React from "react";
import { Create, SimpleForm, TextInput, required, ReferenceInput, SelectInput, NumberInput} from "react-admin";
import RichTextInput from 'ra-input-rich-text';

const PlanCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
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
  </Create>
);

export default PlanCreate;
