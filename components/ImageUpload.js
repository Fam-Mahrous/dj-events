import { useState } from "react";
import { API_URL } from "../config/index";
import classes from "@/styles/Form.module.css";
import { useHttpClient } from "hooks/http-hook";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./LoadingSpinner";

export default function ImageUpload({ eventId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  const { sendRequest, isLoading, error } = useHttpClient();

  const handleUploadingImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", eventId);
    formData.append("field", "image");

    try {
      const data = await sendRequest(`${API_URL}/upload`, "POST", formData, {
        Authorization: `Bearer ${token}`,
      });
      imageUploaded();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className={classes.form}>
      <h1>Upload Event Image</h1>
      <ToastContainer/>
      <form onSubmit={handleUploadingImage}>
        <div className={classes.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        {!isLoading&&<button type="submit" className="btn" disabled={isLoading}>Upload</button>}
       {isLoading&&<button type="submit" className="btn loading-btn" disabled={isLoading}>
          <LoadingSpinner/>
        </button>}
      </form>
    </div>
  );
}
