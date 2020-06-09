import React, { useState, useEffect, Fragment } from "react";
import Button from "react-bootstrap/Button";
import { ReactMic } from "react-mic";
import { sendAudio } from "../lib/api";

const Tracker = (props) => {
  const [isRecording, setRecording] = useState(false);
  const [blobUrl, setUrl] = useState("");
  const [isBlocked, setPermission] = useState(true);

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setPermission(false);
      },
      () => {
        console.log("Permission Denied");
        setPermission(true);
      }
    );
  }, []);

  let interval;
  const handleStart = () => {
    if (!isBlocked) {
      interval = setInterval(() => {
        setRecording(true);
      }, 20000);
    }
  };

  const handleStop = async (blob) => {
    clearInterval(interval);
    setUrl(blob.blobURL);
    setRecording(false);
    const formData = new FormData();
    formData.append("file", blob.blob);
    sendAudio(formData);
  };

  return (
    <div className="contain">
      <Fragment>
        <ReactMic
          record={isRecording}
          className="sound-wave"
          onStop={(blob) => handleStop(blob)}
          // onData={(data) => console.log(data)}
          mimeType="audio/wav"
          strokeColor="#000000"
          opacity='0'

        />
        <div>
          <Button
            onClick={(event) => handleStart(event)}
            disabled={isRecording}
            variant="dark"
            className="btn"          
            >
           Run
          </Button>

        <Button
          variant="danger"
          onClick={(event) => handleStop(event)}
          disabled={!isRecording}
          >
          Stop
        </Button>
          </div>
        <div>
          <audio src={blobUrl} controls="controls" />
        </div>
      </Fragment>
    </div>
  );
};

export default Tracker;
