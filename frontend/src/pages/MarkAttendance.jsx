import { useRef, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function MarkAttendance() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState("");
  const [location, setLocation] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = stream;
  };

  const captureFace = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, 400, 300);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);

    alert("Face captured successfully");
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const loc =
        position.coords.latitude + "," + position.coords.longitude;

      setLocation(loc);
      alert("Location captured");
    });
  };

  const submitAttendance = async () => {
    try {
      const res = await API.post("/mark-attendance/", {
        user_id: user.id,
        captured_image: capturedImage,
        location: location,
      });

      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-8">
        <h2 className="text-3xl font-bold mb-2">Mark Attendance</h2>
        <p className="text-gray-500 mb-8">
          Capture face and verify attendance using AI.
        </p>

        <div className="bg-white p-8 rounded-3xl shadow-sm max-w-3xl">
          <video
            ref={videoRef}
            autoPlay
            className="w-[400px] h-[300px] bg-black rounded-2xl"
          ></video>

          <canvas ref={canvasRef} className="hidden"></canvas>

          <div className="flex gap-4 mt-6">
            <button
              onClick={startCamera}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
            >
              Start Camera
            </button>

            <button
              onClick={captureFace}
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Capture Face
            </button>

            <button
              onClick={getLocation}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl"
            >
              Get Location
            </button>

            <button
              onClick={submitAttendance}
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Submit
            </button>
          </div>

          {capturedImage && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Captured Preview</h3>
              <img
                src={capturedImage}
                className="w-48 rounded-xl border"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}