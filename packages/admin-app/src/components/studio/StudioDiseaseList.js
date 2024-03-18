import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton
} from "react-admin";
const StudioDiseaseList= (props) =>(
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
export default StudioDiseaseList;