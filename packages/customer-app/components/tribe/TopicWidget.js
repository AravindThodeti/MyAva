import * as React from "react";
import Box from "@material-ui/core/Box";
import { LS_ACCESS_TOKEN } from "@ava/common";
import { string, number } from "prop-types";

const propTypes = {
  topicSlug: string,
  feedLimit: number,
};

const TopicWidget = ({ topicSlug, feedLimit = 1 }) => {
  const topicDivElement = `topic-${topicSlug}`;
  /**
   *
   *This additional css needs to be entered in tribe advanced settings.
   body.is-embed .topic-header {
      display: none !important;
    }
   body.is-embed .segment{
    display: none !important;
    }
   *
   */

  React.useEffect(() => {
    if (topicSlug && document) {
      const script = document.createElement("script");
      const token = localStorage.getItem(LS_ACCESS_TOKEN);
      if (token) {
        script.innerHTML = `window.Tribe('topic', {id: '${topicDivElement}', slug: '${topicSlug}', type:'posts', feedLimit: ${feedLimit}, components:['header'], jwt: '${token}'});`;
      } else {
        script.innerHTML = `window.Tribe('topic', {id: '${topicDivElement}', slug: '${topicSlug}', type:'posts', feedLimit: ${feedLimit}, components:['header'] });`;
      }
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [topicSlug]);

  if (topicSlug) {
    return (
      <Box mt={2} mb={2} ml={1} mr={1}>
        <div id={topicDivElement} className="ava-topic-widget" />
      </Box>
    );
  }
  return <></>;
};

TopicWidget.propTypes = propTypes;
