"use client";

import React from "react";
import Messages from "@/app/(website)/components/messages";

const styles = {
  titleTextColor: "blue",
  rowTitleColor: "blue",
};

const config = {
  // customize the config if needed
};

const productComponent: React.FC = () => {
  return (
    <div>
      
      {/* Add the Messages component here */}
      <Messages />

      {/* You can add other components like Pagination here */}
      {/* <Pagination /> */}
    </div>
  );
};

export default productComponent;
