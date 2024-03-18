import * as React from "react";
import { Create, SimpleForm, TextInput, SelectInput, required, BooleanInput, email } from "react-admin";
import { getChoices } from "../../utils";
import { TITLES } from "../../constants";

const AdminCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <SelectInput
        source="title"
        label="Title"
        choices={getChoices(TITLES)}
        validate={required()}
      />
      <TextInput source="name" validate={required()} />
      <TextInput
        label="Email"
        source="user.email"
        type="email"
        validate={[required(), email()]}
      />
      <TextInput label="Password" type="password" source="user.password" validate={required()} />
      <BooleanInput source="super_admin" defaultValue={false} />
    </SimpleForm>
  </Create>
);

export default AdminCreate;
