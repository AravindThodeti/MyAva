import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
} from "react-admin";
const LiveSessionList = (props) => (
    <List
      {...props}
      bulkActionButtons={false}
      exporter={false}
    >
      <Datagrid>
        <TextField sortable={false} source="id" />
         <DateField source="session_starts_at"/>
         <DateField source="session_ends_at" />
        <TextField sortable={false} source="session_link" emptyText="Not Added" />
        <TextField sortable={false} source="activity_type" emptyText="Not Added" />
        <TextField sortable={false} source="thumbnail" emptyText="Not Added" />
        <TextField sortable={false} source="organizer_name" emptyText="Not Added" />
        <EditButton />
      </Datagrid>
    </List>
  );
  
  export default LiveSessionList;