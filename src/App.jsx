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
  const [avatarUrl, setAvatarUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

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
    const previewUrl = URL.createObjectURL(file); // Set the preview URL for the selected file
    setPreviewUrl(previewUrl);
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
      console.log("Avatar URL set:", response.data.secure_url);
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
        className={`absolute top-[0px] left-[0px] w-[107px] h-[107px] md:w-[217px] md:h-[217px] md:top-[-87px]`}
        loading="lazy"
      />
      <CirclesIcon
        className={`absolute top-[548px] right-[40px] w-[107px] h-[107px] md:w-[217px] md:h-[217px] md:top-[-552px] md:right-[166px]`}
        loading="lazy"
      />
      <ElementTopMobileIcon
        className={`absolute top-[23.86px] right-0 md:w-[232px] h-[108.187px] md:top-[88px] lg:right-[-50px] lg:w-[333px] lg:h-[112px]`}
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
            handleAvatarUpload={handleAvatarUpload}
            avatarUrl={avatarUrl}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
          />
        </>
      )}

      /* Ticket Badge */
        {step === 2 && (
          <>
            <div className="flex flex-col items-center gap-5 md:gap-8">
          <h2 className="text-3xl font-extrabold text-white text-center mt-10 md:text-6xl lg:w-[891px]">
            Congrats, <span className="text-gradient">{fullName.split(" ")[0]}</span>{" "}
            <span className="text-gradient">{fullName.split(" ")[1]}!</span> Your ticket is
            ready.
          </h2>
          <p className="text-[#D1D0D5] text-[20px] font-medium text-center z-10 tracking-tight leading-[120%] md:text-2xl md:w-[514px]">
            We've emailed your ticket to{" "}
            <span className="text-[#F57463]">{email}</span> and will
            send updates in the run up to the event.
          </p>
            </div>

            {/* Ticket Generated */}
          <div className="relative">
            <TicketBgIcon className={`z-10 mb-[291.93px] w-full md:mt-20`} />
            <LogoIcon className={`absolute inset-0 top-[80px] left-[16px] md:scale-150 md:top-[110px] md:left-[63px]`} />
            <p className="text-[#D1D0D5] text-sm leading-[120%] absolute top-[110px] left-[53px] md:text-lg md:top-[145px] md:left-[75px]">
              Jan 31, 2025 / Austin, TX
            </p>
            <p className="text-[#8784A5] text-[22px] font-medium absolute top-[122px] right-[-5px] rotate-90 md:text-3xl md:top-[200px] md:right-[8px]">
              #01609
            </p>
            <div className="flex gap-3 items-center justify-center absolute top-[156px] left-4 md:top-[260px] md:left-5">
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-[45px] h-[45px] rounded-lg md:w-20 md:h-20"
                />
              )}
              <div className="flex flex-col items-start">
                <p className="text-[20px] text-white font-medium md:text-3xl">{fullName}</p>
                <p className="text-sm font-normal text-[#D1D0D5] flex items-center justify-center gap-1 md:text-xl">
                  <GithubIcon /> {username}
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
