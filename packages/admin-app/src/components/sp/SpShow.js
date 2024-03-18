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
  useUpdate,
  Button,
} from "react-admin";
import AvatarField from "../AvatarField";
import TextArrayField from "../TextArrayField";

const SpShowActions = ({ basePath, data, resource }) => {
  const [activate, { loading }] = useUpdate(
    resource,
    data ? data.id : 0,
    { updateType: "activate" },
    data
  );

  return (
    <TopToolbar>
      {data && data.activated_on === null && (
        <Button label="Activate" onClick={activate} disabled={loading} />
      )}
      <ListButton basePath={basePath} record={data} />
    </TopToolbar>
  );
};

const SpShow = (props) => (
  <Show {...props} actions={<SpShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField label="" source="user_id" reference="users" link="show">
        <AvatarField source="image_url" />
      </ReferenceField>
      <ReferenceField
        sortable={false}
        source="department_id"
        reference="departments"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="name" />
      <TextField source="mobile" />
      <TextField source="gender" />
      <DateField label="Experience From" source="experience_from" />
      <TextField source="qualification" />
      <TextArrayField source="languages_spoken" />
      <TextArrayField source="specializations" />
      <ReferenceField
        link={false}
        label="Email"
        source="user_id"
        reference="users"
      >
        <EmailField source="email" />
      </ReferenceField>
      <ReferenceField label="User" source="user_id" reference="users" link="show">
        <TextField source="id" />
      </ReferenceField>
      <DateField label="Activated On" source="activated_on" showTime={true}/>
      <DateField label="Created At" source="created_at" showTime={true} />
      <DateField label="Updated At" source="updated_at" showTime={true} />
    </SimpleShowLayout>
  </Show>
);

export default SpShow;
