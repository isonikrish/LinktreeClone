"use client"; // Ensuring this is a client-side component
import Links from "@/Components/Links";
import LinktreeBox from "@/Components/LinktreeBox";
import { useAuth } from "@/Contexts/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function Page() {
  const { linktree, fetchLinktree } = useAuth();

  return (
    <div>
      <Toaster />
      <div className="py-3">
        {linktree ? (
          <div className="w-[800px] mx-3 flex flex-col items-center justify-center">
            <LinktreeBox />
            {linktree.links.map((link, index) => {
              return (
                <Links
                  title={link?.title}
                  url={link?.url}
                  id={link?._id}
                  key={index}
                  linktreeId={linktree._id}
                  isVisible={link?.isVisible}
                  fetchLinktree={fetchLinktree}
                />
              );
            })}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Page;
