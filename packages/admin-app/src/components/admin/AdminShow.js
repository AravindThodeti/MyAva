import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ListButton,
  BooleanField,
  TopToolbar,
  ReferenceField,
  EmailField,
  CreateButton,
  EditButton,
} from "react-admin";

const AdminShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <CreateButton basePath={basePath} record={data} />
    <EditButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

const AdminShow = (props) => (
  <Show {...props} actions={<AdminShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="name" />
      <BooleanField source="super_admin" />
      <ReferenceField
        link={false}
        label="Email"
        source="user_id"
        reference="users"
      >
        <EmailField source="email" />
      </ReferenceField>
      <ReferenceField
        sortable={false}
        label="User"
        source="user_id"
        reference="users"
      >
        <TextField source="id" />
      </ReferenceField>
      <DateField label="Created At" source="created_at" showTime={true} />
      <DateField label="Updated At" source="updated_at" showTime={true} />
    </SimpleShowLayout>
  </Show>
);

export default AdminShow;
