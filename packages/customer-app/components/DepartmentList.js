import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CentreCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getConsultancyDepartments } from "../store/actions/api.action";
import Link from "next/link";
import * as constant from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function DepartmentList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const departments = useSelector(
    (state) => state.departmentReducer.consultancyDepartments
  );
  const error = useSelector((state) => state.departmentReducer.error);

  React.useEffect(() => {
    if (departments === undefined) {
      dispatch(getConsultancyDepartments());
    }
  }, [departments]);

  if (departments) {
    const departmentItems = departments.map((department, i) => (
      <Grid item xs={6} key={i}>
        <Paper className={classes.paper}>
          <Link
            href={constant.URL_CONSULTATION_CONSULTANTS_FORMAT}
            as={constant.URL_CONSULTATION_CONSULTANTS(
              department.name,
              department.id
            )}
            passHref={true}
          >
            <a> {department.name}</a>
          </Link>
        </Paper>
      </Grid>
    ));

    const list = (
      <Container>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {departmentItems}
          </Grid>
        </div>
      </Container>
    );
    return list;
  }

  if (error) {
    return (
      <Typography variant="h4" component="h4">
        {error.message} !!
      </Typography>
    );
  }

  return <CentreCircularProgress />;
}
