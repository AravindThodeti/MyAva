import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  ShowButton,
  ReferenceField,
} from "react-admin";
import AvatarField from "../AvatarField";

const CustomerList = (props) => (
  <List {...props} bulkActionButtons={false} exporter={false}>
    <Datagrid>
      <TextField sortable={false} source="id" />
      <ReferenceField
        sortable={false}
        label=""
        source="user_id"
        reference="users"
        link="show"
      >
        <AvatarField source="image_url" />
      </ReferenceField>
      <TextField sortable={false} source="title" />
      <TextField sortable={false} source="name" />
      <TextField sortable={false} source="mobile" />
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
        link="show"
      >
        <TextField sortable={false} source="id" />
      </ReferenceField>
      <DateField sortable={false} source="created_at" showTime={true} />
      <ShowButton />
    </Datagrid>
  </List>
);

export default CustomerList;
