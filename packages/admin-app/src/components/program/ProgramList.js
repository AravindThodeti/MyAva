import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
} from "react-admin";

const ProgramList = (props) => (
  <List {...props} bulkActionButtons={false} exporter={false}>
    <Datagrid>
      <TextField source="id" sortable={false} />
      <TextField source="name" sortable={false} />
      <EditButton />
    </Datagrid>
  </List>
);

export default ProgramList;
