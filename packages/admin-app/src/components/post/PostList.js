import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  ShowButton,
  ReferenceField,
  ArrayField,
  SingleFieldList,
  ChipField,
  TopToolbar,
  Button,
} from "react-admin";
import ForumIcon from "@material-ui/icons/Forum";
import { getTribeToken } from "@ava/common/lib/utils/ApiUtils";
import { TRIBE_LOGIN_REDIRECTION_URL } from "@ava/common";

const TribeRedirectAction = (props) => {
  return (
    <TopToolbar>
      <Button
        onClick={() => {
          getTribeToken()
          .then((res) => {
            window.location.href = TRIBE_LOGIN_REDIRECTION_URL(res.token);
          }).catch((exp) => {
            alert(`Unable to redirect - Error ${exp}`);
          });
        }}
        label="View Tribe Community"
      >
        <ForumIcon />
      </Button>
    </TopToolbar>
  );
};

const PostList = (props) => (
  <List
    {...props}
    bulkActionButtons={false}
    actions={<TribeRedirectAction />}
    exporter={false}
  >
    <Datagrid>
      <TextField sortable={false} source="id" />
      <TextField sortable={false} source="content" />
      <ReferenceField
        link={false}
        sortable={false}
        label="Email"
        source="user.id"
        reference="users"
      >
        <EmailField sortable={false} source="email" />
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
      <ArrayField source="tags" sortable={false}>
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <TextField sortable={false} source="likes" />
      <TextField sortable={false} source="comments" />
      <DateField
        sortable={false}
        source="approved_on"
        emptyText="Not Approved"
      />
      <DateField sortable={false} source="created_at" showTime={true} />
      <ShowButton />
    </Datagrid>
  </List>
);

export default PostList;
