import React from "react";

const Card = ({ className, children }:{[key:string]:any}) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
