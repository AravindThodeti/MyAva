import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { useRecordContext } from "react-admin";
import { array, func } from "prop-types";
import { useGetList } from "react-admin";
const formArrayOfValues = (goodForData) => {
  const result = [];
  goodForData.forEach((disease) => {
    result.push(disease.id);
  });
  return result;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    width: 250,
    backgroundColor: "#f7f7f7",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
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

// const names = [
//   {
//     id: 1,
//     name: "Acne",
//     image_url:
//       "https://storage.googleapis.com/ava-testing/disease-images/1/1649082706592-acne.jpg",
//   },
//   {
//     id: 4,
//     name: "Diabetes",
//     image_url:
//       "https://storage.googleapis.com/ava-testing/disease/1649688990146-Diabetes.png",
//   },
//   {
//     id: 2,
//     name: "Infertility",
//     image_url:
//       "https://storage.googleapis.com/ava-testing/disease/1649688656463-infertility.png",
//   },
//   {
//     id: 5,
//     name: "PCOS",
//     image_url:
//       "https://storage.googleapis.com/ava-testing/disease/1649688825196-uterus.png",
//   },
//   {
//     id: 3,
//     name: "Thyroid",
//     image_url:
//       "https://storage.googleapis.com/ava-testing/disease/1649689029756-Thyroid.png",
//   },
// ];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const toArray = (obj) => {
  return Object.keys(obj).map(function(key) {
    return obj[key];
  });
};

const GoodForField = ({ goodForIds, setGoodForIds }) => {
  const [names, setNames] = useState("");
  const { data } = useGetList("disease");
  useEffect(() => {
    console.log({ data });
    if (data) {
      setNames(toArray(data));
    }
  }, [data]);
  const classes = useStyles();
  const theme = useTheme();

  const record = useRecordContext();
  const handleChange = (event) => {
    setGoodForIds(event.target.value);
  };
  React.useEffect(() => {
    record.good_for && setGoodForIds(formArrayOfValues(record.good_for));
  }, [record, setGoodForIds]);

  if (!record) return null;

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Good for</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={goodForIds}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={
                    names.length > 0 &&
                    names.find((element) => element.id === value).name
                  }
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.length > 0 &&
            names.map((disease) => (
              <MenuItem
                key={disease.name}
                value={disease.id}
                style={getStyles(disease.name, goodForIds, theme)}
              >
                {disease.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

GoodForField.propTypes = {
  goodForIds: array,
  setGoodForIds: func,
};
export default GoodForField;
