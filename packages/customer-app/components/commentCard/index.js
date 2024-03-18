export default function CommentCard(props) {
  const { comment, number_of_replies, user_name } = props;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "20px" }}>
        <img src="/assets/images/studio/commentLogo.svg" alt="comment_Logo" />
      </div>
      <div>
        <h5 style={{ marginBottom: "4px" }}>{user_name}</h5>
        <p style={{ margin: "0", fontSize: "12px", fontWeight: "600" }}>
          {comment}
        </p>
        {/* <span style={{ fontSize: "11px" }}>{number_of_replies} Replay </span> */}
      </div>
    </div>
  );
}
