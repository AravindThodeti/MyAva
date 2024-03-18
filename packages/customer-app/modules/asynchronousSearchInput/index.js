import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getRecipesByName } from "../../utils/ApiUtils";
import { func } from "prop-types";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

const propTypes = {
  /** function to set selected recipe */
  setSelectedRecipe: func,
};

const AsynchronousSearchInput = ({
  setSelectedRecipe,
  setNotFoundContent,
  setSearchTitle,
  setAddmeal,
  addmeal,
  selectedRecipe,
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const firstUpdateForWeight = React.useRef(true);

  const onChangeHandler = async (event, newValue) => {
    setSearchQuery(newValue);
  };
  let timer;
  function debounce(func, timeout = 300) {
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  // const data = [...options];
  const changeHandlerTwo = (event, newVal) =>
    debounce(() => onChangeHandler(event, newVal))();
  React.useEffect(() => {
    if (Object.keys(addmeal).length > 0) {
      selectedRecipe = addmeal;
    } else {
      selectedRecipe = options.find((recipe) => recipe.name === searchQuery);
    }

    setSelectedRecipe(selectedRecipe);
  }, [options, searchQuery, setSelectedRecipe]);

  React.useEffect(() => {
    if (firstUpdateForWeight.current) {
      firstUpdateForWeight.current = false;
      return;
    }
    setOptions([]);
    (async () => {
      setLoading(true);
      const response = await getRecipesByName(searchQuery);

      if (response.data.length === 0) {
        setSearchTitle(searchQuery);
        setNotFoundContent(true);
      } else {
        setNotFoundContent(false);
      }
      setLoading(false);
      setOptions(response.data);
    })();
  }, [searchQuery]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  const filter = createFilterOptions();
  return (
    <Autocomplete
      freeSolo
      id="asynchronous-demo"
      style={{
        width: "100%",
        padding: "0 10px",
        backgroundColor: "white",
        borderRadius: "20px",
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue: inputValue,
            name: `Didn't find your dish "${inputValue}"`,
            img: "/assets/images/programs/arrowicon.svg",
          });
        }
        return filtered;
      }}
      renderOption={(option) => {
        const { name, img } = option;
        return (
          <span
            style={{
              fontFamily: "Poppins",
              width: "100%",
              padding: name?.includes("Didn't find your dish ")
                ? "6px 0 5px 25px"
                : "0 0 0 10px",
              color: name?.includes("Didn't find your dish ") ? "#CD3C5D" : "",
              position: name?.includes("Didn't find your dish ") ? "fixed" : "",
              left: name?.includes("Didn't find your dish ") ? "0px" : "",
              bottom: name?.includes("Didn't find your dish ") ? "1px" : "",
              backgroundColor: name?.includes("Didn't find your dish ")
                ? "#e9e9e9"
                : "",
              fontSize: name?.includes("Didn't find your dish ")
                ? "14px"
                : "15px",
              borderBottomRightRadius: "8px",
              borderBottomLeftRadius: "8px",
            }}
          >
            {name}
            {img ? (
              <img
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "8px",
                }}
                src={img}
                alt="arrowicon"
              />
            ) : (
              ""
            )}
          </span>
        );
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      onInputChange={changeHandlerTwo}
      selectOnFocus={false}
      renderInput={(params) => (
        <TextField
          placeholder="Search dish"
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

AsynchronousSearchInput.propTypes = propTypes;
export default AsynchronousSearchInput;
