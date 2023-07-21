"use client";
import { Prompt } from "@app/api/prompt/route";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

interface PromptCardProps {
  post: Prompt;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: Prompt) => void;
  handleDelete?: (post: Prompt) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const { data: session } = useSession();
  const [isCopied, setIsCopied] = useState("");
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setIsCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setIsCopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image
            src={
              isCopied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt} </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag as string)}
      >
        {post.tag}
      </p>
      {session?.user?.email === post.creator.email && pathName===('/profile')  && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={()=>handleEdit && handleEdit(post)}>Edit</p>
          <p className="font-inter text-sm oorange_gradient cursor-pointer" onClick={()=>handleDelete && handleDelete(post)}>Delete</p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
