import React from "react";
import { useRouter } from "next/router";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { PCOS_GUIDE } from "../../constants/pcos/pcos-guide.metadata";
import InputBase from "@material-ui/core/InputBase";
import AvaTimeline from "@/components/v1/TimeLine";
import Button from "@material-ui/core/Button";
import QuestionCard from "@/components/v1/QuestionCard";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "12px",
    display: "flex",
    padding: "5px",
    alignItems: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#c2c2c2",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    border: "1px solid #e5e5e5",
    borderRadius: "4px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

export default function PcosGuideDescription() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  return (
    <div style={{ backgroundColor: "#f9f9f9", padding: "15px" }}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <div>
        {id && (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px 8px 0px 0px",
              marginTop: "15px",
              marginLeft: "-15px",
              marginRight: "-15px",
              paddingLeft: "15px",
              minHeight: "150px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                marginTop: "15px",
                fontWeight: "bold",
                color: "#4f4f4f",
              }}
            >
              {PCOS_GUIDE[id - 1].title}
            </div>
            <AvaTimeline data={PCOS_GUIDE[id - 1].description} />
          </div>
        )}
      </div>
      {/* TODO: This is PCOS QUIZ. Uncomment to integrate */}
      {/* <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px 8px 0px 0px',
      marginTop: '15px',
      marginLeft: '-15px',
      marginRight: '-15px',
      paddingLeft: '15px',
      minHeight: '150px',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', marginTop: '15px' }}>
        <div style={{ marginRight: '12px' }}><AvaImage name='pcos' /></div>
        <div>
          <div style={{ color: '#4f4f4f', fontSize: '18px', fontWeight: 'bold' }}>Are you up for a PCOS Quiz?</div>
          <div style={{ color: '#4f4f4f', fontSize: '12px' }}>Confirm yor PCOS sypmtoms</div>
        </div>
      </div>
      <div style={{ height: '0.5px', backgroundColor: '#b2b2b2', marginRight: '15px', marginTop: '15px', marginBottom: '15px' }}></div>
      <div>
        <div style={{ color: '#4f4f4f', fontSize: '18px', fontWeight: 'bold' }}>Do you have acne or other skin problems?</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '15px 0px' }}>
          <Button style={{ display: 'flex', color: '#06b541', fontSize: '24px', fontWeight: 'bold' }} size="medium" className={classes.margin}>Yes</Button>
          <Button style={{ color: '#e93131', fontSize: '24px', fontWeight: 'bold' }} size="medium" className={classes.margin}>No</Button>
        </div>
      </div>
    </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "15px 0px",
        }}
      >
        <div style={{ color: "#4f4f4f", fontSize: "18px", fontWeight: "bold" }}>
          Popular Queries
        </div>
        <div>
          <Button style={{ color: "#ee4ca3", fontSize: "12px" }}>
            View More
          </Button>
        </div>
      </div>
      <div>
        {id &&
          PCOS_GUIDE.filter(
            (datum) => datum.id.toString() !== id.toString()
          ).map((datum, index) => <QuestionCard key={index} data={datum} />)}
      </div>
    </div>
  );
}
