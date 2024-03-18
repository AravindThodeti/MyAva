import * as React from "react";
import { List, Datagrid, TextField, EmailField, DateField } from "react-admin";

const UserList = (props) => (
  <List {...props} bulkActionButtons={false} exporter={false}>
    <Datagrid>
      <TextField source="id" sortable={false} />
      <EmailField source="email" sortable={false} />
      <TextField source="user_type" sortable={false} />
      <DateField source="created_at" showTime={true} sortable={false} />
    </Datagrid>
  </List>
);

export default UserList;
