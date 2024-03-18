import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ListButton,
  TopToolbar,
  EmailField,
} from "react-admin";

const UserShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

const UserShow = (props) => (
  <Show {...props} actions={<UserShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="user_type" />
      <EmailField source="email" />
      <DateField label="Created At" source="created_at" showTime={true} />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
