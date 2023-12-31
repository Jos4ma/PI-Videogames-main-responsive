import React from 'react'
import {Link} from 'react-router-dom'
import style from './Card.module.css' 


export default function Card({id, name, image, genders}){
    var genres = genders.toString()
    //console.log(genders)
    return (
        <div className={style.card} key={id}>
            <h3 className={style.name}>{name}</h3>
                {/* {genders?.reduce((genres,i)=>(  */}
                <h5 key={id} className={style.type}>{genres}</h5>
                {/* ))}           */}
                <Link to={`/detail/${id}`}>
                    <button className={style.button}>Videogame individual info</button>
                </Link>
                {id.length<14?<img src={image} alt="img not found" className={style.urlImg} />:   
                <img src={image} alt="img not found" className={style.urlImg2} />}
        </div> 
    )
}