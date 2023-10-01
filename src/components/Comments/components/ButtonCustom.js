import React from "react";


const ButtonCustom = ({ title, handleCLick, className }) => {
  return (
    <button
      className={className}
      onClick={handleCLick}
    >
      {title}
    </button>
  )
}


export default ButtonCustom;