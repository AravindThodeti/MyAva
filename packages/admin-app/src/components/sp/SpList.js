import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  ShowButton,
  ReferenceField,
  EditButton
} from "react-admin";
import AvatarField from "../AvatarField";

const SpList = (props) => (
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
      <ReferenceField
        sortable={false}
        source="department_id"
        reference="departments"
      >
        <TextField source="name" />
      </ReferenceField>
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
      <DateField sortable={false} source="activated_on" showTime={true} />
      <DateField sortable={false} source="created_at" showTime={true} />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

export default SpList;
