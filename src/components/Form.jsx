import React from "react";
import CloudUploadIcon from "./CloudUpload";
import InfoIcon from "./InfoIcon";

export default function Form({previewUrl, handleAvatarUpload}) {
  return (
    <form className="mt-10 flex flex-col w-full gap-6 md:w-[522px] md:mt-[45px] lg:w-[460px]">
      <div className="flex flex-col gap-3">
        <label htmlFor="avatar" className="text-white text-[20px] font-medium">
          Upload Avatar
        </label>
        <div className="relative border border-white border-dashed p-3 rounded-xl bg-[#8784A5]/5">
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={handleAvatarUpload}
            className="text-white absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
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
          className="border border-white p-4 rounded-xl bg-[#8784A5]/5 text-[#D1D0D5] text-[20px] z-10"
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
          className="border border-white p-4 rounded-xl bg-[#8784A5]/5 text-[#D1D0D5] text-[20px] z-10"
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
          className="border border-white p-4 rounded-xl bg-[#8784A5]/5 text-[#D1D0D5] text-[20px] z-10"
        />
      </div>
      <button className="bg-[#F57463] text-[#0D082D] text-[20px] font-extrabold py-4 rounded-xl mb-[113.91px] z-10">
        Generate My Ticket
      </button>
    </form>
  );
}
