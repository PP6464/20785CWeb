import "./loading.css";
import React from "react";

interface LoadingProps {
  size: string; // size of animation
  color: string; // whether or not to use dark text and logo
  inAppBar: boolean; // whether or not this is in the app bar
}

function Loading(props: LoadingProps) {
  return (
    <div id="loading-container" style={!props.inAppBar ? { zIndex: "0" } : {}}>
      <h1 style={{ fontSize: `min(${props.size}, 100px)`, color: props.color }}>
        2
      </h1>
      <img
        style={{ height: `min(${props.size}, 100px)` }}
        src={
          props.color === "black"
            ? "/assets/logo.png"
            : "/assets/logo-light.png"
        }
        alt="GEAR"
      />
      <h1 style={{ fontSize: `min(${props.size}, 100px)`, color: props.color }}>
        785C
      </h1>
    </div>
  );
}

export default Loading;
