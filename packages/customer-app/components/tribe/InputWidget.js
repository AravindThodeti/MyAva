import * as React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { LS_ACCESS_TOKEN } from "@ava/common";

const useStyles = makeStyles(() => ({
  "ava-input-widget": {
    "& iframe": {
      height: "250px !important",
      minHeight: "250px !important",
    },
  },
}));

export default function InputWidget() {
  const classes = useStyles();
  const inputDivElement = `tribe-input-div`;
  React.useEffect(() => {
    if (document) {
      const script = document.createElement("script");
      const token = localStorage.getItem(LS_ACCESS_TOKEN);
      if (token) {
        script.innerHTML = `window.Tribe('home', {id: '${inputDivElement}', height: 250, components:[ 'input'], jwt: '${token}'});`;
      }
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <Box mt={2} mb={2} ml={1} mr={1}>
      <div id={inputDivElement} className={classes["ava-input-widget"]} />
    </Box>
  );
}
