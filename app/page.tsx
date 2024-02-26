import Image from "next/image";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Predict from "./(root)/predict/File";
// import Predict from "./(root)/home/page";

export default function Home() {
  // const [file, setFile] = useState<File | null>(null);
  // const handleChange = (file: File) => {
  //   setFile(file);
  // };
  return (
    <>
      <Predict />
    </>
  );
}
