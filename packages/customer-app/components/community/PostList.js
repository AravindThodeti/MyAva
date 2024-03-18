import * as React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  List,
  ListItem,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  CardActions,
  Icon,
  IconButton,
  GridList,
  GridListTile,
  Box,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Waypoint } from "react-waypoint";
import CommentIcon from "@material-ui/icons/Comment";
import { getCommunityPosts, updateLike } from "@/actions/api.action";
import CommentList from "./CommentList";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
  },
  postListItem: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  postItemBox: {
    width: "100%",
  },
  divider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: "#F1EEEE",
  },
  footerText: {
    color: "#979797",
    lineHeight: "1.9",
    fontSize: "0.65rem",
  },
  footer: {
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    borderTop: "1px solid #F1EEEE",
    justifyContent: "flex-end",
    paddingRight: theme.spacing(4),
  },
  footerIcon: {
    marginLeft: "0 !important",
    paddingLeft: "2px !important",
    paddingRight: "0 !important",
  },
  postImageWrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  postImageGridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function CommunityPostList(props) {
  const classes = useStyles();
  const searchInput = props.searchInput;
  const tags = props.tags;
  const dispatch = useDispatch();
  const paginationMeta = useSelector(
    (store) => store.communityReducer.paginationMeta
  );
  const posts = useSelector((store) => store.communityReducer.posts);
  const profile = useSelector((store) => store.profileReducer.profile);
  const [expanded, setExpanded] = React.useState({});

  const handleExpandClick = (postId) => {
    const expandedData = { ...expanded };
    if (expanded[postId] === undefined) {
      expandedData[postId] = true;
      setExpanded(expandedData);
    } else {
      expandedData[postId] = !expanded[postId];
      setExpanded(expandedData);
    }
  };

  const getAvatar = (post) => {
    if (post.user.image_url != null) {
      return <Avatar alt={post.user.name} src={post.user.image_url} />;
    }
    return <Avatar alt={post.user.name}>{post.user.name.charAt(0)}</Avatar>;
  };

  const updatePostLike = (post) => {
    if (post.liked) {
      dispatch(updateLike(post.id, false));
    } else {
      dispatch(updateLike(post.id, true));
    }
  };

  const getLikedIcon = (post) => {
    if (post.liked) {
      return <FavoriteIcon color="primary" />;
    }
    return <FavoriteIcon />;
  };

  // React.useEffect(() => {
  //   console.log('Hello Hello')
  //   dispatch(getCommunityPosts());
  // }, [posts]);

  if (posts && posts.length > 0 && paginationMeta) {
    const loggedIn = profile ? true : false;
    return (
      <div>
        <List>
          {posts.map((post, index) => (
            <React.Fragment key={post.id}>
              <ListItem className={classes.postListItem}>
                <Box className={classes.postItemBox}>
                  <Card className={classes.card} elevation={0}>
                    <CardHeader
                      style={{ alignItems: "flex-start" }}
                      avatar={getAvatar(post)}
                      title={post.content}
                    />
                    {post.images && (
                      <Box className={classes.postImageWrap}>
                        <GridList
                          className={classes.postImageGridList}
                          cols={post.images.length == 1 ? 1 : 2}
                        >
                          {post.images.map((image, index) => (
                            <GridListTile key={index}>
                              <img src={image} />
                            </GridListTile>
                          ))}
                        </GridList>
                      </Box>
                    )}
                    <CardActions className={classes.footer}>
                      <Typography className={classes.footerText}>
                        {post.likes} Likes
                      </Typography>
                      <IconButton
                        className={classes.footerIcon}
                        aria-label="likes"
                        aria-disabled={!loggedIn}
                        onClick={() => {
                          updatePostLike(post);
                        }}
                      >
                        {getLikedIcon(post)}
                      </IconButton>
                      <Typography
                        className={classes.footerText}
                        onClick={() => handleExpandClick(post.id)}
                      >
                        {post.comments} Comments
                      </Typography>
                      <IconButton
                        className={classes.footerIcon}
                        aria-label="comments"
                        aria-disabled={true}
                        onClick={() => handleExpandClick(post.id)}
                      >
                        <CommentIcon />
                      </IconButton>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]:
                            expanded[post.id] === undefined
                              ? false
                              : expanded[post.id],
                        })}
                        onClick={() => handleExpandClick(post.id)}
                        aria-expanded={
                          expanded[post.id] === undefined
                            ? false
                            : expanded[post.id]
                        }
                        aria-label="Show Comments"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse
                      in={
                        expanded[post.id] === undefined
                          ? false
                          : expanded[post.id]
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <CommentList
                          postId={post.id}
                          commentsCount={post.comments}
                        />
                      </CardContent>
                    </Collapse>
                  </Card>
                </Box>
              </ListItem>
              {paginationMeta.has_next &&
                index === posts.length - paginationMeta.page_size && (
                  <Waypoint
                    onEnter={() =>
                      dispatch(
                        getCommunityPosts(
                          paginationMeta.page_number + 1,
                          tags,
                          searchInput
                        )
                      )
                    }
                  ></Waypoint>
                )}
            </React.Fragment>
          ))}
        </List>
      </div>
    );
  } else {
    return <Typography variant="h6">No posts yet</Typography>;
  }
}
