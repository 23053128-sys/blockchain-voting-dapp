import React, {useContext} from "react";

import Style from "./input.module.css";
const input = ({ inputType, title, placeholder, handleClick  }) => {
  return (
    <div className={Style.input}>
        <p>{title}</p>
        {inputType === "text" ? (
          <div className={Style.input_box}>
            <input type="text" placeholder={placeholder} onChange={handleClick}/>
          </div>
        ) : (
          <div></div>
        )}
    </div>
  );
};
  
export default input;