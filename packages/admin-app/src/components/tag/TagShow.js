import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  ListButton,
  CreateButton,
} from "react-admin";

const TagShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <CreateButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

const TagsShow = (props) => (
  <Show {...props} actions={<TagShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);

export default TagsShow;
