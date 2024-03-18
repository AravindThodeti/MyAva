import * as React from "react";
import { Form, Field } from "react-final-form";
import PropTypes from "prop-types";
import { createPrescription } from "utils/ApiUtils";
import { TextField } from "mui-rff";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { FORM_ERROR } from "final-form";
import Alert from "@material-ui/lab/Alert";
import {
  getPrescriptionPdfUrl,
  getPrescription,
} from "@ava/common/lib/utils/ApiUtils";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";

const TextInput = ({ input, meta, ...rest }) => {
  return <TextField {...input} {...rest} {...meta} />;
};

const WhenRadioInput = ({ input, meta, ...rest }) => {
  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">When? *</FormLabel>
      <RadioGroup
        aria-label="when"
        {...input}
        {...rest}
        {...meta}
        row
        defaultValue={meta.initial || "BEFORE_FOOD"}
      >
        <FormControlLabel
          value="BEFORE_FOOD"
          control={<Radio color="primary" />}
          label="Before Food"
        />
        <FormControlLabel
          value="AFTER_FOOD"
          control={<Radio color="primary" />}
          label="After Food"
        />
      </RadioGroup>
      <FormHelperText>{meta.error}</FormHelperText>
    </FormControl>
  );
};

export default function Prescription(props) {
  const [prescription, setPrescription] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (props.consultationId) {
      setLoading(true);
      getPrescription(props.consultationId)
        .then((res) => {
          setPrescription(res);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [props.consultationId]);

  const validate = (values) => {
    const errors = {};
    if (!values.provisional_diagnosis) {
      errors.provisional_diagnosis = "Required";
    }
    if (!values.general_advice) {
      errors.general_advice = "Required";
    }
    return errors;
  };

  function arrayHasInvalid(array) {
    let hasInvalid = false;

    for (let i = 0; i < array.length; i += 1) {
      if (array[i]) {
        hasInvalid = true;
        break;
      }
    }

    return hasInvalid;
  }

  const medicineValidate = (values) => {
    if (values === undefined || values === null) {
      return;
    }
    if (values.length === 0) {
      return;
    }

    const errorsArray = [];

    values.forEach((value, index) => {
      if (value) {
        const errors = {};

        if (!value.name) {
          errors.name = "Required";
        }
        if (
          value.morning_dosage === null ||
          value.morning_dosage === undefined
        ) {
          errors.morning_dosage = "Required";
        }
        if (
          value.evening_dosage === null ||
          value.evening_dosage === undefined
        ) {
          errors.evening_dosage = "Required";
        }
        if (value.night_dosage === null || value.night_dosage === undefined) {
          errors.night_dosage = "Required";
        }
        if (!value.medicine_food_timing) {
          errors.medicine_food_timing = "Required";
        }

        if (Object.keys(errors).length) {
          errorsArray[index] = errors;
        }
      }
    });

    return arrayHasInvalid(errorsArray) ? errorsArray : undefined;
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await createPrescription(props.consultationId, values);
      setPrescription(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return { [FORM_ERROR]: error.message };
    }
  };

  const handleViewPrescription = () => {
    if (prescription) {
      setLoading(true);
      getPrescriptionPdfUrl(props.consultationId, prescription.id)
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
      <Form
        subscription={{
          submitting: true,
          pristine: true,
          errors: true,
          submitError: true,
        }}
        mutators={{
          ...arrayMutators,
        }}
        initialValues={prescription !== null ? { ...prescription } : undefined}
        onSubmit={onSubmit}
        validate={validate}
        render={({
          handleSubmit,
          submitting,
          errors,
          submitError,
          form: {
            mutators: { push, pop },
          },
          form,
        }) => (
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                label="Provisional Diagnosis"
                required={true}
                fullWidth={true}
                multiline
                name="provisional_diagnosis"
                InputProps={{
                  readOnly: prescription !== null,
                }}
              />
              <TextField
                label="General Advice"
                required={true}
                multiline
                fullWidth={true}
                name="general_advice"
                InputProps={{
                  readOnly: prescription !== null,
                }}
              />
              {prescription === null && (
                <Box mt={1} alignItems="center">
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => push("medicines", undefined)}
                  >
                    Add Medicines
                  </Button>
                </Box>
              )}
              <FieldArray name="medicines" validate={medicineValidate}>
                {({ fields }) =>
                  fields.map((name, index) => (
                    <Box
                      mt={1}
                      mb={1}
                      key={name}
                      borderRadius={2}
                      boxShadow={2}
                      p={1}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Field
                        label="Medicine Name"
                        name={`${name}.name`}
                        required={true}
                        component={TextInput}
                        InputProps={{
                          readOnly: prescription !== null,
                        }}
                      />

                      <Box display="flex" justifyContent="space-evenly">
                        <Box m={1}>
                          <Field
                            label="Morning"
                            placeholder="Morning"
                            name={`${name}.morning_dosage`}
                            required={true}
                            type="number"
                            inputProps={{ min: 0 }}
                            component={TextInput}
                            InputProps={{
                              readOnly: prescription !== null,
                            }}
                          />
                        </Box>
                        <Box m={1}>
                          <Field
                            label="Evening"
                            name={`${name}.evening_dosage`}
                            required={true}
                            type="number"
                            inputProps={{ min: 0 }}
                            component={TextInput}
                            InputProps={{
                              readOnly: prescription !== null,
                            }}
                          />
                        </Box>
                        <Box m={1}>
                          <Field
                            label="Night"
                            name={`${name}.night_dosage`}
                            required={true}
                            type="number"
                            inputProps={{ min: 0 }}
                            component={TextInput}
                            InputProps={{
                              readOnly: prescription !== null,
                            }}
                          />
                        </Box>
                      </Box>
                      <Field
                        type="radio"
                        name={`${name}.medicine_food_timing`}
                        component={WhenRadioInput}
                        required={true}
                        readOnly={prescription !== null ? true : false}
                      />
                      <Field
                        label="Other Comment"
                        name={`${name}.comment`}
                        component={TextInput}
                        multiline
                        InputProps={{
                          readOnly: prescription !== null,
                        }}
                      />
                      {prescription === null && (
                        <Box mt={1}>
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            onClick={() => fields.remove(index)}
                          >
                            Remove
                          </Button>
                        </Box>
                      )}
                    </Box>
                  ))
                }
              </FieldArray>
              {submitError && (
                <Box mt={1} mb={1}>
                  <Alert severity="error">{submitError}</Alert>
                </Box>
              )}
              {prescription === null && (
                <Box mt={2}>
                  <Button
                    disabled={submitting || Object.keys(errors).length !== 0}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Save
                  </Button>
                </Box>
              )}
            </Box>
          </form>
        )}
      />
    </>
  );
}

Prescription.propTypes = {
  consultationId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  userProgramId: PropTypes.string,
};

Prescription.defaultProps = {
  userProgramId: null,
};
