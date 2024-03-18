import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import Select from '@material-ui/core/Select';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import { saveProfile } from '../store/actions/api.action';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
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
        alignContent: 'flex-end'
    }
}));

export default function Profile() {
    const classes = useStyles();
    const profile = useSelector((state) => state.profileReducer.profile);
    const error = useSelector((state) => state.profileReducer.error);
    const dispatch = useDispatch();
    const [title, setTitle] = React.useState(profile.user.title || '');
    const [specialization, setSpecialization] = React.useState(profile.specialization || '');
    const [selectedDate, setSelectedDate] = React.useState(new Date(profile.experience_from));
    const [qualification, setQualification] = React.useState(profile.qualification || '');
    const [save, setSave] = React.useState(profile.activated_on ? false : true);

    const titles = [
        { name: 'Dr.', value: 'Dr' },
        { name: 'Mrs.', value: 'Mrs' },
        { name: 'Mr.', value: 'Mr' },
        { name: 'Miss.', value: 'Miss' },
    ];

    const specializations = [
        { name: 'Gynacelogist', value: 'Gynacelogist'.toUpperCase() },
        { name: 'Nutritionist', value: 'Nutritionist'.toUpperCase() },
        { name: 'Skin Care', value: 'Skin_Care'.toUpperCase() },
    ]

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSpecializationChange = (event) => {
        setSpecialization(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleQualificationChange = (event) => {
        setQualification(event.target.value);
    }

    const handleSave = () => {
        let data = {
            ...profile,
            qualification,
            specialization,
            experience_from: selectedDate.toISOString(),
            user: {
                ...profile.user,
                title
            }
        };
        dispatch(saveProfile(profile.id, data));
    }


    const titleItems = titles.map((item, i) => <MenuItem key={i} value={item.value}>{item.name}</MenuItem>);
    const specializationItems = specializations.map((item, i) => <MenuItem key={i} value={item.value}>{item.name}</MenuItem>);

    const profileForm =
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
            <TextField id="standard-basic" label="Name" InputProps={{
                readOnly: true,
            }} value={profile.user.name} />
            <TextField id="standard-basic" label="Email" InputProps={{
                readOnly: true,
            }} value={profile.user.email} />
            <TextField id="standard-basic" label="Qualification" value={qualification} onChange={handleQualificationChange} />
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Specialization</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={specialization}
                    onChange={handleSpecializationChange}
                    required={true}
                >
                    {specializationItems}
                </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        views={["year", "month"]}
                        openTo="year"
                        variant="inline"
                        format="MMM, yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Experience From"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                disabled={!save}
                startIcon={<SaveIcon />}
                onClick={handleSave}
            >
                Save
      </Button>
        </form>

    if (error) {
        return <>
            {profileForm}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={true}
                autoHideDuration={6000}
                message={error.error} />
        </>
    }
    return <> {profileForm}
    </>
}