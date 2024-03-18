import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PersonIcon from "@material-ui/icons/Person";
import ScheduleIcon from "@material-ui/icons/Schedule";
import LoginIcon from "@material-ui/icons/LockOpen";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  APP_NAME,
  URL_PROFILE,
  URL_SCHEDULE,
  URL_CONSULTATION_LIST,
  URL_USER_PROGRAMS_LIST,
  URL_LOGIN,
  URL_LOGOUT,
} from "../constants";
import { Snackbar } from "@material-ui/core";
import { hide as hideAlert } from "@ava/common/lib/store/actions/alert.action";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
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
    marginRight: theme.spacing(2),
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
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
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
  userAvatar: {
    marginLeft: theme.spacing(0.5),
  },
}));

function ListItemLink(props) {
  let history = useHistory();
  return (
    <ListItem
      button
      {...props}
      onClick={() => {
        history.push(props.href);
      }}
    />
  );
}

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alertReducer.alerts);
  const profile = useSelector((state) => state.profileReducer.profile);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSnackBarClose = (event, reason, id) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideAlert(id));
  };

  React.useEffect(() => {}, [alerts, profile]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {APP_NAME}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          {profile && (
            <>
              <Typography variant="h6">{profile.name}</Typography>
              <Avatar
                className={classes.userAvatar}
                alt={profile.name}
                src={profile.user.image_url}
              />
            </>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {profile && (
            <>
              <ListItemLink href={URL_PROFILE}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemLink>
              <ListItemLink href={URL_SCHEDULE}>
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText primary="Schedule" />
              </ListItemLink>
              {profile.activated_on && (
                <>
                  {/* <ListItemLink href={URL_CONSULTATION_LIST}>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Consultations" />
                  </ListItemLink> */}
                  <ListItemLink href={URL_USER_PROGRAMS_LIST}>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Consultations" />
                  </ListItemLink>
                </>
              )}
              <ListItemLink href={URL_LOGOUT}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemLink>
            </>
          )}
          {(profile === undefined || profile === null) && (
            <ListItemLink href={URL_LOGIN}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemLink>
          )}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {alerts && Object.keys(alerts).length > 0 && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            autoHideDuration={6000}
            message={alerts[Object.keys(alerts)[0]]}
            open={true}
            onClose={(event, reason) =>
              handleSnackBarClose(event, reason, Object.keys(alerts)[0])
            }
          />
        )}
      </main>
    </div>
  );
}
