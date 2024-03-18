import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import Select from "@material-ui/core/Select";
import { LANGUAGES, SPECIALIZATIONS } from "constants/index";
import FormLabel from "@material-ui/core/FormLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import TimeAgo from "react-timeago";
import {
  saveProfile,
  getDepartments,
  getServiceProviderProfile,
  saveSignature,
  saveImage,
} from "store/actions/api.action";
import {
  Container,
  Input,
  Chip,
  Box,
  Typography,
  ListItemText,
  Checkbox,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";

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
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  userImage: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedValues, theme) {
  return {
    fontWeight:
      selectedValues.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Profile() {
  const theme = useTheme();
  const classes = useStyles();
  const profile = useSelector((state) => state.profileReducer.profile);
  const [fetchedProfile, setFetchedProfile] = React.useState(false);
  const departments = useSelector(
    (state) => state.departmentsReducer.departments
  );
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState(profile.title || "");
  const [department, setDepartment] = React.useState(
    profile.department ? profile.department.id : "" || ""
  );
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(profile.experience_from)
  );
  const [qualification, setQualification] = React.useState(
    profile.qualification || ""
  );
  const [specializations, setSpecializations] = React.useState(
    profile.specializations
      ? profile.specializations.map((value) => value.toUpperCase())
      : [] || []
  );
  const [languagesSpoken, setLanguagesSpoken] = React.useState(
    profile.languages_spoken
      ? profile.languages_spoken.map((value) => value.toUpperCase())
      : [] || []
  );
  const [gender, setGender] = React.useState(profile.gender || "");

  const [mobile, setMobile] = React.useState(profile.mobile || "");

  const [college, setCollege] = React.useState(profile.college || "");
  const [collegeYear, setCollegeYear] = React.useState(
    new Date(profile.college_year)
  );
  const [degree, setDegree] = React.useState(profile.degree || "");

  const [registrationCouncil, setRegistrationCouncil] = React.useState(
    profile.registration_council || ""
  );
  const [registrationYear, setRegistrationYear] = React.useState(
    new Date(profile.registration_year)
  );
  const [registrationNumber, setRegistrationNumber] = React.useState(
    profile.registration_number || ""
  );

  //const [save, setSave] = React.useState(profile.activated_on ? false : true);

  const titles = [
    { name: "Dr.", value: "Dr" },
    { name: "Mrs.", value: "Mrs" },
    { name: "Mr.", value: "Mr" },
    { name: "Miss.", value: "Miss" },
  ];

  React.useEffect(() => {
    if (departments === undefined) {
      dispatch(getDepartments());
    }
  });

  React.useEffect(() => {
    if (profile) {
      if (profile.activated_on === null && fetchedProfile === false) {
        dispatch(getServiceProviderProfile());
        setFetchedProfile(true);
      }
    }
  }, [profile]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguagesSpoken(event.target.value);
  };

  const handleSpecializationChange = (event) => {
    setSpecializations(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleQualificationChange = (event) => {
    setQualification(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleCollegeChange = (event) => {
    setCollege(event.target.value);
  };

  const handleDegreeChange = (event) => {
    setDegree(event.target.value);
  };

  const handleCollegeYearChange = (date) => {
    setCollegeYear(date);
  };

  const handleRegistrationCouncilChange = (event) => {
    setRegistrationCouncil(event.target.value);
  };

  const handleRegistrationNumberChange = (event) => {
    setRegistrationNumber(event.target.value);
  };

  const handleRegistrationYearChange = (date) => {
    setRegistrationYear(date);
  };

  const handleSignatureChange = (event) => {
    const files = event.target.files;
    if (profile && files.length > 0) {
      const formData = new FormData();
      formData.append("signature", files[0]);
      dispatch(saveSignature(profile.id, formData));
    }
  };

    const handleImageChange = (event) => {
    const files = event.target.files;
    if (profile && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      dispatch(saveImage(profile.id, formData));
    }
  };

  const getAccountStatus = () => {
    if (profile) {
      if (profile.activated_on === null) {
        const keys = Object.keys(profile);
        for (let i = 0; i < keys.length; i++) {
          if (
            keys[i] == "date_of_birth" ||
            keys[i] == "activated_on" ||
            keys[i] == "degree" ||
            keys[i] == "college" ||
            keys[i] == "college_year" ||
            keys[i] == "registration_council" ||
            keys[i] == "registration_number" ||
            keys[i] == "registration_year"
          ) {
            continue;
          }
          if (
            profile[keys[i]] == null ||
            profile[keys[i]] == "" ||
            (profile[keys[i]].length && profile[keys[i]].length === 0)
          ) {
            return (
              <Alert severity="warning">Please Complete the Profile</Alert>
            );
          }
        }
        return <Alert severity="info">Account under Review</Alert>;
      }
    }
    return <></>;
  };

  const handleSave = () => {
    let data = {
      ...profile,
      qualification,
      department: {
        id: department,
      },
      specializations,
      languages_spoken: languagesSpoken,
      experience_from: selectedDate.toISOString(),
      title,
      gender,
      mobile,
      registration_number: registrationNumber,
      registration_council: registrationCouncil,
      registration_year: registrationYear.toISOString(),
      college,
      college_year: collegeYear,
      degree,
    };
    dispatch(saveProfile(profile.id, data));
  };

  const titleItems = titles.map((item, i) => (
    <MenuItem key={i} value={item.value}>
      {item.name}
    </MenuItem>
  ));

  const experienceFormatter = function defaultFormatter(value, unit) {
    if (value !== 1) {
      unit += "s";
    }
    return `${value} ${unit} of Experience`;
  };

  const getExperienceInYears = () => {
    if (selectedDate) {
      try {
        return (
          <TimeAgo
            date={selectedDate.toISOString()}
            formatter={experienceFormatter}
          />
        );
      } catch (ex) {
        console.log(ex);
      }
    }
    return <></>;
  };

  if (departments) {
    const departmentItems = Object.values(departments).map(
      (department, index) => {
        return (
          <MenuItem key={index} value={department.id}>
            {department.name}
          </MenuItem>
        );
      }
    );
    const SignatureField = () => {
      let label = "Add Signature";
      if (profile && profile.signature_url) {
        label = "Replace Signature";
      }
      return (
        <Box mt={2}>
          <input
            accept="image/jpeg,image/png"
            className={classes.input}
            style={{ display: "none" }}
            id="attachment-button-input"
            type="file"
            onChange={handleSignatureChange}
          />
          <label htmlFor="attachment-button-input">
            <Button
              variant="outlined"
              className={classes.addImageButton}
              aria-label="attachment"
              color="primary"
              component="span"
            >
              {label}
            </Button>
          </label>
        </Box>
      );
    };
    const profileForm = (
      <form className={classes.root} noValidate autoComplete="off">
        <FormControlLabel
          control={<Switch checked={!!profile.activated_on} color="primary" />}
          label="Account Activated"
          labelPlacement="start"
        />
        {getAccountStatus()}
        <Box display="flex" justifyContent="center" flexDirection="row" alignContent="center" alignItems="center">
          <input
            accept="image/jpeg,image/png"
            className={classes.input}
            style={{ display: "none" }}
            id="attachment-image-input"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="attachment-image-input">
            <Avatar className={classes.userImage} alt={profile.name} src={profile.user.image_url} />
          </label>
        </Box>
        <FormControl className={classes.formControl}>
          <InputLabel>Title</InputLabel>
          <Select value={title} onChange={handleTitleChange} required={true}>
            {titleItems}
          </Select>
        </FormControl>
        <TextField
          label="Name"
          InputProps={{
            readOnly: true,
          }}
          value={profile.name}
        />
        <TextField
          label="Email"
          InputProps={{
            readOnly: true,
          }}
          value={profile.user.email}
        />

        <TextField
          label="Mobile *"
          value={mobile}
          onChange={handleMobileChange}
          type="number"
        />

        <FormControl component="fieldset">
          <FormLabel component="legend">Gender *</FormLabel>
          <RadioGroup
            row
            aria-label="Gender"
            name="gender"
            value={gender}
            onChange={handleGenderChange}
          >
            <FormControlLabel
              value="FEMALE"
              control={<Radio color="primary" />}
              label="Female"
            />
            <FormControlLabel
              value="MALE"
              control={<Radio color="primary" />}
              label="Male"
            />
            <FormControlLabel
              value="OTHER"
              control={<Radio color="primary" />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Qualification *"
          value={qualification}
          onChange={handleQualificationChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel>Department *</InputLabel>
          <Select
            value={department}
            onChange={handleDepartmentChange}
            required={true}
          >
            {departmentItems}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Specialization *</InputLabel>
          <Select
            multiple={true}
            value={specializations}
            onChange={handleSpecializationChange}
            input={<Input />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {SPECIALIZATIONS.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox
                  color="primary"
                  checked={specializations.indexOf(name) > -1}
                />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Languages Spoken *</InputLabel>
          <Select
            multiple={true}
            value={languagesSpoken}
            onChange={handleLanguageChange}
            input={<Input />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {LANGUAGES.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox
                  color="primary"
                  checked={languagesSpoken.indexOf(name) > -1}
                />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableFuture
              views={["year", "month"]}
              openTo="year"
              format="MMM, yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Experience From *"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Typography>{getExperienceInYears()}</Typography>
        <TextField
          label="College"
          value={college}
          onChange={handleCollegeChange}
        />
        <TextField
          label="Degree"
          value={degree}
          onChange={handleDegreeChange}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableFuture
              views={["year"]}
              openTo="year"
              format="yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Batch of"
              value={collegeYear}
              onChange={handleCollegeYearChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <TextField
          label="Registration Council"
          value={registrationCouncil}
          onChange={handleRegistrationCouncilChange}
        />
        <TextField
          label="Registration Number"
          value={registrationNumber}
          onChange={handleRegistrationNumberChange}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableFuture
              views={["year"]}
              openTo="year"
              format="yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Registration Year"
              value={registrationYear}
              onChange={handleRegistrationYearChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <SignatureField />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save
        </Button>
      </form>
    );
    return <Container>{profileForm}</Container>;
  }
  return <CenterCircularProgress />;
}
