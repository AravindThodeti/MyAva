import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Chat from "@ava/common/lib/components/Chat";
import { getPrescription } from "@ava/common/lib/utils/ApiUtils";
import PrescriptionViewer from "./PrescriptionViewer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ChatPrescriptionTab({ consultationId }) {
  const [value, setValue] = React.useState(0);
  const [prescription, setPrescription] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (consultationId) {
      getPrescription(consultationId)
        .then((res) => {
          setPrescription(res);
        })
        .catch(() => {});
    }
  }, [consultationId]);

  if (prescription == null) {
    return <Chat consultationId={consultationId} />;
  }

  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="tabs"
          centered
        >
          <Tab label="Consultation" {...a11yProps(0)} />
          <Tab
            label="Prescription"
            disabled={!prescription}
            {...a11yProps(1)}
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Chat consultationId={consultationId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {prescription && (
          <PrescriptionViewer
            consultationId={consultationId}
            prescription={prescription}
          />
        )}
      </TabPanel>
    </>
  );
}
