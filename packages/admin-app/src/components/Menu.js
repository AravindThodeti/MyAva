import * as React from "react";
import { useSelector } from "react-redux";
import {
  useMediaQuery,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
  List,
} from "@material-ui/core";
import { MenuItemLink, getResources } from "react-admin";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { withRouter } from "react-router-dom";
import DefaultIcon from "@material-ui/icons/ViewList";

const Menu = ({ onMenuClick, logout, location }) => {
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources);
  const [openGroup, setOpenGroup] = React.useState({});
  const [groups, setGroups] = React.useState({});
  const [nonGroupedMenuItems, setNonGroupedMenuItems] = React.useState([]);

  React.useEffect(() => {
    const groupDict = {};
    const nonGrouped = [];
    const openGroups = {};
    resources.forEach((element) => {
      if (element.hasList) {
        if (element.options && element.options.group) {
          if (!groupDict.hasOwnProperty(element.options.group)) {
            groupDict[element.options.group] = {
              name: element.options.group,
              icon: element.options.groupIcon,
              items: [],
            };
            openGroups[element.options.group] = false;
          }
          groupDict[element.options.group].items.push(element);
          if ("/" + element.name === location.pathname) {
            openGroups[element.options.group] = true;
          }
        } else {
          nonGrouped.push(element);
        }
      }
    });
    setGroups(groupDict);
    setNonGroupedMenuItems(nonGrouped);
    setOpenGroup(openGroups);
  }, [resources, location.pathname]);

  const handleOpenGroupClick = (groupName) => {
    const openGroups = { ...openGroup };
    openGroups[groupName] = !openGroup[groupName];
    setOpenGroup(openGroups);
  };
  const getMenuItem = (resource) => (
    <MenuItemLink
      style={{ textTransform: "capitalize" }}
      key={resource.name}
      to={`/${resource.name}`}
      primaryText={
        (resource.options && resource.options.label) || resource.name
      }
      leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
      onClick={onMenuClick}
      sidebarIsOpen={open}
    />
  );
  const getMenuGroupItems = (group) => (
    <Collapse in={openGroup[group.name]} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {group.items.map((item, index) => (
          <ListItem key={index}>{getMenuItem(item)}</ListItem>
        ))}
      </List>
    </Collapse>
  );

  const getMenuGroup = (group, key) => (
    <List key={key}>
      <ListItem onClick={() => handleOpenGroupClick(group.name)}>
        <ListItemIcon>
          {group.icon ? <group.icon /> : <DefaultIcon />}
        </ListItemIcon>
        <ListItemText primary={group.name} />
        {openGroup[group.name] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {getMenuGroupItems(group)}
    </List>
  );
  return (
    <>
      {Object.keys(groups).map((group, index) => getMenuGroup(groups[group], index))}
      {nonGroupedMenuItems.map((resource) => getMenuItem(resource))}
      {isXSmall && logout}
    </>
  );
};

export default withRouter(Menu);
