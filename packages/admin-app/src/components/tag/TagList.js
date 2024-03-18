import * as React from "react";
import { List, Datagrid, TextField, Filter, TextInput } from "react-admin";

const TagFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="name" alwaysOn />
  </Filter>
)

const TagsList = (props) => (
  <List {...props} bulkActionButtons={false} filters={<TagFilter />} exporter={false}>
    <Datagrid>
      <TextField source="id" sortable={false} />
      <TextField source="name" sortable={false} />
    </Datagrid>
  </List>
);

export default TagsList;
