import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  required,
} from "react-admin";
import { getChoices } from "../../utils";

import RichTextInput from "ra-input-rich-text";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import EditIcon from "@material-ui/icons/Edit";
import CropperModal from "./Modal";
import GoodForField from "./goodForField";

export const MEASUREMENT_UNITS = {
  GM: "GM",
  PIECE: "Piece",
  GLASS: "Glass",
  KATORI: "Katori",
  CUP: "Cup",
  BOWL: "Bowl",
  TABLESPOON:"tablespoon"
};
export const RECIPE_PREPARATION_COMPLEXITY = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    margin: "10px 0",
  },
  input: {
    display: "none",
  },
}));

const RecipeCreate = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [imageLink, setImageLink] = React.useState("");
  const [goodForIds, setGoodForIds] = React.useState([]);
  const imageRef = React.useRef();
  imageRef.current = imageLink;
  const goodForRef = React.useRef();
  goodForRef.current = goodForIds;
  const transform = (data) => {
    console.log({ imageRef });
    return {
      ...data,
      image_url: imageRef.current,
      good_for: goodForRef.current,
    };
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeFileInput = (e) => {
    setFile(e.target.files[0]);
    handleOpen();
  };
  const handleClickEdit = () => {
    setFile(imageLink);
    handleOpen();
  };

  return (
    <>
      <CropperModal
        open={open}
        handleClose={handleClose}
        file={file}
        handleImageLink={setImageLink}
        handleVisibility={setOpen}
        imageHeight={150}
        imageWidth={150}
        folderName="recipeImage"
      />
      <Create transform={transform} {...props}>
        <SimpleForm redirect={false}>
          {imageLink && (
            <div
              style={{
                display: "flex",
                width: "100px",
                height: "100px",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <img
                src={imageLink}
                alt="image"
                style={{
                  width: "100px",
                  height: "100px",
                  border: "5px solid #c9c5c5",
                  cursor: "pointer",
                }}
                onClick={handleClickEdit}
              />
              <EditIcon
                onClick={handleClickEdit}
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  right: "-10px",
                  bottom: "-10px",
                  backgroundColor: "#c9c5c5",
                  fontSize: "1.2rem",
                }}
              />
            </div>
          )}
          <div className={classes.root}>
            <input
              accept=".png, .jpg, .jpeg"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChangeFileInput}
            />
            <label htmlFor="contained-button-file">
              <Button
                style={{ textTransform: "none" }}
                startIcon={<CloudUploadIcon />}
                variant="contained"
                color="primary"
                component="span"
              >
                {imageLink ? "Upload new" : "Upload picture"}
              </Button>
            </label>
          </div>
          <TextInput source="name" validate={required()} />
          <SelectInput
            source="measurement_unit"
            lable="Measurement Unit"
            choices={getChoices(MEASUREMENT_UNITS)}
            validate={required()}
          />
          <TextInput validate={required()} source="description" multiline />
          <RichTextInput source="recipe" validate={required()} />
          <TextInput
            validate={required()}
            source="preparation_time"
            lable="Preparation time"
          />

          <SelectInput
            validate={required()}
            source="preparation_complexity"
            label="Preparation Complexity"
            choices={getChoices(RECIPE_PREPARATION_COMPLEXITY)}
          />
          <GoodForField goodForIds={goodForIds} setGoodForIds={setGoodForIds} />
          <NumberInput validate={required()} source="calories" />
          <NumberInput validate={required()} source="carbs" />
          <NumberInput validate={required()} source="protein" />
          <NumberInput validate={required()} source="fats" />
          <NumberInput validate={required()} source="fibre" />
          <TextInput source="preparation_video_link" label="Video url" />
        </SimpleForm>
      </Create>
    </>
  );
};

export default RecipeCreate;
