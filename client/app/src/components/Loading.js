import React from "react";
import loadGif from "../assets/loading.gif";

const Loading = () => {
  return (
    <>
      <div className="loading">
        <div style={{justifyContent: "center"}}>
          <img src={loadGif} alt="Loading Animation" />
        </div>
      </div>
    </>
  );
};

export default Loading;