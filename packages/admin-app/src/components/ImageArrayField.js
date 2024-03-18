import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

const ImageArrayField = ({ record, source }) => {
  const classes = useStyles();
  const array = record[source];
  if (typeof array === "undefined" || array === null || array.length === 0) {
    return <div />;
  } else {
    return (
      <GridList cellHeight={160} className={classes.gridList} cols={1}>
        {array.map((image, index) => (
          <GridListTile key={index} cols={1}>
            <img src={image} alt={index} />
          </GridListTile>
        ))}
      </GridList>
    );
  }
};

export default ImageArrayField;
