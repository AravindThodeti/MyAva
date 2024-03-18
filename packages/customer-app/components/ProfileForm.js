import "date-fns";
import * as React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SaveIcon from "@material-ui/icons/Save";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { saveProfile, getCustomerProfile } from "../store/actions/api.action";

import {useState} from "react";
import {deleteProfileApi} from "@/utils/ApiUtils";
import ConfirmationDialogue from "@/components/confirmationDialogue";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    alignContent: "flex-end",
  },
  a:{
    color:"black",
    padding:"10px",
  },
  submission:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop:"10px"
}
  }));

export default function ProfileForm({
  submitButtonLabel = "Save",
  navigateTo = null,
  navigateAs = null,
  saveFunction = null,
  functionArguments = null,
}) {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer.profile);
  const saved = useSelector((state) => state.profileReducer.profileSaved);
  const fetchError = useSelector((state) => state.profileReducer.fetchError);
  const saveError = useSelector((state) => state.profileReducer.saveError);
  const [title, setTitle] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [pcosSymptoms, setPcosSymptoms] = React.useState([]);
  const [medication, setMedication] = React.useState(false);
  const [symptomFrom, setSymptomFrom] = React.useState("");
  const [dialogueOpen, setDialogueOpen] = useState(false);

  const handleClickDialogueOpen = () => {
    setDialogueOpen(true);
  };
  
const onDeletion = () =>{
  deleteProfileApi();
  localStorage.clear();
  router.push("/user/otpLogin");
}

  const pcosSymptomsList = [
    { title: "Weight Gain" },
    { title: "Weight Loss" },
    { title: "Acne" },
    { title: "Hair Loss" },
    { title: "Facial Hair" },
    { title: "Irregular Periods" },
    { title: "Extended Periods" },
  ];

  const titles = [
    { name: "Dr.", value: "Dr" },
    { name: "Mrs.", value: "Mrs" },
    { name: "Miss.", value: "Miss" },
  ];

  const symptomsFromList = [
    { name: "1 month", value: "1 month" },
    { name: "3 months", value: "3 months" },
    { name: "6 months", value: "6 months" },
    { name: "1 year", value: "1 year" },
    { name: "3 years", value: "1 years" },
    { name: "More than 3 Years", value: "More than 3 Years" },
  ];

  React.useEffect(() => {
    if (profile === undefined) {
      dispatch(getCustomerProfile());
    } else if (profile) {
      setSelectedDate(new Date(profile.date_of_birth));
      setMobile(profile.mobile);
      setTitle(profile.title);
      setWeight(profile.weight);
      setSymptomFrom(profile.pcos_from);
      setMedication(profile.medication);
    }
  }, [profile]);

  if (fetchError) {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={true}
        message={fetchError.message}
      />
    );
  }

  if (saved && navigateTo != null) {
    router.replace(navigateTo, navigateAs);
  }

  if (profile) {
    const titleItems = titles.map((item, i) => (
      <MenuItem key={i} value={item.value}>
        {item.name}
      </MenuItem>
    ));

    let defaultSymptoms = [];

    if (profile.symptoms) {
      profile.symptoms.forEach((element) => {
        let index = pcosSymptomsList.findIndex(
          (symptom) => symptom.title == element
        );
        if (index > -1) {
          defaultSymptoms.push(pcosSymptomsList[index]);
        }
      });
    }

    const symptomFromItems = symptomsFromList.map((item, i) => (
      <MenuItem key={i} value={item.value}>
        {item.name}
      </MenuItem>
    ));

    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };

    const handleDOBChange = (date) => {
      setSelectedDate(date);
    };

    const handleMobileChange = (event) => {
      setMobile(event.target.value);
    };

    const handleWeightChange = (event) => {
      setWeight(event.target.value);
    };

    const handleSymptomsChange = (event, value) => {
      setPcosSymptoms(value);
    };

    const handleMedicationChange = () => {
      setMedication(event.target.checked);
    };

    const handleSymptomFromChange = (event) => {
      setSymptomFrom(event.target.value);
    };

    const handleSave = () => {
      let data = {
        ...profile,
        mobile,
        title,
        date_of_birth: selectedDate.toISOString(),
        weight,
        symptoms: pcosSymptoms.map((symptom) => symptom.title),
        medication,
        pcos_from: symptomFrom,
      };
      if (saveFunction) {
        dispatch(saveFunction(functionArguments, data));
      }
      dispatch(saveProfile(profile.id, data));
    };

    const profileForm = (
      <>
      <ConfirmationDialogue 
        open={dialogueOpen}
        handleClose={() => {
          setDialogueOpen(false)}}
        leftFunction={onDeletion}
        rightFunction={() => {
          setDialogueOpen(false)
        }}
        message ="Your account will be deleted permanently , do you want to continue ?"
        alert = "Are you sure to delete ?"
        leftButton="Yes"
        rightButton="No"
        />
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Title</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={title}
            onChange={handleTitleChange}
            required={true}
          >
            {titleItems}
          </Select>
        </FormControl>
        <TextField
          id="standard-basic"
          label="Name"
          InputProps={{
            readOnly: true,
          }}
          value={profile.name}
        />
        <TextField
          id="standard-basic"
          label="Email"
          InputProps={{
            readOnly: true,
          }}
          value={profile.user.email}
        />
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">
            Mobile Number
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={profile.mobile}
            onChange={handleMobileChange}
            startAdornment={
              <InputAdornment position="start">+91</InputAdornment>
            }
          />
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableFuture
              openTo="year"
              format="dd-MM-yyyy"
              margin="normal"
              views={["year", "month", "date"]}
              id="date-picker-inline"
              label="Date of Birth"
              value={selectedDate}
              onChange={handleDOBChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">Weight</InputLabel>
          <Input
            type="number"
            id="standard-adornment-amount"
            value={weight}
            onChange={handleWeightChange}
            endAdornment={<InputAdornment position="start">Kgs</InputAdornment>}
          />
        </FormControl>
        <Autocomplete
          onChange={handleSymptomsChange}
          multiple
          id="tags-standard"
          options={pcosSymptomsList}
          getOptionLabel={(option) => option.title}
          defaultValue={defaultSymptoms}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="PCOS Symptoms"
              placeholder="PCOS Symptoms"
            />
          )}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            Sufferring from PCOS from?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={symptomFrom}
            onChange={handleSymptomFromChange}
            required={true}
          >
            {symptomFromItems}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <FormControlLabel
            control={
              <Checkbox
                checked={medication}
                onChange={handleMedicationChange}
                name="medication"
                color="primary"
              />
            }
            label="Are you on medication?"
          />
        </FormControl>
        <div className={classes.submission}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          {submitButtonLabel}
        </Button>
        <a className={classes.a} onClick={handleClickDialogueOpen}>Delete my account</a>
        </div>
      </form>
      </>
    );

    if (saveError) {
      const saveErrorMessage = (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={true}
          message={saveError.message}
        />
      );
      return (
        <>
          {profileForm}
          {saveErrorMessage}
        </>
      );
    }

    return profileForm;
  }
  return <CircularProgress />;
}
