import * as React from "react";
import Box from "@material-ui/core/Box";
import { LS_ACCESS_TOKEN } from "@ava/common";
import { string } from "prop-types";

const propTypes = {
  postId: string,
};

const PostWidget = ({ postId }) => {
  const postDivElement = `post-${postId}`;

  React.useEffect(() => {
    if (postId && document) {
      const script = document.createElement("script");
      const token = localStorage.getItem(LS_ACCESS_TOKEN);
      if (token) {
        script.innerHTML = `window.Tribe('post', {id: '${postDivElement}', postId: '${postId}', components: ['post'], jwt: '${token}'});`;
      } else {
        script.innerHTML = `window.Tribe('post', {id: '${postDivElement}', postId: '${postId}', components: ['post']});`;
      }
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [postId]);

  if (postId) {
    return (
      <Box mt={2} mb={2} ml={1} mr={1}>
        <div id={postDivElement} />
      </Box>
    );
  }
  return <></>;
};
PostWidget.propTypes = propTypes;
export default PostWidget;
