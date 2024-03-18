import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-final-form";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { getCommunityTags, createCommunityPosts } from "@/utils/ApiUtils";
import { saveSuccess } from "@/actions/community.action";
import * as constant from "@/constants/index";
import Router from "next/router";
import { TextField } from "mui-rff";
import { FORM_ERROR } from "final-form";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import AvaImage from "@/components/v1/Image";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
  images: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  imageChip: {
    marginTop: theme.spacing(0.5),
  },
}));

export default function CreatePost() {
  const classes = useStyles();
  const [content, setContent] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [tagName, setTagName] = React.useState("");
  const [searchedTag, setSearchedTag] = React.useState([]);
  const profile = useSelector((store) => store.profileReducer.profile);

  const searchTags = async (tagName) => {
    setLoading(true);
    const tagsData = await getCommunityTags(null, tagName);
    setTags([
      ...new Map(
        [...tagsData.data, ...tags].map((item) => [item.id, item])
      ).values(),
    ]);
    setSearchedTag([tagName, ...searchedTag]);
    setLoading(false);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.content) {
      errors.content = "Required";
    }
    if (values.content?.trim().length < 30) {
      errors.content = "Minimum 30 characters required";
    }
    if (!selectedTags || selectedTags.length == 0) {
      errors.selectedTags = "Required";
    }
    return errors;
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!searchedTag.includes(tagName)) {
        searchTags(tagName);
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [tagName]);

  const handleAttachmentChange = (event) => {
    const files = event.target.files;
    const imageList = [...files];
    setImages(imageList);
  };

  const handleImageDelete = (imageToDelete) => () => {
    setImages((chips) =>
      chips.filter((chip) => chip.name !== imageToDelete.name)
    );
  };

  const handleFocus = () => {
    if (!(profile && profile.user)) {
      Router.push({
        pathname: constant.URL_LOGIN,
        query: { redirectTo: constant.URL_COMMUNITY_SHARE_POST },
      });
    }
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }
    const selectedTagIds = selectedTags.map((tag) => tag.id);
    formData.append("content", values.content);
    formData.append("tags", selectedTagIds);
    try {
      const res = await createCommunityPosts(formData);
      console.log("res for create community posts", res.status);
      dispatch(saveSuccess(res));
      await Router.push(constant.URL_COMMUNITY);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        Router.push({
          pathname: constant.URL_LOGIN,
          query: { redirectTo: constant.URL_COMMUNITY_SHARE_POST },
        });
      } else {
        return { [FORM_ERROR]: error.message };
      }
    }
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <AvaImage src={profile?.user?.image_url} />
        </div>
        <div style={{ padding: "0px 12px", flexGrow: 1 }}>
          {profile?.user?.name}
        </div>
      </div>
      <Form
        subscription={{
          submitting: true,
          pristine: true,
          errors: true,
          submitError: true,
        }}
        onSubmit={onSubmit}
        initalValue={{ content: "" }}
        validate={validate}
        render={({ handleSubmit, submitting, errors, submitError }) => (
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <br></br>
            <TextField
              label="Share you story"
              placeholder="Question"
              name="content"
              rows={4}
              required={true}
              inputProps={{
                min: 10,
              }}
              onFocus={handleFocus}
              multiline
              variant="outlined"
            />
            <br></br>
            <Autocomplete
              multiple
              required={true}
              open={open}
              includeInputInList
              filterSelectedOptions
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionSelected={(option, value) => option.name === value.name}
              options={tags}
              getOptionLabel={(option) => option.name}
              loading={loading}
              onChange={(event, newValue) => {
                setSelectedTags(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setTagName(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Tags"
                  placeholder="Tags"
                  name="selectedTags"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            <br></br>
            {images.length == 0 && (
              <Box mt={2}>
                <input
                  accept="image/jpeg,image/png"
                  className={classes.input}
                  style={{ display: "none" }}
                  id="attachment-button-input"
                  multiple
                  type="file"
                  onChange={handleAttachmentChange}
                />
                <label htmlFor="attachment-button-input">
                  <Button
                    variant="contained"
                    className={classes.addImageButton}
                    aria-label="attachment"
                    color="primary"
                    component="span"
                    startIcon={<PhotoCameraIcon />}
                  >
                    Add Images
                  </Button>
                </label>
              </Box>
            )}
            <Box mt={2} className={classes.images}>
              {images.map((image) => (
                <Chip
                  key={image.name}
                  label={image.name}
                  className={classes.imageChip}
                  onDelete={handleImageDelete(image)}
                />
              ))}
            </Box>
            {submitError && (
              <Grid container>
                <Grid item>
                  <Alert severity="error">{submitError}</Alert>
                </Grid>
              </Grid>
            )}
            <Button
              color="primary"
              variant="contained"
              size="large"
              type="submit"
              disabled={submitting || Object.keys(errors).length !== 0}
              className={classes.submitButton}
              classes={{
                root: "gtm-share-your-story",
                label: "gtm-share-your-story",
              }}
            >
              Create Post
            </Button>
          </form>
        )}
      />
    </Container>
  );
}
