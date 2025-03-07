"use client";

import React from "react";
import ProductPage from "@/app/(website)/components/product";

const styles = {
  titleTextColor: "blue",
  rowTitleColor: "blue",
};

const config = {
  // customize the config if needed
};

const productComponent: React.FC = () => {
  return (
    // <div>
      
    //   {/* Add the Messages component here */}
    //   <Messages />

    //   {/* You can add other components like Pagination here */}
    //   {/* <Pagination /> */}
    // </div>

      <div>
      <ProductPage/>
    </div>
  );
};

export default productComponent;
