import * as React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ConsultationList from "./ConsultationList";

export default function MyConsultation() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {}, [value]);

  return (
    <div>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        onChange={handleChange}
      >
        <Tab label="Active" />
        <Tab label="History" />
      </Tabs>
      <ConsultationList active={value == 0} />
    </div>
  );
}
