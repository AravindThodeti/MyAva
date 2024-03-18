import React from "react";
import Modal from "@material-ui/core/Modal";
import ImageCropper from "../imageCropper";
import { func, bool, object, oneOfType, string, number } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const propTypes = {
  /** state of the modal */
  open: bool,
  /** function to close the modal */
  handleClose: func,
  /** image file */
  file: oneOfType([object, string]),
  /** handle image link function*/
  handleImageLink: func,
  /** handle modal visibility */
  handleVisibility: func,
  imageHeight:number,
  imageWidth:number,
  folderName:string,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 2),
  },
  root: {
    margin: "10px 0",
  },
  input: {
    display: "none",
  },
}));
const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const CropperModal = ({
  open,
  handleClose,
  file,
  handleImageLink,
  handleVisibility,
  imageHeight,
  imageWidth,
  folderName
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {
        <ImageCropper
          stylesProp={modalStyle}
          classNameProp={classes.paper}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
          folderName={folderName}
          editorBorder={[50, 50]}
          imageUrl={file}
          handleImageLink={handleImageLink}
          handleVisibility={handleVisibility}
        />
      }
    </Modal>
  );
};
CropperModal.propTypes = propTypes;
export default CropperModal;
