import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button, Typography, Box } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import * as constant from "@/constants/index";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  paper: {
    background:
      "linear-gradient(97deg, rgba(245,7,115, 0.95) 0%, rgba(255,80,80,0.85) 100%)",
    borderRadius: theme.spacing(1),
    color: "#ffffff",
    minHeight: "15vh",
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  headingContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  heading: {
    fontWeight: "700",
    fontSize: "1.1rem",
  },
  features: {
    fontWeight: "400",
    fontSize: "0.9rem",
  },
  headerBackground: {
    backgroundImage: `url(${constant.STATIC_IMAGE}/conditions/pcos/pcos.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left",
    backgroundSize: "cover",
    transform: "scale(1.2)",
  },
  button: {
    fontWeight: "400",
    fontSize: "0.80rem",
    color: "#ffffff",
    paddingLeft: 0,
    textTransform: "capitalize",
  },
  programTile: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: theme.spacing(1),
    height: "150px",
    width: "100%",
    padding: theme.spacing(1),
  },
  programTileText: {
    fontWeight: "400",
    fontSize: "0.85rem",
    color: "#89043F",
  },
  gridButton: {
    maxHeight: "24px",
    textTransform: "capitalize",
    fontSize: "0.85rem",
    fontWeight: "600",
    background:
      "linear-gradient(180deg, #ED2198 0%, #8C0442 82%, #89043F 100%)",
  },
}));

const programs = [
  {
    id: 2,
    name: "PCOS Program",
    image: `${constant.STATIC_IMAGE}/conditions/pcos.png`,
  },
  {
    id: 3,
    name: "Hair Care Program",
    image: `${constant.STATIC_IMAGE}/conditions/hair_loss.png`,
  },
  {
    id: 4,
    name: "Menopause Program",
    image: `${constant.STATIC_IMAGE}/conditions/menopause.png`,
  },
  {
    id: 5,
    name: "Skin Care Program",
    image: `${constant.STATIC_IMAGE}/conditions/acne.png`,
  },
];

export default function ProgramList() {
  const classes = useStyles();
  return (
    <>
      <Link
        href={constant.URL_PLANS_FORMAT}
        as={constant.URL_PLANS(1)}
        passHref={true}
      >
        <Box ml={1} mr={1}>
          <Paper elevation={0} className={classes.paper}>
            <Grid container>
              <Grid
                container
                direction="column"
                justify="space-between"
                item
                xs={6}
                spacing={2}
                className={classes.headingContainer}
              >
                <Grid item>
                  <Typography className={classes.heading}>
                    PCOS Lifestyle Program
                  </Typography>
                  <Typography className={classes.features}>
                    Win PCOS Naturally
                  </Typography>
                </Grid>
                <Grid item>
                  <Link
                    href={constant.URL_PLANS_FORMAT}
                    as={constant.URL_PLANS(1)}
                    passHref={true}
                  >
                    <Button
                      className={classes.button}
                      variant="text"
                      endIcon={<ArrowRightAltIcon />}
                    >
                      View Plans Now
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              <Grid item xs={6} className={classes.headerBackground}></Grid>
            </Grid>
          </Paper>
        </Box>
      </Link>
      <Box mt={3} mr={2} ml={2}>
        <Grid
          direction="row"
          container
          spacing={1}
          className={classes.itemGrid}
        >
          {programs.map((program, index) => (
            <Grid key={index} container item xs={6}>
              <Grid item container>
                <Box
                  className={classes.programTile}
                  style={{ backgroundImage: `url(${program.image})` }}
                >
                  <Grid
                    style={{ height: "100%" }}
                    container
                    item
                    direction="column"
                    justify="space-around"
                  >
                    <Grid item xs={4}>
                      <Typography className={classes.programTileText}>
                        {program.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Link
                        href={constant.URL_PLANS_FORMAT}
                        as={constant.URL_PLANS(program.id)}
                        passHref={true}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.gridButton}
                        >
                          Join Now
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
