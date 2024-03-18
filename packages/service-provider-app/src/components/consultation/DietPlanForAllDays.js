import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { theme } from "theme/theme";
import styles from "./consumedDietPlan/DietPlanV2.module.scss";
import { invalid } from "moment";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import editIcon from "../../../public/assets/images/icons/Group 2001.svg";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getRecipesByName } from "utils/ApiUtils";
import { tableDietPlanEdit } from "utils/ApiUtils";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const StyledTableCell = withStyles((theme) => ({
  root: {
    fontFamily: "Poppins",
    fontWeight: "800",
    fontSize: "16px",
    borderBottom: "none",
  },
  head: {
    backgroundColor: "#BF3957",
    textAlign: "center",
    color: theme.palette.common.white,
    textTransform: "capitalize",
  },
  body: {
    border: "1px solid #0000006e",
    textAlign: "center",
    borderBottom: "none",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    textAlign: "center",
  },
}))(TableRow);

const sessionList = [
  "Early morning",
  "Breakfast",
  "Mid morning",
  "Lunch",
  "Evening",
  "Dinner",
  "Late dinner",
  "Post dinner",
];

const useStyles = makeStyles({
  body: {
    whiteSpace: "wrap",
    minWidth: "250px",
  },
  table: {
    "& td,th": {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: "500",
      fontSize: "18px",
      whiteSpace: "wrap",
      minWidth: "280px",
    },
  },

  notAsPerDiet: {
    borderBottom: "none",
    color: "red",
    backgroundColor: "white",
    textTransform: "uppercase",
  },
  asPerDiet: {
    borderBottom: "none",
    color: "#058457",
    textTransform: "uppercase",
  },
  notTracked: {
    borderBottom: "none",
    color: "#525252",
    textTransform: "uppercase",
  },
  noDataFound: {
    borderBottom: "none",
    textTransform: "uppercase",
    verticalAlign: "middle",
  },
  miniColoumn: {
    color: "#525252",
    verticalAlign: "top",
  },
  container: {
    maxHeight: 800,
    width: "95%",
    margin: "20px auto",
  },
  sticky: {
    position: "sticky",
    left: 0,
    background: "white",
    boxShadow: "5px 2px 5px grey",
    borderRight: "2px solid black",
    fontSize: "20px",
    fontWeight: "500",
  },
  stickyHead: {
    zIndex: "900",
  },
});

const columns = ["Recipe", "Quantity"];

