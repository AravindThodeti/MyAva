import { useRecordContext } from "react-admin";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import CropperModal from "../Modal";
import { func, string,number } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
const propTypes = {
  /** function to update the image link in parent component */
  setImageLink: func,
  /** image url */
  imageLink: string,
  imageHeight:number,
  imageWidth:number,
  folderName:string
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

const ImageField = ({ setImageLink, imageLink,imageHeight,imageWidth,folderName }) => {
  const classes = useStyles();
  const record = useRecordContext();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [image_url, setImageUrl] = React.useState("a");

  const handleClickEdit = () => {
    setFile(imageLink);
    handleOpen();
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

  React.useEffect(() => {
    if(record?.image_url){
      setImageUrl(record.image_url)
    }
    if(record?.thumbnail){
      setImageUrl(record.thumbnail)
    }
    setImageLink(image_url);
  }, [image_url, setImageLink]);

  if (!record) return null;

  return (
    <>
      <CropperModal
        open={open}
        handleClose={handleClose}
        file={file}
        handleImageLink={setImageLink}
        handleVisibility={setOpen}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        folderName={folderName}
      />
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
    </>
  );
};
ImageField.propTypes = propTypes;
export default ImageField;
