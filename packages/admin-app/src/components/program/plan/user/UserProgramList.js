import * as React from "react";
import { cloneElement, useMemo } from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  ShowButton,
  DateField,
  useListContext,
  Button,
  sanitizeListRestProps,
  TopToolbar,
} from "react-admin";
import PaymentCaptureButton from "../../../PaymentCaptureButton";

const ListActions = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    hasCreate,
    basePath,
    selectedIds,
    showFilter,
    total,
  } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button",
        })}
        <PaymentCaptureButton />
    </TopToolbar>
  );
};

const UserProgramList = (props) => (
  <List
    {...props}
    bulkActionButtons={false}
    exporter={false}
    sort={{ field: "id", order: "DESC" }}
    actions={<ListActions />}
  >
    <Datagrid>
      <TextField source="id" />
      <ReferenceField
        label="Customer"
        source="customer_id"
        reference="customers"
        sortable={false}
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="status" />
      <ReferenceField
        label="Plan"
        source="plan_id"
        reference="plans"
        sortable={false}
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        label="Program"
        source="plan_id"
        reference="plans"
        link={false}
        sortable={false}
      >
        <ReferenceField source="program_id" reference="programs" link={false}>
          <TextField source="name" />
        </ReferenceField>
      </ReferenceField>
      <DateField source="created_at" sortBy="createdAt" />
      <DateField source="activated_on" sortBy="activatedOn" />
      <DateField source="valid_till" sortBy="validTill" />
      <ShowButton />
    </Datagrid>
  </List>
);

export default UserProgramList;
