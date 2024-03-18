
import * as React from "react";
import {string} from "prop-types";

import styles from "./RotatingCircle.module.scss";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
  useCircularInputContext,
} from "react-circular-input";
import { useEffect } from "react";
const propTypes = {
  imageUrl: string,
  percentageValue: Number,
  dayCount:Number,
  cycleLength:Number
};
const RotatingCircle = ({ imageUrl, percentageValue,dayCount,cycleLength }) => {
  console.log("percentage" , percentageValue)
  const [value, setValue] = React.useState(percentageValue);
  useEffect(() => {
    setValue(percentageValue);
  }, [percentageValue]);
  useEffect(() => {
    setValue(percentageValue);
  }, []);
  return (
    <Grid>
      <div className={styles.periodCycle}>
        
        <img
          src="/assets/images/seeds/flax-seed.png"
          alt="circle_image"
          className={cycleLength/2>dayCount ? styles.hidePeriodCycleImage : styles.displayPeriodCycleImage}
        ></img>
         <img
          src="/assets/images/seeds/sesame-seeds.png"
          alt="circle_image"
          className={cycleLength/2>dayCount ? styles.hidePeriodCycleImage : styles.displayPeriodCycleImage}
        ></img>
         <img
          src="/assets/images/seeds/pumpkin-seeds.png"
          alt="circle_image"
          className={cycleLength/2<dayCount ? styles.hidePeriodCycleImage : styles.displayPeriodCycleImage}
        ></img>   
         <img
          src="/assets/images/seeds/sunflower-seeds.png"
          alt="circle_image"
          className={cycleLength/2<dayCount ? styles.hidePeriodCycleImage : styles.displayPeriodCycleImage}
        ></img>
        <img  src="/assets/images/BreakLine.svg"
          alt="circle_image" ></img>
        <span className={styles.alignPhaseNames}><label><b>PMS</b></label><label><b>THE PERIOD</b></label><label><b>FERTILE WINDOW</b></label></span>
        

        <CircularInput value={value} onChange={setValue} >
          <CircularTrack strokeWidth={10} stroke="#eee0" />
          <CircularProgress stroke={""} />
          <CircularThumb fill="#ffffffd1" stroke="#C73B5D" strokeWidth="3" r="26" />
          <ImageComponent />
        <CustomComponent dayCount={dayCount} cycleLength={cycleLength} /> 
        
        </CircularInput>
      </div>
    </Grid>
  );
};

function Grid({ children }) {
  return (
    <div 
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
        fontFamily: "sans-serif",
        background: "linear-gradient(233.32deg, #EA194B 14.44%, rgba(255, 255, 255, 0.88) 42.85%, rgba(255, 255, 255, 0) 67.44%, #490BCC 81.68%, #490BCC 112.42%)",
        width: "310px",
        height: "310px",
        margin: "0 auto",
        borderRadius: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        boxShadow: "5px 35px 50px rgb(255 17 174 / 36%)"

      }}
    >
      {children}
    </div>
  );
}
function ImageComponent(){
  const { getPointFromValue, value } = useCircularInputContext();
  const point = getPointFromValue();
  if (!point) return null;
  return(
    <svg {...point} viewBox="6 10 100 100" xmlns="http://www.w3.org/2000/svg" >
 <image width="13" textAnchor="middle" href='/assets/images/myAvaCircleLogo.svg' style={{opacity:"0.9"}}></image>   
  </svg>
  )
}
function CustomComponent({dayCount,cycleLength}) {
  const { getPointFromValue, value } = useCircularInputContext();
  const point = getPointFromValue();
  const percentage = Math.round(value * 100);
  var displayCount = Math.round((percentage/100)*cycleLength)
  if(displayCount==0){
    displayCount=cycleLength;
  }
  console.log("count",displayCount)
  console.log(point);
  if (!point) return null;
  return (
    <svg {...point} viewBox="-2 -12 200 200" xmlns="http://www.w3.org/2000/svg" >
    <text
      textAnchor="middle"
      dy="0.5em"
      fill="black"
      style={{ pointerEvents: "none", fontWeight: "600" ,fontSize:"10px"}}
    >
     Day-{displayCount}
    </text>
    </svg>
    // <image   width ="45"   href="/assets/images/MyAvaCircle.svg"></image>
  );
}

RotatingCircle.defaultProps = {
  imageUrl: "/assets/images/periodTracker/periodCycle.png",
};
RotatingCircle.prototype = propTypes;
export default RotatingCircle;
