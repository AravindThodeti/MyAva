import { TextField, Button } from "@material-ui/core";

export default function AddComment(props) {
  const { commentValue, handleCommentValue, submitComment } = props;

  return (
    <div style={{marginLeft:"70px"}}>
      <TextField
        value={commentValue}
        onChange={handleCommentValue}
        type="text"
        label="Add a comment..."
        variant="standard" 
      />
      <Button
        onClick={submitComment}
        type="submit"
        style={{
          opacity: commentValue.length < 1 ? "0.3" : "1",
        }}
        color="primary"
        disabled={commentValue.length < 1}
      >
        Post
      </Button>
    </div>
  );
}
