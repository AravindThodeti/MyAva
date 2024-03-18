import React, { useState } from "react";
import { string } from "prop-types";
import styles from "./Notes.module.scss";

const propTypes = {
  /** notes text */
  noteText: string,
};
const NOTES_TEXT_LENGTH = 50;

const Notes = ({ heading,noteText }) => {
  const [directionsTextLength, setDirectionsLength] =
    useState(NOTES_TEXT_LENGTH);
  const [isReadMoreVisible, setIsReadMore] = useState(true);
  const isNotesSeeMoreVisible =
    noteText && isReadMoreVisible && noteText.length > NOTES_TEXT_LENGTH;
  const isNotesReadLessVisible =
    noteText && !isReadMoreVisible && noteText.length > NOTES_TEXT_LENGTH;

  const toggleReadMore = () => {
    setIsReadMore((value) => !value);
    setDirectionsLength(noteText.length);
  };
  const handleClickReadLess = () => {
    setIsReadMore((value) => !value);
    setDirectionsLength(NOTES_TEXT_LENGTH);
  };
  return (
    <div >
      
      <div className={styles.notesText}>
      <span >{heading}{" "} </span>
        {noteText.slice(0, directionsTextLength)}
        {isNotesSeeMoreVisible && "..."}
        {isNotesSeeMoreVisible && (
          <span onClick={toggleReadMore} className={styles.seeMore}>
            Read more
          </span>
        )}
        {isNotesReadLessVisible && (
          <span onClick={handleClickReadLess} className={styles.seeMore}>
            Read less
          </span>
        )}
      </div>
     </div>
  );
};

Notes.propTypes = propTypes;
export default Notes;
