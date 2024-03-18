import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  DateField,
} from "react-admin";

const DepartmentList = (props) => (
  <List {...props} bulkActionButtons={false} exporter={false}>
    <Datagrid>
      <TextField source="id" sortable={false} />
      <TextField source="name" sortable={false} />
      <NumberField source="price" sortable={false} />
      <NumberField source="priority" sortable={false} />
      <BooleanField source="active" sortable={false} />
      <DateField source="created_at" sortable={false} />
    </Datagrid>
  </List>
);

export default DepartmentList;
