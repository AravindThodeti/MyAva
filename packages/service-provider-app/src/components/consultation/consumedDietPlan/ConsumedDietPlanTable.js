import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { theme } from "theme/theme";

const StyledTableCell = withStyles((theme) => ({
  root: {
    fontFamily: "Poppins",
    fontWeight: "800",
    fontSize: "16px",
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
      fontWeight: "800",
      fontSize: "14px",
      whiteSpace: "wrap",
      minWidth: "230px",
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
  },
  stickyHead: {
    zIndex: "900",
  },
});

const columns = ["Recipe", "Quantity"];

export default function ConsumedDietPlanTable({ dietPlanResult }) {
  console.log("result", dietPlanResult);
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="sticky table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.stickyHead}>
              Date
            </StyledTableCell>
            {sessionList.map((sessionName) => (
              <StyledTableCell>{sessionName}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dietPlanResult?.map((dietPlan, index) => (
            <StyledTableRow key={dietPlan}>
              <StyledTableCell className={classes.sticky}>
                {dietPlan?.diet_plan_date?.split("T", 1)}
              </StyledTableCell>
              {sessionList.map((sessionName, index) => (
                <StyledTableCell
                  component="th"
                  scope="row"
                  className={classes.miniColoumn}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        {dietPlan.session_list[index]?.user_recipe_details !=
                          null &&
                          columns.map((column) => (
                            <TableCell
                              // key={column.id}
                              // align={column.align}
                              style={{ minWidth: "100px" }}
                            >
                              {column}
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.body}>
                      {dietPlan.session_list[index]?.user_recipe_details !=
                        null &&
                        dietPlan.session_list[index]?.user_recipe_details.map(
                          (recipe) => (
                            <TableRow
                              key={recipe.name}
                              className={
                                recipe?.is_prescribed ? classes.asPerDiet : ""
                              }
                            >
                              <TableCell
                                className={
                                  recipe?.is_prescribed && recipe.is_consumed
                                    ? classes.asPerDiet
                                    : recipe.is_prescribed &&
                                      !recipe.is_consumed
                                    ? classes.notTracked
                                    : classes.notAsPerDiet
                                }
                              >
                                {recipe ? recipe.name : "--"}
                              </TableCell>
                              <TableCell
                                className={
                                  recipe?.is_prescribed && recipe.is_consumed
                                    ? classes.asPerDiet
                                    : recipe.is_prescribed &&
                                      !recipe.is_consumed
                                    ? classes.notTracked
                                    : classes.notAsPerDiet
                                }
                              >
                                {recipe
                                  ? recipe.quantity +
                                    " " +
                                    recipe.measurement_unit
                                  : "--"}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      {dietPlan.session_list[index]?.user_recipe_details ==
                        null && (
                        <TableRow>
                          <TableCell className={classes.noDataFound}>
                            No recipe tracked
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </StyledTableCell>
              ))}
              {/* <StyledTableCell align="right">{1}</StyledTableCell>
              <StyledTableCell align="right">{2}</StyledTableCell>
              <StyledTableCell align="right">{3}</StyledTableCell>
              <StyledTableCell align="right">{4}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
