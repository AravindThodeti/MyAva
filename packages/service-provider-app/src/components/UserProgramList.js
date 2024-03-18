import { URL_CONSULTATION_GET } from "constants/index";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
  getConsultationsV1,
  getUserProgramDetail,
  getPlanDetail,
  getProgramDetail,
} from "../utils/ApiUtils";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tabs } from "@material-ui/core";
let tabName;
function AvaTabs({ data, tabChnageHandler, consultationInfo }) {
  tabName = tabChnageHandler;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "25px",
      }}
    >
      {data.map((datum, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          key={index}
          onClick={() => {
            tabChnageHandler.settabState(datum);
            // UserProgramList();
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "14px",
              fontWeight: tabChnageHandler.tabState === datum ? "800" : "500",
              color:
                tabChnageHandler.tabState === datum ? "#dd66a6" : "#222222",
              borderBottom:
                tabChnageHandler.tabState === datum ? "1px solid #dd66a6" : "",
            }}
          >
            {datum}
          </span>
        </div>
      ))}
    </div>
  );
}

function AvaPatientInfoCard({ info }) {
  const history = useHistory();
  const [programInfo, setprogramInfo] = useState({});
  const [progName, setprogName] = useState("");
  const [planName, setplanName] = useState("");

  useEffect(() => {
    if (info.user_program_id) {
      getUserProgramDetail(info.user_program_id)
        .then(
          (res) => {
            setprogramInfo(res);
            getPlanDetail(res.plan_id).then((res) => {
              setplanName(res.name);
              getProgramDetail(res.program_id).then((res1) => {
                setprogName(res1.name);
              });
            });
          },
          (err) => {
            console.log("Err: ", err);
          }
        )
        .catch((err) => {
          console.log("Catch Err: ", err);
        });
    }
  }, [info]);

  return (
    <div
      style={{
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFF",
        margin: "15px",
        padding: "12px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "40% 60%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            height="60"
            width="60"
            style={{ borderRadius: "30px" }}
            src={
              info.customer.user && info.customer.user.image_url
                ? info.customer.user.image_url
                : ""
            }
            alt={info.customer.name}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              color: "#4f4f4f",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            <div>
              {moment(info.slot_start).format("LT")}
            </div>
            <div>{moment(info.slot_start).format("ll")}</div>
          </div>
        </div>
        <div
          style={{
            marginLeft: "10px",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <div>
            <div style={{ fontSize: "14px", fontWeight: "bold" }}>
              {info.customer.name}
            </div>
            {info.user_program_id && (
              <div>
                <span>id : </span>
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {info.user_program_id}
                </span>
              </div>
            )}
          </div>

          <div style={{ fontSize: "14px" }}>
            {info.user_program_id ? (
              <span>
                <span style={{ fontWeight: "bold" }}>{progName}</span>
                <br />
                {planName}
              </span>
            ) : (
              <span style={{ fontWeight: "bold" }}>Direct Consulation</span>
            )}
          </div>
          {info.user_program_id && (
            <div>
              <span>Valid till : </span>
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                {moment(programInfo.valid_till).format("ll")}
              </span>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              paddingTop: "15px",
            }}
          >
            <div
              style={{ color: "#dd66a6", fontSize: "14px", fontWeight: "bold" }}
              onClick={() => {
                history.push(URL_CONSULTATION_GET(info.id));
              }}
            >
              Start Consultation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserProgramList() {
  const [tabState, settabState] = useState("Active");
  const [consultationData, setconsultationData] = useState([]);
  const [currentPage, setcurrentPage] = useState(null);
  const [hasMore, sethasMore] = useState(false);

  function fetchData(tabName) {
    let pageNum = null;
    let previousTabName = localStorage.getItem("tabName");
    if (tabName == undefined) {
      tabName = localStorage.getItem("tabName");
    }
    if (previousTabName && previousTabName !== tabName) {
      let emptyArray = consultationData.splice(0, consultationData.length);
      setconsultationData(consultationData);
    }
    if (tabName) {
      localStorage.setItem("tabName", tabName);
      setcurrentPage(null);
      pageNum = "0";
    } else {
      pageNum = String(currentPage + 1);
    }

    let presentDate = new Date();
    presentDate = presentDate.toISOString();
    getConsultationsV1(tabName, pageNum, presentDate, presentDate)
      .then(
        (res) => {
          let data = consultationData.concat(res?.data);
          setconsultationData(data);
          setcurrentPage(res?.page_number);
          sethasMore(res?.has_next);
        },
        (err) => {}
      )
      .catch((err) => {});
  }

  useEffect(() => {
    fetchData(tabState);
  }, [tabState]);
  return (
    <div>
      <div>
        <AvaTabs
          data={["Active", "Upcoming", "History"]}
          tabChnageHandler={{ tabState, settabState }}
        />

        {consultationData.length > 0 && (
          <InfiniteScroll
            dataLength={consultationData.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            // endMessage={
            //   <p style={{ textAlign: 'center' }}>
            //     <b>Yay! You have seen it all</b>
            //   </p>
            // }
            // below props only if you need pull down functionality
            // refreshFunction={this.refresh}
            // pullDownToRefresh
            // pullDownToRefreshThreshold={50}
            // pullDownToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            // }
            // releaseToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            // }
          >
            {consultationData.map((datum, index) => (
              <AvaPatientInfoCard key={index} info={datum} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
