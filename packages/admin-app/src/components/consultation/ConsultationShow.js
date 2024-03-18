import * as React from "react";
import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  ReferenceField,
  DateField,
  TopToolbar,
  ListButton,
  ReferenceManyField,
  Datagrid,
  Pagination,
  useMutation,
  Button,
} from "react-admin";
import RefreshIcon from "@material-ui/icons/Refresh";
import ConsultationProfileField from "components/ConsultationProfileField";
import { BASIC_QUESTIONS } from "@ava/common/lib/constants";

const ConsultationShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

const RefreshButtonField = (props) => {
  const [update, { loading }] = useMutation({
    type: "update",
    resource: "calls",
    payload: { id: props.record.id, data: { updateType: "status", consultation_id: props.record.consultation_id } },
  });
  return (
    <Button
      label="Refresh"
      title="Refresh"
      onClick={update}
      disabled={loading}
    >
      <RefreshIcon />
    </Button>
  );
};

const ConsultationShow = (props) => (
  <Show {...props} actions={<ConsultationShowActions />}>
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
        <ReferenceField
          label="Service Provider"
          source="service_provider_id"
          reference="service_providers"
          sortable={false}
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <TextField source="status" />
        <ReferenceField
          label="UserProgram"
          source="user_program_id"
          reference="user_programs"
          sortable={false}
          link="show"
          emptyText="NA"
        >
          <TextField source="id" />
        </ReferenceField>
        <DateField source="slot_start" showTime={true} />
        <DateField source="slot_end" showTime={true} />
        <DateField source="created_at" showTime={true} />
        <DateField source="updated_at" showTime={true} />
        <DateField source="reminder_sent_at" showTime={true} />
        <TextField source="price" />
        <TextField source="payment_gateway" />
        <TextField source="payment_gateway_payment_id" />
      </Tab>
      <Tab label="profile" path="profile">
        <ConsultationProfileField
          source="profile"
          emptyText="Not yet filled"
          questionList={BASIC_QUESTIONS}
        />
      </Tab>
      <Tab label="consent" path="consent">
        <ConsultationProfileField
          source="consent"
          emptyText="Not yet filled"
          questionList={BASIC_QUESTIONS}
        />
      </Tab>
      <Tab label="department questions" path="depatment">
        <ConsultationProfileField
          source="department_questionnaire"
          emptyText="Not yet filled"
          questionList={BASIC_QUESTIONS}
        />
      </Tab>
      <Tab label="calls" path="calls">
        <ReferenceManyField
          reference="calls"
          target="consultation_id"
          addLabel={false}
          pagination={<Pagination />}
        >
          <Datagrid>
            <TextField source="id" />
            <TextField label="External Id" source="external_id" />
            <DateField source="created_at" showTime={true} />
            <DateField source="updated_at" showTime={true} />
            <TextField source="external_response" label="External Response" />
            <RefreshButtonField />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default ConsultationShow;
