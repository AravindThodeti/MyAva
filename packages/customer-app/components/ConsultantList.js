import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CentreCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import Typography from "@material-ui/core/Typography";
import TimeAgo from "react-timeago";
import { useDispatch, useSelector } from "react-redux";
import { getConsultants } from "../store/actions/api.action";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import { experienceFormatter } from "@/utils/Utility";
import * as constant from "../constants";
import { List } from "@material-ui/core";
import Link from "next/link";
import AvaImage from "./v1/Image";
import { object, array, number, string, func } from "prop-types";

const EXPERTISE_DISPLAY_VALUE = {
  All: "All",
  PCOS: "PCOS",
  PERIODS: "Periods",
  ACNE: "Acne",
  HAIRLOSS: "HairLoss",
  "FACIAL HAIR": "FacialHair",
  INFERTILITY: "Infertility",
};

const EXPERTISE_DISPLAY_VALUE1 = {
  All: "All",
  PCOS: "PCOS",
  PERIODS: "Periods",
  ACNE: "Acne",
  HAIRLOSS: "Hair Loss",
  "FACIAL HAIR": "Facial Hair",
  INFERTILITY: "Infertility",
};

const useStyles = makeStyles((theme) => ({
  itemWrap: {
    width: "100%",
    backgroundColor: "#F8F8F8",
    padding: "15px",
    paddingBottom: 0,
  },
  metaWrap: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  metaData: {
    display: "flex",
    flexDirection: "column",
  },
  imageWrap: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  name: {
    fontWeight: "600",
    fontSize: "1.2rem",
    color: "#000000",
  },
  department: {
    color: "#3F3D56",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  otherMeta: {
    color: "#39393E",
    fontSize: "0.82rem",
    fontWeight: "300",
  },
  languages: {
    textTransform: "capitalize",
  },
  avatar: {
    height: theme.spacing(12),
    width: theme.spacing(12),
    zIndex: 2,
    transform: "scale(1.3)",
  },
  specialization: {
    fontSize: "0.70rem",
    textTransform: "capitalize",
    maxHeight: "1rem",
    overflow: "hidden",
    wordBreak: "break-all",
  },
  listItem: {
    padding: "15px",
    paddingBottom: "0px",
  },
  consultLink: {
    marginTop: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",
  },
  consultButton: {
    padding: theme.spacing(0.5),
  },
}));

export function ConsultantDetails({ data }) {
  if (data) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: "10px",
          borderBottom: "1px solid #999999",
          marginBottom: "10px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{ color: "#443e41", fontSize: "16px", fontWeight: "bold" }}
          >
            {data?.title} {data?.name}
          </div>
          <div style={{ color: "#6f6f6f", fontSize: "14px" }}>
            {data?.qualification}&nbsp;-&nbsp;
            <span>
              {data?.department && <span>{data?.department?.name}</span>}
            </span>
          </div>
          <div style={{ color: "#999999", fontSize: "14px" }}>
            <TimeAgo
              date={data?.experience_from}
              formatter={experienceFormatter}
            />
            {" of Experience"}
          </div>
          <div style={{ color: "#6f6f6f", fontSize: "14px" }}>
            Conslutation fee{" "}
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              ₹{data?.department?.price}
            </span>
          </div>
        </div>
        <div style={{ width: "120px", height: "120px", marginRight: "15px" }}>
          <img
            height="120"
            width="120"
            style={{ borderRadius: "60px" }}
            alt={data?.name}
            src={data?.user.image_url}
          />
        </div>
      </div>
    );
  } else {
    return <CentreCircularProgress />;
  }
}
ConsultantDetails.propTypes = {
  data: object,
};

function ConsultantExpertise({ data }) {
  if (data) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          marginRight: "10px",
        }}
      >
        {/* <div>Expertise</div> */}
        <div
          style={{
            display: "flex",
            padding: "12px 15px 15px 5px",
            justifyContent: "space-between",
          }}
        >
          {data?.map((specialization, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "7px",
                paddingBottom: "7px",
                paddingLeft: index === 0 ? "0px" : "7px",
                paddingRight: "8px",
                borderRight:
                  index === data.length - 1 ? "" : "1px solid #999999",
              }}
            >
              <AvaImage
                size="expertise"
                name={"spec" + specialization.toLowerCase().replace(" ", "")}
              />
              <div style={{ display: "flex" }}>
                {EXPERTISE_DISPLAY_VALUE1[specialization]}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
ConsultantExpertise.propTypes = {
  data: array,
};
function BookNow({ consultantId }) {
  const currentUser = useSelector((state) => state.profileReducer.profile);
  return (
    <div>
      <Link
        href={
          currentUser
            ? constant.URL_CONSULTATION_SLOT_FORMAT
            : constant.URL_LOGIN
        }
        as={
          currentUser ? constant.URL_CONSULTATION_SLOT(consultantId) : undefined
        }
        passHref={true}
      >
        <Button
          style={{
            backgroundImage: "linear-gradient(#e4499d, #ea6293)",
            color: "#FFF",
            fontSize: "12px",
            fontWeight: "bold",
            padding: "15px",
            height: "38px",
            width: "100px",
            borderRadius: "7px",
          }}
          variant="contained"
          size="small"
        >
          Book Now
        </Button>
      </Link>
    </div>
  );
}
BookNow.propTypes = {
  consultantId: number,
};
function ConsultantItem({ consultant }) {
  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start" className={classes.listItem}>
      <Paper elevation={3} className={classes.itemWrap}>
        <ConsultantDetails data={consultant} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 100px",
            alignItems: "center",
          }}
        >
          <ConsultantExpertise data={consultant.specializations} />
          <BookNow consultantId={consultant.id} />
        </div>
      </Paper>
    </ListItem>
  );
}
ConsultantItem.propTypes = {
  consultant: object,
};

