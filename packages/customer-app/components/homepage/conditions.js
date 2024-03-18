import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import * as constant from "@/constants/index";
import Link from "next/link";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  gridTile: {
    borderRadius: theme.spacing(2),
  },
  title: {
    color: "#89043F",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  titleBar: {
    background: "none",
  },
}));

const conditions = [
  {
    img: `${constant.STATIC_IMAGE}/conditions/pcos.png`,
    href: `${constant.URL_CONDITIONS_PCOS}`,
    title: "PCOS",
  },
  {
    img: `${constant.STATIC_IMAGE}/conditions/hair_loss.png`,
    href: "#",
    title: "Hair Loss",
  },
  {
    img: `${constant.STATIC_IMAGE}/conditions/acne.png`,
    href: "#",
    title: "Acne",
  },
];

export default function Condtions() {
  const classes = useStyles();

  const clickHandler = (link) => {
    Router.push(link);
  };

  return (
    <Box mt={1} ml={1} mr={1}>
      <GridList className={classes.gridList} cols={2.1} spacing={10}>
        {conditions.map((condition, index) => (
          <GridListTile classes={{ tile: classes.gridTile }} key={index}>
            <img
              src={condition.img}
              className={classes.img}
              onClick={() => clickHandler(condition.href)}
            />
            <GridListTileBar
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionPosition="left"
              actionIcon={
                <Link href={condition.href} passHref={true}>
                  <Button className={classes.title} variant="text">
                    {condition.title}
                  </Button>
                </Link>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  );
}
