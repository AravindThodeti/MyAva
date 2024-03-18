import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  DateTimeInput,
} from "react-admin";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import EditIcon from "@material-ui/icons/Edit";
import CropperModal from "../../recipe/Modal";
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

  const LiveSessionCreate = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState("");
   const [imageLink, setImageLink] = React.useState("");
    const imageRef = React.useRef();
    imageRef.current = imageLink;
    const transform = (data) => {
      if(data.thumbnail){
        imageRef.current = data.thumbnail;
      }
      return {
        ...data,
        thumbnail: imageRef.current,
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
          imageHeight={360} 
        imageWidth={360}
        folderName="LiveSession"
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
            <TextInput source="session_link" 
            lable="session link" 
            validate={required()} />
            <DateTimeInput
              source="session_starts_at"
              lable="session starts at"
              validate={required()}
            />
            <DateTimeInput
              source="session_ends_at"
              lable="session ends at"
              validate={required()}
            />
            <TextInput
              validate={required()}
              source="activity_type"
              lable="session name"
            />
              <TextInput
              source="about_expert"
              lable="about expert"
              multiline 
              fullWidth
            />
               <TextInput
              source="description"
              multiline 
              fullWidth
            />
               <TextInput
               lable="Speaker Name"
              validate={required()}
              source="organizer_name"
              
            />
          </SimpleForm>
        </Create>
      </>
    );
  };
  export default LiveSessionCreate;