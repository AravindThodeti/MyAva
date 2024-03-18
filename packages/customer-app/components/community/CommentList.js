import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  TextField,
  Button,
  ListItemAvatar,
  ListItemText,
  List,
  ListItem,
  Avatar,
  Grid,
} from "@material-ui/core";
import { getComments, saveComment } from "@/utils/ApiUtils";
import { saveComment as saveCommentAction } from "@/actions/community.action";
import { number } from "prop-types";

const propTypes = {
  postId: number,
  commentsCount: number,
};

const useStyles = makeStyles((theme) => ({
  commentItemAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const CommentList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const postId = props.postId;
  const commentsCount = props.commentsCount;
  const profile = useSelector((state) => state.profileReducer.profile);
  const [paginationMeta, setPaginationMeta] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const [comment, setComment] = React.useState("");

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  function handleCommentSave() {
    if (comment.trim().length > 0) {
      saveComment(postId, comment).then((res) => {
        dispatch(saveCommentAction(postId));
        setComment("");
        if (comments === null) {
          setComments([res]);
        } else {
          setComments([res, ...comments]);
        }
      });
    }
  }

  const fetchComments = (postId, page) => {
    if (postId) {
      getComments(postId, page).then((res) => {
        let commentList;
        if (comments == null) {
          commentList = res.comments;
        } else {
          commentList = [...comments, ...res.comments];
        }
        delete res.comments;
        setPaginationMeta(res);
        setComments(commentList);
      });
    }
  };

  React.useEffect(() => {
    if (comments == null && commentsCount > 0) {
      fetchComments(postId);
    }
  }, [comments, commentsCount]);

  const commentList = (comments) => {
    if (comments == null || paginationMeta == null || comments.length == 0) {
      return <div></div>;
    }
    return (
      <Box>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemAvatar>
                <Avatar
                  className={classes.commentItemAvatar}
                  src={comment.user.image_url}
                />
              </ListItemAvatar>
              <ListItemText
                primary={comment.user.name}
                secondary={comment.comment}
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: 8,
                  padding: 8,
                }}
              />
            </ListItem>
          ))}
        </List>
        {paginationMeta.has_next && (
          <Button
            size="small"
            onClick={() =>
              fetchComments(postId, paginationMeta.page_number + 1)
            }
          >
            Load more comments
          </Button>
        )}
      </Box>
    );
  };

  const createComment = () => {
    if (profile) {
      return (
        <Box ml={1} mr={1} mb={0.5}>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <Avatar
                src={profile.user.image_url}
                className={classes.commentItemAvatar}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Add Comment"
                placeholder="Write a comment"
                multiline
                value={comment}
                onChange={handleCommentChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={() => handleCommentSave()} color="primary">
                Post
              </Button>
            </Grid>
          </Grid>
        </Box>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Box margin={1}>
      {createComment()}
      {commentList(comments)}
    </Box>
  );
};
CommentList.propTypes = propTypes;
export default CommentList;
