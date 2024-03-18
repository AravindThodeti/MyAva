import * as React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as constant from "@/constants/index";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import CentreCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import TimeAgo from "react-timeago";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { experienceFormatter, extractSPName } from "@/utils/Utility";
import { getConsultants } from "@/utils/ApiUtils";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { bool, string } from "prop-types";

function ConsultantItem({ data, spDetailColor }) {

  const useStyles = makeStyles((theme) => ({
    largeImage: {
      height: theme.spacing(15),
      width: theme.spacing(15),
    },
    spName: {
      color: spDetailColor,
      textTransform: "capitalize",
      fontWeight: 600,
      fontSize: "14px",
      paddingTop: theme.spacing(1),
      fontFamily: "Poppins",
    },
    spExp: {
      color: spDetailColor,
      fontWeight: 400,
      fontFamily: "Poppins",
      fontSize: "12px",
    },
  }));

  const classes = useStyles();
  const name = extractSPName(data?.name);
  return (
    <Link
      href={{ pathname: constant.URL_CONSULTATION, query: { name: data?.name } }}
    >
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Avatar
            alt={name}
            src={data?.user.image_url}
            className={classes.largeImage}
          />
        </Grid>
        <Grid item>
          <Typography variant="body2" className={classes.spName}>
            {data?.title} {name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" className={classes.spExp}>
            <TimeAgo
              date={data?.experience_from}
              formatter={experienceFormatter}
            />
            {" of Exp"}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
}
ConsultantItem.propTypes = {
  spDetailColor: string,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const useStyles = makeStyles(() => ({
    listRoot: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      padding: "0px",
    },
  }));
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1} className={classes.listRoot}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ConsultationV3({
  showseeall,
  backgroundColor,
  headingColor,
  tabDefaultColor,
  tabActiveColor,
  indicatorColor,
  spDetailColor,
}) {
  const useStyles = makeStyles((theme) => ({
    containerDiv: {
      backgroundColor: backgroundColor,
      paddingBottom: "15px",
    },
    heading: {
      color: headingColor,
      fontWeight: 700,
      paddingLeft: "20px",
      fontFamily: "Poppins",
    },
    seeAll: {
      color: headingColor,
      fontWeight: 600,
    },
    gridList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
      width: "100%",
      [theme.breakpoints.up("md")]: {
        justifyContent: "center",
      },
      "& li": {
        display: "flex",
      },
    },
  }));
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [consultantList, setConsultantList] = React.useState({});
  const featuredConsultants = {
     0: [3, 31, 2, 26],
     1: [75, 25, 23],
     2: [72, 73, 17],
     2: [72, 73],
  };

  const getConsultantData = (_value, ids) => {
    getConsultants(null, ids).then((res) => {
      let mapping = {};
      let output = [];
      res.map((r) => {
        mapping[r.id] = r;
      });
      ids.forEach((id) => {
        output.push(mapping[id]);
      });
      const oldData = { ...consultantList };
      oldData[_value] = output;
      setConsultantList(oldData);
    });
  };

  React.useEffect(() => {
    if (
      value !== undefined &&
      value !== null &&
      featuredConsultants[value] &&
      !consultantList[value]
    ) {
      getConsultantData(value, featuredConsultants[value]);
    }
  }, [value]);

  const getConsultantsList = (value) => {
    let cols = 2.5;
    if (useMediaQuery(theme.breakpoints.up("md"))) {
      cols = 4;
    }
    const deptConsultantList = consultantList[value];
    if (deptConsultantList) {
      return (
        <ImageList className={classes.gridList} cols={cols} spacing={1}>
          {deptConsultantList.map((consultant, key) => {
            return (
              <ImageListItem key={key}>
                <ConsultantItem
                  spDetailColor={spDetailColor}
                  data={consultant}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      );
    } else {
      return <CentreCircularProgress />;
    }
  };

  const AntTabs = withStyles({
    indicator: {
      backgroundColor: indicatorColor,
      "& > span": {
        maxWidth: 40,
        width: "100%",
        backgroundColor: "#ffffff",
      },
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

  const AntTab = withStyles(() => ({
    root: {
      color: tabDefaultColor,
      fontFamily: "Poppins",
      fontSize: "0.7rem",
      "&$selected": {
        color: tabActiveColor,
        fontFamily: "Poppins",
        fontWeight: 700,
      },
    },
    selected: {},
  }))(Tab);

  return (
    <Box className={classes.containerDiv}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={9}>
          <Typography
            className={`${classes.heading} myava-consult-heading`}
            variant="h5"
          >
            Our Experts
          </Typography>
        </Grid>
        {showseeall && (
          <Grid
            style={{ display: "flex", justifyContent: "flex-end" }}
            className="myava-consult-see-all-div"
            item
            xs={3}
          >
            <Link href={constant.URL_CONSULTATION} passHref={true}>
              <Typography
                className={`${classes.seeAll} myava-consult-see-all`}
                variant="caption"
              >
                See All
              </Typography>
            </Link>
          </Grid>
        )}
      </Grid>
      <AntTabs
        className="myava-consult-tabs"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <AntTab label="Gynaecologists" {...a11yProps(0)} />
        <AntTab label="Nutritionists" {...a11yProps(1)} />
        <AntTab label="Fitness trainer" {...a11yProps(2)} />
      </AntTabs>
      <TabPanel value={value} index={0}>
        {getConsultantsList(value)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {getConsultantsList(value)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {getConsultantsList(value)}
      </TabPanel>
    </Box>
  );
}
ConsultationV3.defaultProps = {
  backgroundColor: "#FFF4F6",
  headingColor: "#4F4F4F",
  tabDefaultColor: "#4F4F4F",
  tabActiveColor: "#C93B5D",
  indicatorColor: "#C93B5D",
  spDetailColor: "#4F4F4F",
  showseeall: true,
};
ConsultationV3.propTypes = {
  showseeall: bool,
  backgroundColor: string,
  headingColor: string,
  tabDefaultColor: string,
  tabActiveColor: string,
  indicatorColor: string,
  spDetailColor: string,
};
