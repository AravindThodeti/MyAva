import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Slider from "@material-ui/core/Slider";
import { Button } from "@material-ui/core";
import styles from "./ImageCropper.module.scss";
import { string, object, number, oneOfType, array, func } from "prop-types";
import { LS_ACCESS_TOKEN } from "@ava/common";
import CircularLoader from "../../circularLoader";
import { API_VERSION_URL } from "@ava/common";

const propTypes = {
  /** className added to the component */
  classNameProp: string,
  /** styles added to the component */
  stylesProp: object,
  /** width of the image to be cropped */
  imageWidth: number,
  /** height of the image to be cropped */
  imageHeight: number,
  /** border for the cropper */
  editorBorder: oneOfType([number, array]),
  /**image url for the cropper */
  imageUrl: string,
  /** handle image link function*/
  handleImageLink: func,
  /** handle modal visibility */
  handleVisibility: func,
  folderName:string,
};

const ImageCropper = ({
  classNameProp,
  stylesProp,
  imageWidth,
  imageHeight,
  editorBorder,
  imageUrl,
  handleImageLink,
  handleVisibility,
  folderName
}) => {
  const [editor, setEditor] = useState();
  const [zoomValue, setZoomValue] = useState(1);
  const [rotateValue, setRotateValue] = useState(0);
  const [isUploadingImage, setIsImageUploading] = React.useState(false);
  const uploadImage = async (formData) => {
    const token = localStorage.getItem(LS_ACCESS_TOKEN);
    const response = await fetch(`${API_VERSION_URL}/imageUpload`, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const imageUrl = await response.text();
    handleImageLink(imageUrl);
    setIsImageUploading(false);
    handleVisibility(false);
  };

  const onClickSave = () => {
    setIsImageUploading(true);
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      canvas.toBlob(
        (blob) => {
          const formData = new FormData();
          formData.append("image", blob, folderName+".jpeg");
          formData.append("folder", folderName);
          uploadImage(formData);
        },
        "image/jpeg",
        0.95
      );
    }
  };

  const setEditorRef = (editor) => setEditor(editor);

  const handleChangeZoom = (event, newValue) => {
    setZoomValue(newValue);
  };
  const handleChangeRotate = (event, newValue) => {
    setRotateValue(newValue);
  };

  return (
    <div
      style={stylesProp}
      className={`${styles.imageCropper} ${classNameProp}`}
    >
      <div className={styles.imageCropperContainer}>
        <AvatarEditor
          image={imageUrl}
          width={imageWidth}
          height={imageHeight}
          ref={setEditorRef}
          border={editorBorder}
          color={[0, 0, 0, 0.2]}
          scale={zoomValue}
          rotate={rotateValue}
          className={"recipe-image-cropper"}
          crossOrigin={"anonymous"}
          backgroundColor={"#ffffff"}
        />
      </div>
      <div className={styles.editorControls}>
        <div className={styles.zoom}>
          <div className={styles.zoomValue}>
            <span>Zoom</span>
            <span>{zoomValue}</span>
          </div>
          <Slider
            min={1}
            max={5}
            step={0.1}
            value={zoomValue}
            aria-labelledby="zoom-slider"
            onChange={handleChangeZoom}
          />
        </div>
        <div className={styles.straight}>
          <div className={styles.rotateValue}>
            <span>Rotate</span>
            <span>{rotateValue}</span>
          </div>
          <Slider
            defaultValue={30}
            min={-180}
            max={180}
            step={1}
            aria-labelledby="rotate-slider"
            onChange={handleChangeRotate}
            value={rotateValue}
          />
        </div>
      </div>
      <div className={styles.saveButton}>
        <Button
          style={{
            width: "80px",
            height: "33px",
            textTransform: "none",
            marginRight: "5px",
          }}
          onClick={() => {
            handleVisibility(false);
          }}
          variant="contained"
        >
          Close
        </Button>
        <Button
          style={{ width: "80px", height: "33px", textTransform: "none" }}
          onClick={onClickSave}
          variant="contained"
          color="primary"
        >
          {isUploadingImage ? <CircularLoader color="#ffffff" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};
ImageCropper.propTypes = propTypes;
export default ImageCropper;
