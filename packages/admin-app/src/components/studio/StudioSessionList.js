import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton
} from "react-admin";
const StudioSessionList= (props) =>(
    <List
    {...props}
    bulkActionButtons={false}
    exporter={false}
  >
    <Datagrid>
      <TextField sortable={false} source="id" />
      <TextField sortable={false} source="name" />
      <TextField sortable={false} source="active" />
      <EditButton />
      </Datagrid>
    </List>
);
export default StudioSessionList;