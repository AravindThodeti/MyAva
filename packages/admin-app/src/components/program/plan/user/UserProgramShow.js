import * as React from "react";
import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  TopToolbar,
  ListButton,
  ReferenceField,
  DateField,
  ArrayField,
  Datagrid,
} from "react-admin";
import UserProgramActivate from "./UserProgramActivate";
import ConsultationProfileField from "components/ConsultationProfileField";
import { BASIC_QUESTIONS } from "@ava/common/lib/constants";

const UserProgramShowActions = ({ basePath, data, resource }) => {
  return (
  <TopToolbar>
    {data?.activated_on === null && <UserProgramActivate data={data} />}
    {data?.activated_on !== null && (
      <UserProgramActivate label="Change Service Provider" data={data} />
    )}
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
)};

const UserProgramShow = (props) => (
  <Show {...props} actions={<UserProgramShowActions />}>
    <TabbedShowLayout>
      <Tab label="summary">
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
        <ArrayField source="service_providers">
          <Datagrid>
            <TextField source="id" />
            <ReferenceField
              source="service_provider_id"
              reference="service_providers"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField
              source="created_by_id"
              reference="users"
              link="show"
            >
              <TextField source="email" />
            </ReferenceField>
          </Datagrid>
        </ArrayField>
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
        <TextField source="payment_gateway" label="Payment Gateway" />
        <TextField source="payment_gateway_payment_id" label="Payment Id" />
        <DateField source="created_at" showTime={true} />
        <DateField source="activated_on" showTime={true} />
        <DateField source="valid_till" />
      </Tab>
      <Tab label="profile" path="profile">
        <ConsultationProfileField
          source="profile"
          emptyText="Not yet filled"
          questionList={BASIC_QUESTIONS}
        />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default UserProgramShow;
