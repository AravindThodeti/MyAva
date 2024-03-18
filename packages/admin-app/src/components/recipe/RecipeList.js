import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  SelectField,
  EditButton,
  Filter,
  TextInput,
  SelectInput,
} from "react-admin";
import { getChoices } from "../../utils";
import { RECIPE_TYPE, MEASUREMENT_UNITS } from "@ava/common";

const RecipeFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search By Name" source="name" alwaysOn />
    <SelectInput
      source="recipe_type"
      label="Recipe Type"
      choices={getChoices(RECIPE_TYPE)}
      alwaysOn
    />
  </Filter>
);

const RecipeList = (props) => (
  <List
    {...props}
    bulkActionButtons={false}
    exporter={false}
    filters={<RecipeFilter />}
  >
    <Datagrid>
      <TextField sortable={false} source="id" />
      <TextField sortable={false} source="name" />
      <SelectField
        sortable={false}
        source="measurement_unit"
        choices={getChoices(MEASUREMENT_UNITS)}
      />
      <TextField sortable={false} source="calories" emptyText="Not Added" />
      <TextField sortable={false} source="carbs" emptyText="Not Added" />
      <TextField sortable={false} source="protein" emptyText="Not Added" />
      <TextField sortable={false} source="fats" emptyText="Not Added" />
      <TextField sortable={false} source="fibre" emptyText="Not Added" />
      <EditButton />
    </Datagrid>
  </List>
);

export default RecipeList;
