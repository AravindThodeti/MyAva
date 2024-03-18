import React from "react";
import PNG_ICONS from "./png.metadata";
import { string, func, bool } from "prop-types";

const propTypes = {
  name: string,
  size: string,
  onClick: func,
  active: bool,
  src: string,
};
const DEFAULT_SIZE = "small";
const SIZE = {
  xxsmall: {
    height: "24",
    width: "24",
  },
  xsmall: {
    height: "32",
    width: "32",
  },
  small: {
    height: "48",
    width: "48",
  },
  medium: {
    height: "72",
    width: "72",
  },
  large: {
    height: "104",
    width: "104",
  },
  xxl: {
    height: "200",
    width: "200",
  },
  xxxl: {
    height: "290",
    width: "290",
  },
  logo: {
    height: "22px",
    width: "72px",
  },
  content: {
    height: "auto",
    width: "100%",
  },
  header1: {
    height: "47px",
    width: "168px",
  },
  header2: {
    height: "150px",
    width: "150px",
  },
  loginSvg: {
    height: "156px",
    width: "166px",
  },
  social: {
    height: "56px",
    width: "300px",
  },
  banner: {
    height: "80px",
    width: "100%",
  },
  programDetail: {
    height: "250px",
    width: "100%",
  },
  program: {
    height: "280px",
    width: "100%",
  },
  paySucHead: {
    height: "auto",
    width: "100%",
  },
  communityBanner: {
    height: "100%",
    width: "100%",
  },
  homePcosBanner: {
    height: "100%",
    width: "100%",
  },
  consultBanner: {
    height: "200px",
    width: "150px",
  },
  consultBannerWeb: {
    height: "410px",
    width: "315px",
  },
  homeAskQuestionBanner: {
    height: "auto",
    width: "100%",
  },
  expertise: {
    height: "30px",
    width: "30px",
    marginBottom: "8px",
  },
  aboutUsHeader: {
    height: "180px",
    width: "100%",
    marginBottom: "15px",
  },
  team: {
    height: "72px",
    width: "72px",
  },
  investorsLogo: {
    height: "72px",
    width: "130px",
  },
};

export function AvaImageV1({ name, size, onClick, active, src }) {
  return (
    <div
      onClick={onClick}
      style={{
        height: "100%",
        display: "flex",
        color: active ? "#e54d9b" : "#000000",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <img
        style={{ borderRadius: src && size !== "content" ? "50%" : "" }}
        height={size ? SIZE[size].height : SIZE[DEFAULT_SIZE].height}
        width={size ? SIZE[size].width : SIZE[DEFAULT_SIZE].width}
        src={src ? src : PNG_ICONS[name]}
      />
    </div>
  );
}
AvaImageV1.propTypes = propTypes;

export default function AvaImage({ name, size, onClick, active, src }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        color: active ? "#e54d9b" : "#000000",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop:"10px"
      }}
    >
      <img
        style={{
          borderRadius: src && size !== "content" ? "50%" : "",
          marginBottom: size ? SIZE[size].marginBottom : "0px",
        }}
        height={size ? SIZE[size].height : SIZE[DEFAULT_SIZE].height}
        width={size ? SIZE[size].width : SIZE[DEFAULT_SIZE].width}
        src={src ? src : PNG_ICONS[name]}
      />
    </div>
  );
}
AvaImage.propTypes = propTypes;
