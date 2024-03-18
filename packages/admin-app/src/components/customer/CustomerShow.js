import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ListButton,
  TopToolbar,
  ReferenceField,
  EmailField,
} from "react-admin";
import AvatarField from "../AvatarField";
import TextArrayField from "../TextArrayField";

const CustomerShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

const CustomerShow = (props) => (
  <Show {...props} actions={<CustomerShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField label="" source="user_id" reference="users" link="show">
        <AvatarField source="image_url" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="name" />
      <DateField label="Date of Birth" source="date_of_birth" />
      <TextField source="mobile" />
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
        link="show"
      >
        <TextField source="id" />
      </ReferenceField>
      <TextField source="weight" />
      <TextArrayField source="symptoms" />
      <TextField source="pcos_from" />
      <DateField label="Created At" source="created_at" showTime={true} />
      <DateField label="Updated At" source="updated_at" showTime={true} />
    </SimpleShowLayout>
  </Show>
);

export default CustomerShow;
