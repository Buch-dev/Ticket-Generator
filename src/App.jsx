import { useState } from "react";
import "./App.css";
import ElementTopMobileIcon from "./components/BgElementTopMobile";
import BgLinesIcon from "./components/BgLines";
import CirclesIcon from "./components/Circles";
import LogoIcon from "./components/Logo";
import BgPathIcon from "./components/BgPathMobile";
import Form from "./components/Form";
import Container from "./components/Container";
import BgLinesTabletIcon from "./components/BgLinesTablet";
import BgLinesDesktopIcon from "./components/BgLinesDesktop";
import TicketBgIcon from "./components/TicketBg";
import GithubIcon from "./components/Github";
import usePersistedState from "./hooks/usePersistedSate";
import axios from "axios";

function App() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const validateForm = () => {
    const newErrors = {};
    console.log("validating form...");
    console.log("fullName", fullName);
    console.log("email", email);
    console.log("username", username);

    if (step === 1) {
      /* Validate fields for step 1 */
      if (!fullName) {
        newErrors.fullName = "Full name is required";
      }
      if (!email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email address is invalid";
      }
      if (!username) {
        newErrors.username = "Github username is required";
      }
    }

    setErrors(newErrors);
    console.log("Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    console.log("Submitted");
    if (validateForm()) {
      console.log("Validation passed");
      setStep(step + 1);
    } else {
      console.log("Validation failed", errors);
    }
  };

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
      className="flex flex-col items-center justify-center p-4 md:p-5 bg-cover bg-no-repeat relative overflow-hidden"
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

      {step === 1 && (
        <>
          {/* Container */}
          <Container />
          {/* Upload */}
          <Form
            handleSubmitButton={handleSubmitButton}
            validateForm={validateForm}
            errors={errors}
            setFullName={setFullName}
            setEmail={setEmail}
            setUsername={setUsername}
            fullName={fullName}
            email={email}
            username={username}
          />
        </>
      )}

      {/* Ticket Badge */}
      {step === 2 && (
        <>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-extrabold text-white text-center mt-10">
              Congrats, <span className="text-gradient">Jonatan</span>{" "}
              <span className="text-gradient">Kristof!</span> Your ticket is
              ready.
            </h2>
            <p className="text-[#D1D0D5] text-[20px] font-medium text-center z-10 tracking-tight leading-[120%]">
              We've emailed your ticket to{" "}
              <span className="text-[#F57463]">jonatan@email.com</span> and will
              send updates in the run up to the event.
            </p>
          </div>

          {/* Ticket Generated */}
          <div className="relative">
            <TicketBgIcon className={`z-10 mb-[291.93px] w-full`} />
            <LogoIcon className={`absolute inset-0 top-[80px] left-[16px]`} />
            <p className="text-[#D1D0D5] text-sm leading-[120%] absolute top-[110px] left-[53px]">
              Jan 31, 2025 / Austin, TX
            </p>
            <p className="text-[#8784A5] text-[22px] font-medium absolute top-[122px] right-[-5px] rotate-90">
              #01609
            </p>
            <div className="flex gap-3 items-center justify-center absolute top-[156px] left-4">
              <img src="./avatar-ticket.png" alt="avatar" />
              <div className="flex flex-col">
                <p className="text-[20px] text-white font-medium">
                  Jonatan Kristof
                </p>
                <p className="text-sm font-normal text-[#D1D0D5] flex items-center justify-center gap-1">
                  <GithubIcon /> @jonatankristof0101
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
