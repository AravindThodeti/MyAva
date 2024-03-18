import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import * as constant from "@/constants/index";
import GridList from "@material-ui/core/GridList";
import AvaImage from "../v1/Image";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "1.4rem",
    color: "#4f4f4f",
    fontWeight: 700,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  gridListTile: {
    height: "190px !important",
    minHeight: "190px",
    maxHeight: "190px",
    borderRadius: theme.spacing(3),
  },
  itemPaper: {
    height: "180px",
  },
  itemTopic: {
    fontSize: "0.75rem",
  },
  itemImage: {
    height: "100%",
    objectFit: "cover",
  },
  itemButton: {
    padding: 0,
  },
  imageWrap: {
    height: "100px",
  },
}));

export default function ConsultationV2() {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const matchesxs = useMediaQuery(theme.breakpoints.down("sm"));
  const matchessm = useMediaQuery(theme.breakpoints.up("sm"));
  // const matchesmd = useMediaQuery(theme.breakpoints.up('md'));
  // const matcheslg = useMediaQuery(theme.breakpoints.up('lg'));

  let size, name;
  if (matchesxs) {
    size = "consultBanner";
    name = "consult";
  }
  if (matchessm) {
    size = "consultBannerWeb";
    name = "consultWeb";
  }
  // if (matchesmd) {

  //   name = 'consultWeb';
  // }
  // if (matcheslg) {
  //   name = 'consultWeb';
  // }

  return (
    <Box m={2}>
      <Box mb={2}>
        <Typography className={classes.heading}>
          Consult Our PCOS Experts
        </Typography>
      </Box>
      <Box>
        <GridList className={classes.gridList} cols={2.1}>
          {[1, 2, 3, 4].map((item) => (
            <AvaImage
              onClick={() => {
                router.push(constant.URL_CONSULTATION);
              }}
              key={item}
              size={size}
              name={name + item}
            />
          ))}
        </GridList>
      </Box>
    </Box>
  );
}

{
  /* <GridListTile key={index} className={classes.gridListTile}>
              <Item item={item} />
            </GridListTile> */
}
