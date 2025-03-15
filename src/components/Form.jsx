import React, { useState } from "react";
import CloudUploadIcon from "./CloudUpload";
import InfoIcon from "./InfoIcon";
import usePersistedState from "../hooks/usePersistedSate";
import axios from "axios";

const Form = ({
  handleSubmitButton,
  validateForm,
  errors,
  setFullName,
  setEmail,
  setUsername,
  fullName,
  email,
  username,
  handleAvatarUpload,
  avatarUrl,
  previewUrl,
  setPreviewUrl,
}) => {
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setPreviewUrl(URL.createObjectURL(file)); // Set the preview URL for the selected file
    handleAvatarUpload(e); // Call the handleAvatarUpload function passed as a prop
  };

  return (
    <form
      className="mt-10 flex flex-col w-full gap-6 md:w-[522px] md:mt-[45px] lg:w-[460px]"
      onSubmit={handleSubmitButton}
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="avatar" className="text-white text-[20px] font-medium">
          Upload Avatar
        </label>
        <div className="relative border border-white border-dashed p-3 rounded-xl bg-[#8784A5]/5">
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={handleAvatarChange}
            className="text-white absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            required
          />
          <div className="flex justify-center ">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Avatar"
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <CloudUploadIcon />
                <p className="text-[18px] text-[#D1D0D5]">
                  Drag and drop or click to upload
                </p>
              </div>
            )}
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
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          aria-required="true"
          className="border border-white p-4 rounded-xl bg-[#8784A5]/5 text-[#D1D0D5] text-[20px] z-10"
        />
        {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="email" className="text-white text-[20px] font-medium">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required="true"
          placeholder="example@email.com"
          className="border border-white p-4 rounded-xl bg-[#8784A5]/5 text-[#D1D0D5] text-[20px] z-10"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="github" className="text-white text-[20px] font-medium">
          Github Username
        </label>
        <input
          type="text"
          name="github"
          id="github"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@yourusername"
          className="border border-white p-4 rounded-xl bg-[#8784A5]/5 text-[#D1D0D5] text-[20px] z-10"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>
      <button className="bg-[#F57463] text-[#0D082D] text-[20px] font-extrabold py-4 rounded-xl mb-[113.91px] z-10">
        Generate My Ticket
      </button>
    </form>
  );
};

export default Form;
