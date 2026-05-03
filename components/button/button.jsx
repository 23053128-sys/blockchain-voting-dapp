import style from "./button.module.css";

const button = ({btnName, handleClick, classStyles})=> (
    <button className={style.button} type="button" onClick={handleClick}>
        {btnName}
    </button>
);