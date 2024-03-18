import { makeStyles } from "@material-ui/core/styles";

const pcosGuideStyles = makeStyles(() => ({
  mainContainer: { padding: "15px", backgroundColor: "#f9f9f9" },
  coverContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "140px",
  },
  titleContainer: { marginBottom: "12px" },
  title: { color: "#ee4ca3", fontSize: "24px", fontWeight: "bold" },
  titleExtra: { color: "#873160" },
  subTitle: { color: "#4f4f4f", fontSize: "14px" },
}));

export default pcosGuideStyles;
