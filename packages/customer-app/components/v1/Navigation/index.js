import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../../../store/actions/drawer.action";
import Link from "next/link";
import DEFAULT_DRAWER_NAV, {
  LOG_OUT_DRAWER_NAV_OBJ,
  AUTH_DRAWER_NAV,
} from "./navigation.metadata";
import AvaImage from "../Image";
import * as constant from "../../../constants";
import { string } from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  loginButton: {
    background: "linear-gradient(302.57deg, #8B2B61 0%, #CD3C5D 100%)",
    fontWeight: 600,
  },
}));

const authListStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#f9eef2",
  },
}));

export default function NavigationDrawer() {
  const classes = useStyles();
  const authListClasses = authListStyles();
  const currentUser = useSelector((state) => state.profileReducer.profile);
  const dispatch = useDispatch();

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
  ListItemLink.propTypes = {
    link: string,
  };

  React.useEffect(() => {}, [currentUser]);
  let menuItems = DEFAULT_DRAWER_NAV;

  if (currentUser) {
    menuItems[4].link = constant.URL_TRIBE_COMMUNITY;
  }

  //FIXME: this is a bad implementation. Instead of doing an operation, you need to set it to a static object in this code as this runs each time the drawer is opened and closed
  if (currentUser && menuItems.length < 9) {
    menuItems.push(LOG_OUT_DRAWER_NAV_OBJ);
  } else if (!currentUser && menuItems.length === 9) {
    menuItems.splice(menuItems.length - 1, 1);
  }

  console.log("menuItems", menuItems);
  console.log("AUTH_DRAWER_NAV", AUTH_DRAWER_NAV);
  const navigationMenu = (
    <>
      {currentUser && (
        <List className={authListClasses.root}>
          {AUTH_DRAWER_NAV.map((item, index) => (
            <ListItemLink
              key={index}
              link={item.link}
              onClick={closeNavigationDrawer}
            >
              <ListItemText primary={item.text} />
            </ListItemLink>
          ))}
        </List>
      )}
      <List>
        {menuItems.map((item, index) => (
          <ListItemLink
            key={index}
            link={item.link}
            onClick={closeNavigationDrawer}
          >
            {item.iconSrc && (
              <div style={{ marginLeft: "-8px", marginRight: "8px" }}>
                <AvaImage size="xsmall" name={item.iconSrc} />
              </div>
            )}
            <ListItemText primary={item.text} />
          </ListItemLink>
        ))}
      </List>
    </>
  );

  const loginButton = (
    <div style={{ padding: "15px" }}>
      <Link href={constant.URL_LOGIN} passHref={true}>
        <Button
          variant="contained"
          color="primary"
          component={"a"}
          onClick={closeNavigationDrawer}
          className={classes.loginButton}
        >
          Login
        </Button>
      </Link>
    </div>
  );

  return (
    <div className={classes.root}>
      {navigationMenu}
      {!currentUser && <div>{loginButton}</div>}
    </div>
  );
}
