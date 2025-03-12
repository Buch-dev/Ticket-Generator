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
import BgLinesTabletIcon from "./components/BgLinesTablet";
import BgLinesDesktopIcon from "./components/BgLinesDesktop";

function App() {
  const [step, setStep] = useState(1);
  const [previewUrl, setPreviewUrl] = useState("");
  const [ticketDisplay, setTicketDisplay] = useState(false)

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

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
  const backgroundImage = isMobile
    ? "url('./Background.png')"
    : isTablet
    ? "url('./Background-tablet.png')"
    : "url('./Background-desktop.png')";

  return (
    <div
      className="flex flex-col items-center justify-center p-5 bg-cover bg-no-repeat relative"
      style={{ backgroundImage }}
    >
      <CirclesIcon
        className={`absolute top-[-30px] left-[-14px]`}
        loading="lazy"
      />
      <ElementTopMobileIcon
        className={`absolute top-[23.86px] right-0`}
        loading="lazy"
      />
      <BgLinesIcon
        className={`absolute top-0 md:hidden lg:hidden`}
        loading="lazy"
      />
      <BgLinesTabletIcon
        className={`hidden md:block absolute md:top-0 lg:hidden`}
        loading="lazy"
      />
      <BgLinesDesktopIcon
        className={`hidden lg:block lg:absolute lg:top-0`}
        loading="lazy"
      />
      <LogoIcon className={`mt-[33px]`} loading="lazy" />
      <BgPathIcon className={`absolute bottom-0 left-0`} loading="lazy" />

      {/* Container */}
      <Container />

      {/* Upload */}
      <Form previewUrl={previewUrl} handleAvatarUpload={handleAvatarUpload} />

      {/* Ticket Badge */}
      <h2 className="text-3xl font-extrabold text-white">Congrats, <span className="text-gradient">Jonatan Kristof!</span> Your ticket is ready.</h2>
    </div>
  );
}

export default App;
