import React from "react";

const CardContent = ({ children }:{[key:string]:any}) => {
  return <div className="p-6">{children}</div>;
};

export default CardContent;
