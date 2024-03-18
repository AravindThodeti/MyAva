import * as React from "react";
import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  DateField,
  ListButton,
  TopToolbar,
  ReferenceField,
  EmailField,
  ArrayField,
  SingleFieldList,
  ChipField,
  ReferenceManyField,
  Datagrid,
  useUpdate,
  Button,
  Pagination,
} from "react-admin";
import ImageArrayField from "../ImageArrayField";

const PostShowActions = ({ basePath, data, resource }) => {
  const [approve, { loading }] = useUpdate(
    resource,
    data ? data.id : 0,
    { updateType: "approve" },
    data
  );
  return (
    <TopToolbar>
      {data && data.approved_on === null && (
        <Button label="Approve" onClick={approve} disabled={loading} />
      )}
      <ListButton basePath={basePath} record={data} />
    </TopToolbar>
  );
};

const PostShow = (props) => (
  <Show {...props} actions={<PostShowActions />}>
    <TabbedShowLayout>
      <Tab label="post">
        <TextField source="id" />
        <TextField source="content" />
        <ReferenceField
          link={false}
          sortable={false}
          label="Email"
          source="user.id"
          reference="users"
        >
          <EmailField source="email" />
        </ReferenceField>
        <ReferenceField
          link="show"
          sortable={false}
          label="User"
          source="user.id"
          reference="users"
        >
          <TextField source="id" />
        </ReferenceField>
        <ArrayField source="tags">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ArrayField>
        <TextField source="likes" />
        <TextField source="comments" />
        <ImageArrayField source="images" />
        <DateField
          source="approved_on"
          emptyText="Not Approved"
          showTime={true}
        />
        <DateField source="created_at" showTime={true} />
      </Tab>
      <Tab label="comments" path="comments">
        <ReferenceManyField
          reference="comments"
          target="post_id"
          addLabel={false}
          pagination={<Pagination />}
        >
          <Datagrid>
            <TextField source="comment" />
            <TextField label="By" source="user.name" />
            <ReferenceField label="User" source="user.id" reference="users" link="show">
              <TextField source="id" />
            </ReferenceField>
            <DateField source="created_at" showTime={true} />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default PostShow;
