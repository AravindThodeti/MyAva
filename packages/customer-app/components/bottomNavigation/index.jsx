import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {
  HomeIcon,
  ProgramsIcon,
  CommunityIcon,
  ProfileIcon,
  MyavaPlayIcon,
} from "../svgIcons";
import { useRouter } from "next/router";
import { URL_COMMUNITY, MYAVA_STUDIO_URL } from "../../constants";

const BottomNavigationBar = () => {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      position: "fixed",
      bottom: 0,
      backgroundColor: "#FFFFFF",
      zIndex: 100,
      display: "flex",
      justifyContent: "space-around",
    },
  });
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = React.useState("");

  useEffect(() => {
    setValue(window.location.pathname);
  }, [typeof window !== "undefined" && window.location.pathname]);

  const handleChange = (event, newValue) => {
    router.push(newValue).then(() => window.scrollTo(0, 0));
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ paddingTop: "10px" }}
        label="Home"
        value="/"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        style={{ paddingTop: "10px" }}
        label="Programs"
        value="/user/programs"
        icon={<ProgramsIcon />}
      />
      <BottomNavigationAction
        style={{ paddingTop: "10px" }}
        label="Community"
        value={URL_COMMUNITY}
        icon={<CommunityIcon />}
      />
      <BottomNavigationAction
        style={{ paddingTop: "10px" }}
        label="Studio"
        value="/studio/all"
        icon={<MyavaPlayIcon />}
      />
      <BottomNavigationAction
        style={{ paddingTop: "10px" }}
        label="Profile"
        value="/user/profile"
        icon={<ProfileIcon />}
      />
    </BottomNavigation>
  );
};
export default BottomNavigationBar;
