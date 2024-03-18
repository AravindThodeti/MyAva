import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CentreCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import Grid from "@material-ui/core/Grid";
import { TRIBE_BASE_URL } from "@ava/common";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { object, array } from "prop-types";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "1.4rem",
    color: "#4f4f4f",
    fontWeight: 700,
  },
  seeAll: {
    color: "#ffffff",
    fontWeight: 400,
  },
  content: {
    backgroundColor: "#be5592",
  },
  listRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },
  largeImage: {
    height: theme.spacing(12),
    width: theme.spacing(12),
  },
  topicName: {
    color: "#ffffff",
    textTransform: "capitalize",
    fontWeight: 600,
    paddingTop: theme.spacing(1),
    fontSize: "0.9rem",
    textAlign: "center",
  },
}));

function TopicItem({ data }) {
  const classes = useStyles();
  const avatarProps = {};
  if (data.picture) {
    if (data.picture.charAt(0) == "/") {
      avatarProps["src"] = `${TRIBE_BASE_URL}${data.picture}`;
    } else {
      avatarProps["src"] = `${data.picture}`;
    }
  }
  return (
    <Link href={`${TRIBE_BASE_URL}/topic/${data.slug}`}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Avatar
            alt={data.name}
            className={classes.largeImage}
            {...avatarProps}
          />
        </Grid>
        <Grid item>
          <Typography variant="body2" className={classes.topicName}>
            {data.name}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
}
TopicItem.propTypes = {
  data: object,
};
const propTypes = {
  topics: array,
};
const TopicHeaderCarousel = ({ topics = [] }) => {
  const classes = useStyles();
  const theme = useTheme();
  let cols = 3.5;
  if (useMediaQuery(theme.breakpoints.up("md"))) {
    cols = 5.5;
  }

  if (!topics) {
    return <CentreCircularProgress />;
  }

  return (
    <>
      <Box className="myava-topic-for-you" mb={2} ml={2}>
        <Typography
          className={`${classes.heading} myava-topics-for-you-heading`}
        >
          Topics for you
        </Typography>
      </Box>
      <Box className={classes.content}>
        <Grid container justify="flex-end" alignItems="center">
          <Grid item>
            <Box mt={1} p={1}>
              <Link href={`${TRIBE_BASE_URL}/topics`} passHref={true}>
                <Typography
                  variant="h6"
                  className={`${classes.seeAll} myava-topics-see-all`}
                >
                  See All
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.listRoot} mt={2}>
          <GridList className={classes.gridList} cols={cols} spacing={2}>
            {topics.map((topic, key) => {
              return (
                <GridListTile key={key}>
                  <TopicItem data={topic} />
                </GridListTile>
              );
            })}
          </GridList>
        </Box>
      </Box>
    </>
  );
};
TopicHeaderCarousel.propTypes = propTypes;
export default TopicHeaderCarousel;
