"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Profile } from "@components";
import { Prompt } from "@app/api/prompt/route";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Prompt[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const email = session?.user?.email;
      const res = await fetch(`/api/users/${email}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, [session]);

  const handleEdit = async (post: Prompt) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: Prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if(!hasConfirmed) return;
    try {
      await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
      setPosts((prev) => prev.filter((p) => p._id !== post._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personal profile page."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
