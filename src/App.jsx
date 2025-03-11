import { useState } from "react";
import "./App.css";
import ElementTopMobileIcon from "./components/BgElementTopMobile";
import BgLinesIcon from "./components/BgLines";
import CirclesIcon from "./components/Circles";
import LogoIcon from "./components/Logo";
import CloudUploadIcon from "./components/CloudUpload";
import InfoIcon from "./components/InfoIcon";
import BgPathIcon from "./components/BgPathMobile";
import Form from "./components/Form";
import Container from "./components/Container";

function App() {
  const [previewUrl, setPreviewUrl] = useState("");

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    setPreviewUrl(URL.createObjectURL(file)); // Set the preview URL for the selected file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_buch_preset"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcyhuwujh/image/upload",
        formData
      ); // Replace with your Cloudinary cloud name
      setAvatarUrl(response.data.secure_url);
      localStorage.setItem("avatarUrl", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-5 bg-cover bg-no-repeat relative"
      style={{ backgroundImage: "url('./Background.png')" }}
    >
      <CirclesIcon className={`absolute top-[-30px] left-[-14px]`} />
      <ElementTopMobileIcon className={`absolute top-[23.86px] right-0`} />
      <BgLinesIcon className={`absolute top-0`} />
      <LogoIcon className={`mt-[33px]`} />
      <BgPathIcon className={`absolute bottom-0 left-0`} />
      
      {/* Container */}
      <Container />

      {/* Upload */}
      <Form previewUrl={previewUrl} handleAvatarUpload={handleAvatarUpload} />
    </div>
  );
}

export default App;
