import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import thumbs_up from "../../thumbs_up.png";
import * as fp from "fingerpose";
import "@tensorflow/tfjs-backend-webgl";

import { drawHand } from "./drawfunction";
import { setWebGLContext } from "@tensorflow/tfjs-backend-webgl";

var teste = ""

function HandTrack() {
  const [text, setText] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const images = { thumbs_up: thumbs_up };

  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load();
      console.log("ok");
      setInterval(() => detect(net), 100);
    };

    runHandpose();
  }, []);

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoHeight = webcamRef.current.video.videoHeight;
      const videoWidth = webcamRef.current.video.videoWidth;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      console.log(hand);


      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([fp.Gestures.ThumbsUpGesture]);

        const gesture = await GE.estimate(hand[0].landmarks, 4);
        console.log(gesture);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );

          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );

          if (GE) {
            setText("Teste")
          }
        }
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        {text !== null ? (
          <p>{text}</p>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}
export default HandTrack;
