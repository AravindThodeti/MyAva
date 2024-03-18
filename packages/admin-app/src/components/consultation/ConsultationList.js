import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  ShowButton,
  DateField,
  Filter,
  TextInput,
  SelectInput
} from "react-admin";
import { getChoices } from "../../utils";
import { CONSULTATION_STATUS} from "@ava/common";

const ConsultationFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Customer Name" source="customer_name" alwaysOn />
    <SelectInput
      source="status"
      label="Consultation Status"
      choices={getChoices(CONSULTATION_STATUS)}
      alwaysOn
    />
  </Filter>
);

const ConsultationList = (props) => (
  <List
    {...props}
    bulkActionButtons={false}
    exporter={false}
    sort={{ field: "id", order: "DESC" }}
    filters={<ConsultationFilter />}
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
      <DateField source="created_at" sortBy="createdAt" showTime={true} />
      <DateField source="slot_start" sortBy="slotStart" showTime={true} />
      <DateField source="slot_end" sortBy="slotEnd" showTime={true} />
      <ShowButton />
    </Datagrid>
  </List>
);

export default ConsultationList;
