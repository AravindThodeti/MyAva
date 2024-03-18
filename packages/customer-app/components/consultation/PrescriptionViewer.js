import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { getPrescriptionPdfUrl } from "@ava/common/lib/utils/ApiUtils";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import { number, object } from "prop-types";

const propTypes = {
  consultationId: number,
  prescription: object,
};

const PrescriptionViewer = ({ consultationId, prescription }) => {
  const [loading, setLoading] = React.useState(false);

  const handleViewPrescription = () => {
    if (prescription) {
      setLoading(true);
      getPrescriptionPdfUrl(consultationId, prescription.id)
        .then((res) => {
          const fileUrl = res.file_url;
          const pdfWindow = window.open();
          pdfWindow.location.href = fileUrl;
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  if (loading) {
    return <CenterCircularProgress />;
  }

  return (
    <>
      {prescription && (
        <Box display="flex" justifyContent="center" m={2} alignContent="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleViewPrescription}
          >
            View Prescription
          </Button>
        </Box>
      )}
    </>
  );
};
PrescriptionViewer.propTypes = propTypes;
export default PrescriptionViewer;