export default function ConsumedDietPlanTable(props) {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const firstUpdateForWeight = React.useRef(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [{ data }, setData] = useState(props);
  const [recipesTobeEdited, setRecipesTobeEdited] = React.useState({});
  const [dialogRecipe, setDialogRecipe] = useState("");
  const [dialogQuantity, setDialogQuantity] = useState("");
  const [snackBaropen, setSnackBarOpen] = React.useState(false);
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  React.useEffect(() => {
    if (firstUpdateForWeight.current) {
      firstUpdateForWeight.current = false;
      return;
    }
    setOptions([]);
    (async () => {
      setLoading(true);
      const response = await getRecipesByName(searchQuery);
      setLoading(false);
      setOptions(response.data);
    })();
  }, [searchQuery]);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const onChangeHandler = async (event, newValue) => {
    // console.log("event",event.target,newValue)
    setSearchQuery(newValue);
  };
  const changeHandlerTwo = (event, newVal) =>
    debounce(() => onChangeHandler(event, newVal))();

  let timer;
  function debounce(func, timeout = 300) {
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handlePopupAdd = () => {
    let valueArray = recipesTobeEdited.recipe_details;
    let emptyObject = valueArray.every((item) => item.id != 0);
    if (emptyObject) {
      const obj = {
        id: 0,
        name: "",
        quantity: "",
        measurement_unit: "",
        active: true,
        selectedDates: [],
        daysList: ["1", "2", "3", "4", "5", "6", "7"],
      };
      recipesTobeEdited.recipe_details.push(obj);
      setRecipesTobeEdited({ ...recipesTobeEdited });
    }
  };

  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.stickyHead}>
                Day
              </StyledTableCell>
              {sessionList.map((sessionName) => (
                <StyledTableCell>{sessionName}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              Object.entries(data?.day_map).map(([key, value], rowIndex) => (
                <StyledTableRow key={key}>
                  <StyledTableCell className={classes.sticky}>
                    {"Day " + key}
                  </StyledTableCell>
                  {Object.entries(value).map(
                    ([sessionKey, sesionValue], columnIndex) => (
                      // console.log("session","day"+rowIndex,sessionKey,sesionValue)
                      //coloumn mapping
                      <StyledTableCell>
                        <Table>
                          <TableHead>
                            <TableRow className={styles.dietMenuHeadings}>
                              {sesionValue?.recipe_details?.map(
                                (details, index) => (
                                  <>
                                    {index == 0 && (
                                      <>
                                        <TableCell
                                          className={styles.dietMenuHeading}
                                        >
                                          {details.id != 0 ? (
                                            <p>Recipe</p>
                                          ) : null}
                                        </TableCell>
                                        <TableCell
                                          className={styles.dietMenuHeading}
                                        >
                                          {details.id != 0 ? (
                                            <p>Quantity</p>
                                          ) : null}
                                        </TableCell>
                                      </>
                                    )}
                                  </>
                                )
                              )}
                            </TableRow>
                          </TableHead>
                          {sesionValue?.recipe_details?.map(
                            (recipeDetails, i) => (
                              <TableBody>
                                {Object.keys(recipeDetails["name"]).length >
                                1 ? (
                                  <TableRow className={styles.dietMenuValues}>
                                    <TableCell className={styles.dietMenuValue}>
                                      <p>{recipeDetails?.name}</p>
                                    </TableCell>
                                    <TableCell className={styles.dietMenuValue}>
                                      <div>
                                        <p>{recipeDetails?.quantity}</p>
                                      </div>
                                      <div className={styles.tableIcons}>
                                        {/* {sesionValue.recipe_details.length >
                                        1 ? (
                                          <button
                                            className={styles.tableBtns}
                                            onClick={(e) => {
                                              sesionValue.recipe_details = sesionValue.recipe_details.filter(
                                                function(obj) {
                                                  return (
                                                    obj.id != recipeDetails.id
                                                  );
                                                }
                                              );
                                              setData({ ...{ data } });
                                          
                                            }}
                                          >
                                            <img
                                              src="/assets/images/icons/deleteIcon.svg"
                                              alt="deleteIcon"
                                              width="12"
                                              height="16"
                                            />
                                          </button>
                                        ) : null} */}
                                        {recipeDetails.active ? (
                                          <button
                                            className={styles.tableEditBtn}
                                          >
                                            <img
                                              src="/assets/images/icons/editIcon.svg"
                                              alt="editIcon"
                                              width="12"
                                              height="16"
                                              onClick={() => {
                                                setRecipesTobeEdited(
                                                  sesionValue
                                                );
                                                setDialogOpen(!dialogOpen);
                                              }}
                                            />
                                          </button>
                                        ) : null}
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  <p></p>
                                )}
                              </TableBody>
                            )
                          )}
                        </Table>
                      </StyledTableCell>
                    )
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
        className={styles.editDialog}
        maxWidth="lg"
      >
        <div className={styles.edit}>
          <DialogContent style={{ display: "flex", gap: "10px" }}>
            <Table>
              <TableHead>
                <TableCell>Recipes</TableCell>
                <TableCell>Quantity</TableCell>
              </TableHead>
              <TableBody>
                {Object.entries(recipesTobeEdited)?.map(([key, val]) =>
                  key == "recipe_details"
                    ? val.map((e) => (
                        <TableRow>
                          <TableCell>
                            <Autocomplete
                              style={{ width: "300px" }}
                              value={e.name}
                              options={options}
                              getOptionSelected={(option, value) =>
                                option.name === value
                              }
                              getOptionLabel={(option) => {
                                return option.name
                                  ? option.name +
                                      " - " +
                                      option.measurement_unit
                                  : e.name;
                              }}
                              onChange={
                                (_event, value) => {
                                  if (value) {
                                    e.name = value?.name;
                                    e.id = value?.id;
                                    e.measurement_unit =
                                      value?.measurement_unit;
                                    if (e.quantity == "") {
                                      e.quantity = 1;
                                    }
                                    if (e.selectedDates.length == 0) {
                                      e.selectedDates.push(
                                        props.dayNumber.toString()
                                      );
                                    }
                                  }
                                }

                                // -----------------
                                // setDaySessionList([...daySessionList])
                                // console.log("recipe", singleRecipeDetails);
                              }
                              onOpen={() => {
                                setSearchQuery(" ");
                                e.openField = true;
                              }}
                              onClose={() => {
                                e.openField = false;
                                setSearchQuery(" ");
                              }}
                              onInputChange={changeHandlerTwo}
                              selectOnFocus={false}
                              renderInput={(params) => (
                                <TextField
                                  label="Choose Recipe"
                                  {...params}
                                  InputProps={
                                    e.openField && {
                                      ...params.InputProps,
                                      endAdornment: (
                                        <React.Fragment>
                                          {loading ? (
                                            <CircularProgress
                                              color="inherit"
                                              size={20}
                                            />
                                          ) : null}
                                          {params.InputProps.endAdornment}
                                        </React.Fragment>
                                      ),
                                    }
                                  }
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={e.quantity}
                              margin="dense"
                              type="number"
                              onChange={(event) => {
                                e.quantity =
                                  event.target.value <= 0
                                    ? 1
                                    : event.target.value;

                                setRecipesTobeEdited({ ...recipesTobeEdited });
                              }}
                            />
                          </TableCell>
                          {val != null && val.length > 1 ? (
                            <TableCell>
                              <img
                                src="/assets/images/icons/deleteIcon.svg"
                                alt="deleteIcon"
                                onClick={() => {
                                  recipesTobeEdited.recipe_details = recipesTobeEdited.recipe_details.filter(
                                    function(obj) {
                                      return obj.id != e.id;
                                    }
                                  );

                                  setRecipesTobeEdited({
                                    ...recipesTobeEdited,
                                  });
                                }}
                              />
                            </TableCell>
                          ) : (
                            ""
                          )}
                          <TableCell>
                            <img
                              src="/assets/images/icons/addIcon.svg"
                              alt="addIcon"
                              onClick={handlePopupAdd}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    : null
                )}
              </TableBody>
            </Table>
            <div>
              <img
                src="/assets/images/icons/closeIcon.svg"
                alt="closeIcon"
                width="25"
                height="25"
                onClick={handleDialogClose}
              />
            </div>
          </DialogContent>
        </div>
        <DialogActions className={styles.popupBtnActions}>
          <Button
            onClick={() =>
              recipesTobeEdited.recipe_details.length != 0
                ? ((recipesTobeEdited.recipe_details = recipesTobeEdited.recipe_details.filter(
                    (item) => item.id != 0
                  )),
                  setRecipesTobeEdited(recipesTobeEdited),
                  tableDietPlanEdit(data.consultation_id, recipesTobeEdited)
                    .then((res) => {
                      // console.log("sucess", res);
                      handleDialogClose();
                      setSnackBarOpen(true);
                    })
                    .catch((err) => console.log("my err", err)))
                : null
            }
            className={styles.editSubmit}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackBaropen}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity="success">
          Publish successful!
        </Alert>
      </Snackbar>
    </>
  );
}

{
  /* <StyledTableCell align="right">{1}</StyledTableCell>
              <StyledTableCell align="right">{2}</StyledTableCell>
              <StyledTableCell align="right">{3}</StyledTableCell>
              <StyledTableCell align="right">{4}</StyledTableCell> */
}
