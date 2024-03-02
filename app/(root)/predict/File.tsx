import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";

import FetchApi from "@/lib/fetch/fetchApi";
import type { ApiResponse } from "@/lib/fetch/fetchApi";

import Card from "./Card";

function Predict() {
  const [img, setImg] = useState<string | undefined>("");
  const [details, setDetails] = useState<{
    isUpload: boolean;
    heading?: string;
    confidence?: string;
    information?: string;
  } | null>(null);

  const handleChange = (files: File | null) => {
    if (!files) return console.log("Files not found");
    setImg(URL.createObjectURL(files));
  
    FetchApi(files)
      .then((response: ApiResponse | void) => {
        if (!response) {
          console.error("Response is void");
          return;
        }
  
        const { heading, confidence, information } = response;
        if (!heading || !information || !confidence) {
          setDetails({
            isUpload: true,
            heading: heading || undefined,
            confidence: confidence || undefined,
            information: information || undefined,
          });
        } else {
          setDetails({
            isUpload: true,
            heading,
            confidence,
            information,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className="mt-8 w-full max-w-screen-lg shadow-slate-500">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={["JPG", "PNG"]}
            maxSize={5}
          >
            {details?.isUpload ? (
              <Card
                src={img}
                main={details?.heading}
                confidence={details?.confidence}
                text={details?.information}
              />
            ) : (
              <Card
                src="/images/plant3.png"
                text="Upload or Drag and Drop"
                boxShadow={true}
                bgColor={true}
              />
            )}
          </FileUploader>
        </div>
      </div>
    </>
  );
}

export default Predict;
