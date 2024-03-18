import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  SelectField,
  Filter,
  TextInput,
  SelectInput,
} from "react-admin";
import { getChoices } from "../../utils";
import { ACTIVITY_TYPES } from "@ava/common";

const ActivityFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search By Name" source="name" alwaysOn />
    <SelectInput
      source="activity_type"
      label="Exercise Type"
      choices={getChoices(ACTIVITY_TYPES)}
      alwaysOn
    />
  </Filter>
);

const ActivityList = (props) => (
  <List
    {...props}
    bulkActionButtons={false}
    exporter={false}
    filters={<ActivityFilter />}
  >
    <Datagrid>
      <TextField sortable={false} source="id" />
      <TextField sortable={false} source="name" />
      <SelectField
        sortable={false}
        source="activity_type"
        label="Exercise Type"
        choices={getChoices(ACTIVITY_TYPES)}
      />
      <TextField sortable={false} source="video_url" />
      <EditButton />
    </Datagrid>
  </List>
);

export default ActivityList;
