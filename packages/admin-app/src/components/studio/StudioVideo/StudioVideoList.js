import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ReferenceField
} from "react-admin";
const StudioVideoList = (props) => (
    <List
      {...props}
      bulkActionButtons={false}
      exporter={false}
    >
      <Datagrid>
        <TextField sortable={false} source="id" />
         <TextField source="provided_by" emptyText="Not Added"/>
        <TextField sortable={false} source="video_link" emptyText="Not Added" />
        <ReferenceField
        label="Disease"
        source="studio_disease_id"
        reference="studio_disease"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        label="Session"
        source="session_id"
        reference="studio_session"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField sortable={false} source="thumbnail" emptyText="Not Added" />
        <EditButton />
      </Datagrid>
    </List>
  );
  
  export default StudioVideoList;