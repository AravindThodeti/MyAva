import * as React from "react";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import * as constant from "@/constants/index";
import { AvaImageV1 } from "@/components/v1/Image";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function AskQuestion() {
  const theme = useTheme();
  const router = useRouter();
  const matchesxs = useMediaQuery(theme.breakpoints.down("sm"));
  const matchessm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const matchesmd = useMediaQuery(theme.breakpoints.up("md"));
  const matcheslg = useMediaQuery(theme.breakpoints.up("lg"));

  let height, name;
  if (matchesxs) {
    height = `calc(40vh)`;
    name = "askAQuestion";
  }
  if (matchessm) {
    height = `calc(50vh)`;
    name = "askAQuestionWeb";
  }
  if (matchesmd) {
    height = `calc(100vh)`;
    name = "askAQuestionWeb";
  }
  if (matcheslg) {
    height = `calc(100vh)`;
    name = "askAQuestionWeb";
  }

  return (
    <Box className="ask-an-expert-image" m={3}>
      <div style={{ height: `calc(${height} - 100px)` }}>
        <AvaImageV1
          onClick={() => {
            router.push(constant.URL_CONSULTATION);
          }}
          name={name}
          size="homeAskQuestionBanner"
        />
      </div>
    </Box>
  );
}
