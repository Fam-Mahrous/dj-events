import { useState } from "react";
import { API_URL } from "../config/index";
import classes from "@/styles/Form.module.css";

export default function ImageUpload({ eventId, imageUploaded ,token}) {
  const [image, setImage] = useState(null);

  const handleUploadingImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", eventId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers:{
        Authorization:`Bearer ${token}`
      },
      body: formData,
    });

    if(res.ok){
        imageUploaded()
    }
    
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className={classes.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleUploadingImage}>
        <div className={classes.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
