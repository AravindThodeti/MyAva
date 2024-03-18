import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../store/actions/drawer.action";
import * as constant from "../constants";
import Link from "next/link";
import { string } from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
const propTypes = {
  link: string,
};
const NavigationDrawer = () => {
  const classes = useStyles();
  const [openConditions, setOpenConditions] = React.useState(false);
  const [openMyAccount, setOpenMyAccount] = React.useState(false);
  const currentUser = useSelector((state) => state.profileReducer.profile);
  const dispatch = useDispatch();

  const handleOpenConditionsClick = () => {
    setOpenConditions(!openConditions);
  };

  const handleOpenMyAccountClick = () => {
    setOpenMyAccount(!openMyAccount);
  };

  const closeNavigationDrawer = () => {
    dispatch(closeDrawer());
  };

  function ListItemLink(props) {
    return (
      <Link href={props.link} passHref={true}>
        <ListItem button component="a" {...props} />
      </Link>
    );
  }

  React.useEffect(() => {}, [currentUser]);
  // TODO Someday Dheeraj would like to understand why there is this object below when there is a similar object in navigation.metadata.js
  // Looks like this is used when logged out (in an inconsistent way)
  // FIX this by deduplicating
  let menuItems = [
    { text: "PCOS Consult", link: constant.URL_CONSULTATION },
    { text: "PCOS Programs", link: constant.URL_PROGRAMS },
    { text: "PCOS Community", link: constant.URL_COMMUNITY },
    { text: "Women Health Blogs", link: "/blogs" },
    { text: "Contact Us", link: "/contact-us" },
    { text: "About Us", link: "/about" },
  ];
  if (currentUser) {
    menuItems[2] = {
      text: "PCOS Community",
      link: constant.URL_TRIBE_COMMUNITY,
    };
    menuItems.push({ text: "Logout", link: constant.URL_LOGOUT });
  }

  const myAccountItems = [
    { text: "My Profile", link: constant.URL_PROFILE },
    { text: "My Consultations", link: constant.URL_CONSULTATION_LIST },
    { text: "My Programs", link: constant.URL_MY_PROGRAMS },
  ];

  const conditionItems = [
    {
      text: "PCOS/PCOD",
      link: constant.URL_CONDITIONS_PCOS,
    },
    {
      text: "UTI",
      link: "#",
    },
    {
      text: "Harmonal Imbalance",
      link: "#",
    },
  ];

  let myProfileMenu = <></>;
  if (currentUser) {
    myProfileMenu = (
      <>
        <ListItem button onClick={handleOpenMyAccountClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="My Account" />
          {openMyAccount ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMyAccount} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {myAccountItems.map((item, index) => (
              <ListItemLink
                link={item.link}
                className={classes.nested}
                key={index}
                onClick={closeNavigationDrawer}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemLink>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  const navigationMenu = (
    <>
      <List>
        <ListItemLink link={constant.URL_HOME} onClick={closeNavigationDrawer}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItemLink>
      </List>
      <ListItem button onClick={handleOpenConditionsClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Conditions" />
        {openConditions ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openConditions} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {conditionItems.map((item, index) => (
            <ListItem className={classes.nested} button key={index}>
              <ListItemLink link={item.link} onClick={closeNavigationDrawer}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemLink>
            </ListItem>
          ))}
        </List>
      </Collapse>
      {myProfileMenu}
      <List>
        {menuItems.map((item, index) => (
          <ListItemLink
            key={item.text}
            link={item.link}
            onClick={closeNavigationDrawer}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemLink>
        ))}
      </List>
    </>
  );

  const loginButton = (
    <Grid container direction="row" justify="center" alignItems="center">
      <Link href={constant.URL_LOGIN} passHref={true}>
        <Button
          variant="contained"
          color="primary"
          component={"a"}
          onClick={closeNavigationDrawer}
        >
          Login
        </Button>
      </Link>
    </Grid>
  );

  if (currentUser) {
    return <div className={classes.root}>{navigationMenu}</div>;
  } else {
    return (
      <div className={classes.root}>
        {navigationMenu}
        {loginButton}
      </div>
    );
  }
};
NavigationDrawer.propTypes = propTypes;
export default NavigationDrawer;
