import React from "react";
import { PromptCard } from ".";
import { Prompt } from "@app/api/prompt/route";

interface ProfileProps {
  name: string;
  desc: string;
  data: Prompt[];
  handleEdit: (post: Prompt) => void;
  handleDelete: (post: Prompt) => void;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id as unknown as string}
            post={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
