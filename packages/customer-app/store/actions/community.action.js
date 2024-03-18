import * as actions from "../actionTypes";

export const begin = () => ({
  type: actions.FETCH_COMMUNITY_POSTS_BEGIN,
});

export const resetPosts = () => ({
  type: actions.COMMUNITY_POSTS_RESET,
});

export const success = (res) => ({
  type: actions.FETCH_COMMUNITY_POSTS_SUCCESS,
  payload: {
    res,
  },
});

export const failure = (error) => ({
  type: actions.FETCH_COMMUNITY_POSTS_FAILURE,
  payload: {
    error,
  },
});

export const saveBegin = () => ({
  type: actions.CREATE_COMMUNITY_POST_BEGIN,
});

export const saveSuccess = (post) => ({
  type: actions.CREATE_COMMUNITY_POST_SUCCESS,
  payload: {
    post,
  },
});

export const saveFailure = (error) => ({
  type: actions.CREATE_COMMUNITY_POST_FAILURE,
  payload: {
    error,
  },
});

export const updateLike = (like) => ({
  type: actions.UPDATE_LIKE,
  payload: {
    like,
  },
});

export const saveComment = (postId) => ({
  type: actions.SAVE_COMMENT,
  payload: {
    post_id: postId,
  },
});

export const tagsBegin = () => ({
  type: actions.FETCH_COMMUNITY_TAGS_BEGIN,
});

export const tagsFailure = (error) => ({
  type: actions.FETCH_COMMUNITY_TAGS_FAILURE,
  payload: {
    error,
  },
});

export const tagsSuccess = (res) => ({
  type: actions.FETCH_COMMUNITY_TAGS_SUCCESS,
  payload: {
    res,
  },
});
