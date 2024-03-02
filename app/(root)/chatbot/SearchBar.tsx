"use client";

import { useState } from "react";

const SearchBar = ({ handleSubmit }: { handleSubmit: Function }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClick = () => {
    handleSubmit(query);
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(query);
  };

  return (
    <div className="mt-92">
      <form className="flex w-72 md:w-full " onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Ask Questions"
          value={query}
          onChange={handleInputChange}
          className="border-none px-2 py-2 text-slate-50  rounded-md focus:outline-none focus:ring focus:border-blue-300 mr-3 bg-slate-900 w-96 text-light-1"
        />
        <button
          type="submit"
          className="text-white  px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={handleClick}
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
