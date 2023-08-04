import React from "react";
import style from "./Loader.module.css";

export default function Loader() {
  return <div className={style.charge}><div className={style.spinner}>LOADING!</div></div>;
}