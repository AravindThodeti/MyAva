import * as React from "react";
import { Toolbar, SaveButton } from "react-admin";

const EditToolbarWithoutDelete = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export default EditToolbarWithoutDelete;
