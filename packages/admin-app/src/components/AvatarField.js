import * as React from "react";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core";

const AvatarField = ({ source, record = {}, ...props }) => (
  <Avatar src={record[source]} />
);
AvatarField.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};

export default AvatarField;
