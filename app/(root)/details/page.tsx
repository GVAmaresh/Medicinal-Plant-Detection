"use client";
import React from "react";
import DetailCard from "./Details";
interface Plant {
  id: number;
  question: string;
  answer: string;
  default_image: { original_url: string }
}
export default function Details() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<Plant[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://perenual.com/api/article-faq-list?key=sk-EYOi65cfc24312d7a4220",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setContent(data.data);
        console.log(data.data[0]);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mt-10 ml-10 w-11/12 font-bold text-3xl border-b-2 md:w-1/2 py-3 md:ml-44 ">
        Information about Indian plants
      </div>
      <div className="flex flex-col items-center mt-6 mb-20">
        {content.map((e) => (
          <DetailCard
          key={e.id}
            name={e.question}
            image={e.default_image ? e.default_image.original_url : ''}
            description={e.answer}
          />
        ))}
      </div>
    </>
  );
}
