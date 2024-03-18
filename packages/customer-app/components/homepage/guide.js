import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import * as constant from "@/constants/index";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { string, object } from "prop-types";

const propTypes = {
  item: object,
  link: string,
};

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "1.4rem",
    color: "#4f4f4f",
    fontWeight: 700,
  },
  item: {
    height: "180px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "500",
    padding: theme.spacing(1),
  },
  titleWrap: {
    background:
      "linear-gradient(90deg, rgb(255, 255, 255, 1) 0%, rgb(255, 255, 255, 0) 100%)",
  },
  subtitle: {
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  topic: {
    fontSize: "0.80rem",
    marginRight: theme.spacing(1),
  },
}));

function Item(props) {
  const classes = useStyles();
  const item = props.item;
  return (
    <Link href={props.link} passHref={true}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        style={{ backgroundImage: `url('${item.image}')` }}
        className={`${classes.item} myava-pcos-guide`}
      >
        <Box className={classes.titleWrap}>
          <Typography className={classes.title}>{item.title}</Typography>
        </Box>
      </Box>
    </Link>
  );
}
Item.propTypes = propTypes;

const Guide = () => {
  const classes = useStyles();
  const subtitle = "All your PCOS questions answered";
  const topics = ["Irregular Periods", "Weight gain", "Acne", "Facial hair"];
  const link = `${constant.PCOS_GUIDE}`;
  const items = [
    {
      title: "What is PCOS?",
      image: `${constant.STATIC_IMAGE}/guide/001.png`,
    },
    {
      title: "Test for PCOS?",
      image: `${constant.STATIC_IMAGE}/guide/002.png`,
    },
    {
      title: "Is PCOS Reversible?",
      image: `${constant.STATIC_IMAGE}/guide/003.png`,
    },
  ];
  return (
    <Box m={2}>
      <Box mb={2}>
        <Typography className={`${classes.heading} pcos-guide-heading`}>
          PCOS Guide
        </Typography>
      </Box>
      <Box>
        <Paper>
          <Box>
            <Carousel
              animation="fade"
              className={classes.carousel}
              activeIndicatorProps={{ style: { color: "#dd66a6" } }}
              interval={1000000}
              timeout={50}
              navButtonsAlwaysInvisible={true}
            >
              {items.map((item, i) => (
                <Item key={i} item={item} link={link} />
              ))}
            </Carousel>
          </Box>
          <Box p={2}>
            <Typography className="myava-carousel-subtitle">
              {subtitle}
            </Typography>
          </Box>
          <Box
            display="flex"
            ml={1}
            mr={1}
            justifyContent="space-evenly"
            style={{ width: "100%" }}
          >
            {topics.map((topic, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="flex-start"
                paddingBottom={2}
              >
                <Typography className={classes.topic}>{topic}</Typography>
                {i !== topics.length - 1 && <Divider orientation="vertical" />}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Guide;
