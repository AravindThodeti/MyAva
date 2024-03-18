import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  ShowButton,
  ReferenceField,
  BooleanField,
  EditButton,
} from "react-admin";

const AdminList = (props) => (
  <List {...props} bulkActionButtons={false} exporter={false}>
    <Datagrid>
      <TextField sortable={false} source="id" />
      <TextField sortable={false} source="title" />
      <TextField sortable={false} source="name" />
      <ReferenceField
        link={false}
        sortable={false}
        label="Email"
        source="user_id"
        reference="users"
      >
        <EmailField sortable={false} source="email" />
      </ReferenceField>
      <ReferenceField
        sortable={false}
        label="User"
        source="user_id"
        reference="users"
      >
        <TextField sortable={false} source="id" />
      </ReferenceField>
      <BooleanField sortable={false} source="super_admin" />
      <DateField sortable={false} source="created_at" showTime={true} />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

export default AdminList;
