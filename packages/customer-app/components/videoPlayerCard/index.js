export default function VideoPlayerCard(props) {
  const {
    altText,
    thumbnail,
    video_description,
    video_duration,
    video_link,
    video_name,
    onClick,
  } = props;
  return (
    <div style={{ borderTop: "1px solid #D6D6D6" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div width="100px" height="100px">
          <img
            src={thumbnail}
            alt={altText}
            onClick={onClick}
            width="90px"
            height="90px"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "10px",
            flexDirection: "column",
            marginRight: "5px",
          }}
        >
          <h3
            style={{
              marginBottom: "0",
              marginTop: "15px",
              color: "#C73B5C",
              fontSize: "18px",
              fontFamily: "Poppins",
            }}
            onClick={onClick}
          >
            {video_name}
          </h3>
          <span>
            <img
              src="/assets/images/studio/playVector.svg"
              alt="playVector"
              style={{ paddingRight: "5px" }}
            />
            <span style={{ fontSize: "10px", margin: "0" }}>
              {video_duration}
            </span>
          </span>
          <h6
            style={{
              padding: "2px 0 15px 0",
              margin: "0",
              fontSize: "9px",
              fontWeight: "400",
              fontFamily: "Poppins",
              color: "#3D3D3D",
            }}
          >
            {video_description}
          </h6>
        </div>
      </div>
    </div>
  );
}
