import * as actions from "../actionTypes";
const postInitState = {
  fetchLoading: false,
  paginationMeta: null,
  posts: null,
  fetchError: null,
  saveLoading: false,
  saveError: null,
  
};
const tagInitState = {
  tags: null,
  tagsLoading: false,
  tagsError: null,
  tagsPaginationMeta: null,
};
const INITIAL_STATE = async () => {
  return {
    ...postInitState,
    ...tagInitState
  }
};

export default function communityReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.COMMUNITY_POSTS_RESET:
      return {
        ...state,
        ...postInitState
      };
    case actions.FETCH_COMMUNITY_POSTS_BEGIN:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
      };
    case actions.FETCH_COMMUNITY_POSTS_FAILURE:
      return {
        ...state,
        fetchLoading: false,
        fetchError: action.payload.error,
      };
    case actions.FETCH_COMMUNITY_POSTS_SUCCESS:
      let postList;
      if (!state.posts) {
        postList = [];
      } else {
        postList = [...state.posts];
      }
      postList = [...postList, ...action.payload.res.posts];
      delete action.payload.res.posts;
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        posts: postList,
        paginationMeta: action.payload.res,
      };
    case actions.CREATE_COMMUNITY_POST_BEGIN:
      return {
        ...state,
        saveLoading: true,
        saveError: null,
      };
    case actions.CREATE_COMMUNITY_POST_FAILURE:
      return {
        ...state,
        saveLoading: false,
        saveError: action.payload.error,
      };
    case actions.CREATE_COMMUNITY_POST_SUCCESS:
      let posts;
      if (!state.posts) {
        posts = [];
      } else {
        posts = [...state.posts];
      }
      posts = [action.payload.post, ...posts];
      return {
        ...state,
        posts,
        saveError: null,
        saveLoading: false,
      };
    case actions.UPDATE_LIKE:
      if (state.posts) {
        posts = [...state.posts];
        const index = posts.findIndex(
          (post) => post.id == action.payload.like.post_id
        );
        if (index > -1) {
          posts[index].liked = action.payload.like.liked;
          posts[index].likes = action.payload.like.likes;
        }
        return {
          ...state,
          posts,
        };
      } else {
        return {
          ...state,
        };
      }
    case actions.SAVE_COMMENT:
      if (state.posts) {
        posts = [...state.posts];
        const index = posts.findIndex(
          (post) => post.id == action.payload.post_id
        );
        if (index > -1) {
          posts[index].comments += 1;
          return {
            ...state,
            posts: posts,
          };
        }
      }
    case actions.FETCH_COMMUNITY_TAGS_BEGIN:
      return {
        ...state,
        tagsLoading: true,
        tagsError: null,
      };
    case actions.FETCH_COMMUNITY_TAGS_FAILURE:
      return {
        ...state,
        tagsLoading: false,
        tagsError: action.payload.error,
      };
    case actions.FETCH_COMMUNITY_TAGS_SUCCESS:
      let tagList;
      if (!state.tags) {
        tagList = [];
      } else {
        tagList = [...state.tags];
      }
      tagList = [...tagList, ...action.payload.res.data];
      delete action.payload.res.data;
      return {
        ...state,
        tagsLoading: false,
        tagsError: null,
        tags: tagList,
        tagsPaginationMeta: action.payload.res,
      };

    default:
      return state;
  }
}
