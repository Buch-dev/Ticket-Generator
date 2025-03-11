import { useState } from "react";
import "./App.css";
import ElementTopMobileIcon from "./components/BgElementTopMobile";
import BgLinesIcon from "./components/BgLines";
import CirclesIcon from "./components/Circles";
import LogoIcon from "./components/Logo";
import CloudUploadIcon from "./components/CloudUpload";
import InfoIcon from "./components/InfoIcon";
import BgPathIcon from "./components/BgPathMobile";

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

      <h2 className="text-white text-3xl font-extrabold leading-[33px] text-center mt-10">
        Your Journey to Coding Conf 2025 Starts Here!
      </h2>
      <p className="text-[#D1D0D5] text-[20px] mt-5 font-medium text-center leading-[24px]">
        Secure your spot at next year’s biggest coding conference.
      </p>

      {/* Upload */}
      <form className="mt-10 flex flex-col w-full gap-6">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="avatar"
            className="text-white text-[20px] font-medium"
          >
            Upload Avatar
          </label>
          <div className="relative border border-white border-dashed p-3 rounded-xl bg-[#8784A5]/5">
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleAvatarUpload}
              className="text-white absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              required
            />
            <div className="flex justify-center ">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full"
                />
              )}{" "}
              {/* Display the preview image */}
              <div className="flex flex-col items-center justify-center">
                <CloudUploadIcon />
                <p className="text-[18px] text-[#D1D0D5]">
                  Drag and drop or click to upload
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <InfoIcon />
            <p className="text-[#D1D0D5] text-xs">
              Upload your photo (JPG or PNG, max size: 500KB).
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="text-white text-[20px] font-medium">
            Full name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border border-white p-4 rounded-xl bg-[#8784A5]/5 text-[#D1D0D5] text-[20px]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-white text-[20px] font-medium">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="example@email.com"
            className="border border-white p-4 rounded-xl bg-[#8784A5]/5 text-[#D1D0D5] text-[20px]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="text-white text-[20px] font-medium">
            Github Username
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="@yourusername"
            className="border border-white p-4 rounded-xl bg-[#8784A5]/5 text-[#D1D0D5] text-[20px]"
          />
        </div>
        <button className="bg-[#F57463] text-[#0D082D] text-[20px] font-extrabold py-4 rounded-xl mb-[113.91px] z-10">
          Generate My Ticket
        </button>
      </form>
    </div>
  );
}

export default App;
