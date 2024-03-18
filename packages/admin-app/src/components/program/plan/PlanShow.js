import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  ListButton,
  CreateButton,
  RichTextField,
  ReferenceField
} from "react-admin";

const PlanShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <CreateButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

const PlanShow = (props) => (
  <Show {...props} actions={<PlanShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField label="Program" source="program_id" reference="programs">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <RichTextField source="details" />
      <TextField source="price" />
      <TextField source="discounted_price" />
      <TextField source="validity" />
      <TextField source="priority" />
    </SimpleShowLayout>
  </Show>
);

export default PlanShow;
