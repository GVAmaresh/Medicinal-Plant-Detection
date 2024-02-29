"use client"
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";

import FetchApi from "@/lib/fetch/fetchApi";
import Card from "./Card";

function Predict() {
  const [img, setImg] = useState<undefined | string>("")
  const [details, setDetails] = useState<{isUpload:boolean, heading: string|undefined, confidence: string|undefined, information: string|undefined } | null>(null);

  const handleChange = (files: File | null) => {
    if (!files) return console.log("Files not found");
    setImg(URL.createObjectURL(files))

    FetchApi(files)
      .then(({ heading, confidence, information }) => {
        if(!heading || !information || !confidence) return setDetails({isUpload:true,heading: "Error in the File", confidence:"",information:"" });
        setDetails({isUpload:true, heading, confidence, information });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="mt-8 w-full max-w-screen-lg">
          <FileUploader handleChange={handleChange} name="file" types={["JPG", "PNG"]} maxSize={5}>
            {details?.isUpload?<Card src={img} main={details?.heading} confidence={details?.confidence} text={details?.information} />:<Card src="/images/plant3.png" text="Upload or Drag and Drop" boxShadow={true} />}
          </FileUploader>
        </div>
      </div>
    </>
  );
}

export default Predict;
