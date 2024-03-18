import * as React from "react";
import Box from "@material-ui/core/Box";
import { LS_ACCESS_TOKEN } from "@ava/common";
import { string } from "prop-types";
const propTypes = {
  topicSlug: string,
};

const TopicHeadersWidget = ({ topicSlug }) => {
  const topicDivElement = `topic-header`;
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
        script.innerHTML = `window.Tribe('topic', {id: '${topicDivElement}', type:'posts', slug: '${topicSlug}', components:['header', 'suggestions'], jwt: '${token}'});`;
      } else {
        script.innerHTML = `window.Tribe('topic', {id: '${topicDivElement}', type:'posts', slug: '${topicSlug}', components:['header', 'suggestions'] });`;
      }
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [topicSlug]);

  return (
    <Box mt={2} mb={2} ml={1} mr={1}>
      <div id={topicDivElement} className="ava-topic-header-widget" />
    </Box>
  );
};
TopicHeadersWidget.propTypes = propTypes;
export default TopicHeadersWidget;
