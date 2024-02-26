"use client";
import { useEffect, useState } from "react";
import React from "react";
import AibotCard from "./AIBot";
import SearchBar from "./SearchBar";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (newPrompt: string) => {
    console.log(newPrompt);
    setPrompt(newPrompt);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (prompt === "") return;
      try {
        const response = await fetch("http://localhost:8000/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: prompt }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setContent(data.bot);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setPrompt("");
    setContent("");
  }, [prompt]);

  return (
    <div className="">
      <div className=" mt-40 md:mt-20 mb-2 ">
        <h1 className="w-full text-center font-bold text-3xl md:text-5xl md:mb-14  ">
          An AI Based Student <span className="text-indigo-700">Bot</span>
        </h1>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="">
          {loading ? (
            <AibotCard answer={content} />
          ) : (
            <>
              {content.length === 0 ? (
                <AibotCard answer={content} />
              ) : (
                <AibotCard answer={content} />
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col items-center ml-10">
          <div className="mt-12">
            <SearchBar handleSubmit={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
