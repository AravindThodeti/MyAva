import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import NavigationDrawer from "./v1/Navigation/index";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { CURRENT_PROFILE } from "../constants";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getCustomerProfile } from "../store/actions/api.action";
import { fetchProfileSuccess } from "../store/actions/profile.action";
import { openDrawer, closeDrawer } from "../store/actions/drawer.action";
import { LS_ACCESS_TOKEN } from "@ava/common";
import * as constant from "../constants";
import Link from "next/link";
import { useRouter } from "next/router";
import headerOptions from "@/utils/HeaderUtils";
import AvaImage from "./v1/Image";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 56,
  },
  title: {
    flexGrow: 1,
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
  },
  appBar: {
    background:
      "linear-gradient(90deg, #EA8A98 4.73%, #DF6D82 22.06%, #D75771 34.58%, #CF4161 46.7%, #CD3C5D 58.98%, #CD3C5D 70.87%, #CD3C5D 82.76%, #CD3C5D 100%)",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(0),
    color: "#ffffff",
  },
  logoWrap: {
    width: 72,
  },
  logo: {
    maxHeight: "100%",
    maxWidth: "100%",
    display: "block",
  },
  loginButton: {
    marginLeft: "auto",
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "0.9rem",
    textTransform: "capitalize",
    borderRadius: "20px",
    padding: "1px 25px",
    border: "2px solid #ffffff",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    alignContent: "space-between",
    backgroundColor: "#f9eef2",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  pageTitle: {
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: "1.5rem",
  },
}));

export default function AppHeaderBar() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.profileReducer.profile);
  const open = useSelector((state) => state.drawerReducer.open);
  const router = useRouter();
  const { title, backButton, showLogo } = headerOptions(router);

  const handleDrawerOpen = () => {
    dispatch(openDrawer());
  };

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  const handleBack = () => {
    Router.back();
  };

  React.useEffect(() => {}, [router]);

  React.useEffect(() => {
    const token = localStorage.getItem(LS_ACCESS_TOKEN);
    if (token) {
      const storedUser = localStorage.getItem(CURRENT_PROFILE);
      if (!storedUser) {
        dispatch(getCustomerProfile());
      } else {
        dispatch(fetchProfileSuccess(JSON.parse(storedUser)));
      }
    }
  }, []);

  React.useEffect(() => {}, [title, currentUser]);
  let header = (
    <div className={classes.drawerHeader}>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
  );

  let loginButton = (
    <Link href={constant.URL_LOGIN} passHref={true}>
      <Button
        variant="text"
        color="primary"
        className={classes.loginButton}
        component={"a"}
        href={constant.URL_LOGIN}
        size="small"
        onClick={handleDrawerClose}
      >
        Login
      </Button>
    </Link>
  );

  if (currentUser) {
    const firstName = currentUser.name.split(" ")[0];
    header = (
      <div className={classes.drawerHeader}>
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Avatar
            alt={firstName.split("")[0]}
            src="/static/images/avatar/1.jpg"
          />
          <div style={{ paddingLeft: "10px" }}>
            <b>{`Hello ${firstName}!`}</b>
          </div>
        </div>
        <div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
      </div>
    );
    loginButton = <></>;
  }

  const drawer = (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {backButton && (
            <IconButton aria-label="back" onClick={handleBack} edge="start">
              <BackIcon />
            </IconButton>
          )}
          {!backButton && (
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box className={classes.title}>
            {showLogo && (
              <Box className={`${classes.logoWrap}`}>
                <img
                  className={classes.logo}
                  src={`/assets/images/myAvaLogoV2.svg`}
                />
              </Box>
            )}
            {!showLogo && (
              <Typography variant="h6" className={classes.pageTitle}>
                {title ? title : constant.APP_TITLE}
              </Typography>
            )}
          </Box>
          {router.pathname !== "/user/login" && loginButton}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
        onEscapeKeyDown={handleDrawerClose}
        onBackdropClick={handleDrawerClose}
        open={open || false}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          style={{
            height: "56px",
            padding: "15px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f9eef2",
          }}
        >
          <AvaImage
            size="content"
            name="avaLogo"
            onClick={() => {
              router.push(constant.URL_HOME);
              handleDrawerClose();
            }}
            src="/assets/images/myAvaLogoV2.svg"
          />
        </div>
        <Divider />
        {currentUser && (
          <div>
            {header}
            <Divider />
          </div>
        )}
        <NavigationDrawer />
      </SwipeableDrawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/* <div className={classes.drawerHeader} /> */}
      </main>
    </div>
  );

  return drawer;
}
