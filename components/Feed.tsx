"use client";
import React, { useState, useEffect } from "react";
import { PromptCard } from ".";
import { Prompt } from "@app/api/prompt/route";

interface PromptCardProps {
  data: Prompt[];
  handleTagClick: (tag: string) => void;
}


const PromptCardList:React.FC<PromptCardProps> = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout" >
      {data.map((post) => (
        <PromptCard
          key={post._id as unknown as string}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
} 

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }
  , [searchText]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searching for: ", searchText);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <PromptCardList
          data={posts}
          handleTagClick={(tag: string) => console.log("tag clicked: ", tag)}
        />
    </section>
  );
};

export default Feed;
