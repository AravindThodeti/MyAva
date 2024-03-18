import * as React from "react";
import { List, Datagrid, TextField, ReferenceField, EditButton, ShowButton } from "react-admin";

const PlanList = (props) => (
  <List {...props} bulkActionButtons={false} exporter={false}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField
        label="Program"
        source="program_id"
        reference="programs"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" sortable={false} />
      <TextField source="price" sortable={false} />
      <TextField source="discounted_price" sortable={false} />
      <TextField source="validity" sortable={false} />
      <TextField source="priority" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

export default PlanList;
