import React from "react";

const Avatar = ({ className, children }:{[key:string]:any}) => {
  return (
    <div
      className={`flex items-center justify-center ${className} border-2 border-gray-300 overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default Avatar;
