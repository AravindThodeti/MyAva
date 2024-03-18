import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useDispatch} from "react-redux";
import {getConsultationsList} from "@/utils/ApiUtils";

const PrescriptionTracker = (props) => {
// const dispatch = useDispatch();


    const handleViewPrescriptionClick = (event) => {
        getConsultationsList(1, false, props.userProgramId).then((consultationsList) => {
            if (consultationsList.has_next) throw Error("Prescriptions: multiple pages not handled");
            if (consultationsList.total==0) alert("No consultations taken yet");
            if (consultationsList.total>1) throw Error("Prescriptions: multiple consultations not handled")
            debugger;

        });
    };

    return (
        <>
            <Typography variant="h6">Prescription</Typography>
            <br/>
            <Button
                variant="contained"
                size="small"
                // className={classes.weightButton}
                onClick={handleViewPrescriptionClick}
            >
                View Prescription
            </Button>
        </>
    );
};

export default PrescriptionTracker;