function Consultants({
  consultants,
  departmentId,
  specFilterVal,
  searchFilterVal,
}) {
  if (specFilterVal === "All") {
    if (searchFilterVal) {
      return (
        <List>
          {consultants[departmentId]
            .filter((consultant) => {
              if (
                consultant.name
                  .toLowerCase()
                  .startsWith(searchFilterVal.toLowerCase())
              ) {
                return consultant;
              }
            })
            .map((consultant, index) => (
              <ConsultantItem key={index} consultant={consultant} />
            ))}
        </List>
      );
    } else {
      return (
        <List>
          {consultants[departmentId].map((consultant, index) => (
            <ConsultantItem key={index} consultant={consultant} />
          ))}
        </List>
      );
    }
  } else {
    console.log("specFilterVal", specFilterVal);
    return (
      <List>
        {consultants[departmentId]
          .filter((consultant) => {
            if (
              consultant.specializations.indexOf(specFilterVal) > -1 &&
              consultant.name
                .toLowerCase()
                .startsWith(searchFilterVal.toLowerCase())
            ) {
              return consultant;
            }
          })
          .map((consultant, index) => (
            <ConsultantItem key={index} consultant={consultant} />
          ))}
      </List>
    );
  }
}

Consultants.propTypes = {
  consultants: object,
  departmentId: string,
  specFilterVal: string,
  searchFilterVal: string,
};

function ExpertiseFilter({
  consultants,
  departmentId,
  specFilterVal,
  setspecFilterVal,
}) {
  const [specializations, setspecializations] = useState(["All"]);
  useEffect(() => {
    if (consultants && consultants[departmentId]) {
      let data = [...specializations];
      consultants[departmentId].map((consultant) => {
        consultant.specializations.map((specialization) => {
          if (data.indexOf(specialization) === -1) {
            data.push(specialization);
          }
        });
      });
      setspecializations(data);
    }
  }, [consultants]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "nowrap",
        overflow: "scroll",
        margin: "0px 15px",
        paddingBottom: "15px",
      }}
    >
      {specializations.map((spec, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            padding: "12px",
            borderRadius: "4px",
            marginRight: "15px",
            fontWeight: "bold",
            fontSize: "14px",
            border: "1px solid #e5e5e5",
            alignItems: "center",
            justifyContent: "center",
            width: "fit-content",
            color: specFilterVal === spec ? "#fff" : "#443e41",
            backgroundColor: specFilterVal === spec ? "#e4499d" : "#fff",
          }}
          onClick={() => setspecFilterVal(spec)}
        >
          {EXPERTISE_DISPLAY_VALUE[spec]}
        </div>
      ))}
    </div>
  );
}
ExpertiseFilter.propTypes = {
  consultants: object,
  departmentId: string,
  specFilterVal: string,
  setspecFilterVal: func,
};

const propTypes = {
  departmentId: string,
  name: string,
};
const ConsultantList = ({ departmentId = null, name = "" }) => {
  const [specFilterVal, setspecFilterVal] = useState("All");
  const [searchFilterVal, setsearchFilterVal] = useState(name);
  const dispatch = useDispatch();
  const consultants = useSelector(
    (state) => state.consultantReducer.consultants
  );
  const error = useSelector((state) => state.departmentReducer.error);

  useEffect(() => {
    if (
      consultants === undefined ||
      (consultants && consultants[departmentId] === undefined)
    ) {
      dispatch(getConsultants(departmentId));
    }
  }, [consultants]);

  if (consultants && consultants[departmentId]) {
    const list = (
      <div style={{ backgroundColor: "#f1f1f1" }}>
        <div style={{ padding: "15px" }}>
          <input
            value={searchFilterVal}
            onChange={(e) => setsearchFilterVal(e.target.value)}
            placeholder="Search By Name"
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#fff",
              display: "flex",
              padding: "12px",
              border: "1px solid #e5e5e5",
              borderRadius: "5px",
            }}
          />
        </div>

        <ExpertiseFilter
          departmentId={departmentId}
          consultants={consultants}
          specFilterVal={specFilterVal}
          setspecFilterVal={setspecFilterVal}
        />

        <Consultants
          departmentId={departmentId}
          consultants={consultants}
          searchFilterVal={searchFilterVal}
          specFilterVal={specFilterVal}
        />
      </div>
    );
    return list;
  }

  if (error) {
    return (
      <Typography variant="h4" component="h4">
        {error.message} !!
      </Typography>
    );
  }

  return <CentreCircularProgress />;
};
ConsultantList.propTypes = propTypes;
export default ConsultantList;
