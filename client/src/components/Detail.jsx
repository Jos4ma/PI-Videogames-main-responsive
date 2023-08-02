import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getDetail, cleaner, cleanDog, deleteVideogame } from '../actions'
import { useParams } from 'react-router'
import style from './Detail.module.css'

export default function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
    //    dispatch(cleaner());
        dispatch(getDetail(id));
    //    dispatch(cleanDog());
      }, [dispatch, id]);

const videogameDetail = useSelector((state) => state.detail);

function handleDelete(e) {
    if (videogameDetail.id.length > 5) {
        e.preventDefault();
        dispatch(deleteVideogame(id));
 //     dispatch(cleaner());
        alert("The pokemon was successfully deleted");
        navigate("/home");
    }
  }
console.log(videogameDetail.genders)
  return (
    <div className={style.fondo}>
    <div className={style.detail}>
        {videogameDetail.id ? ( 
            <div className={style.detail}>
                <div className={style.title}><h2 className={style.h2}>Videogame name: {videogameDetail.name} </h2></div>
                <div className={style.first}>
                  <div className={style.boxPicture}>
                    <img className={style.img} src={videogameDetail.image} alt="Not Found" />        
                  </div>
                  <div className={style.boxInfo}>
                  <div className={style.order}>    
                    <h5 className={style.h5}>ID: {videogameDetail.id} </h5>        
                    <h5 className={style.h5}>RATING: {videogameDetail.rating} </h5>
                    <h5 className={style.h5}>RELEASED: {videogameDetail.released} </h5>
                    {/* {videogameDetail.platforms?.map((platform,i)=>(
                      <h5 key={i} className={style.h5} >{platform}</h5> 
                    ))}  */}
                    <h5 className={style.h5} >PLATFORMS RELATED: {videogameDetail.platforms}</h5>
                    <h5 className={style.h5}>GENRES: {videogameDetail.genders} </h5> 
                  </div>
                    <Link to={"/home"}>
                        <button className={style.button}>HOME</button>
                    </Link>
                    {/* <Link to={"/home"}>
                        <button className={style.button}>DELETE POKEMON</button>
                    </Link> */}
                    {videogameDetail.id.length > 5 ? (
                    <button className={style.button}  onClick={(e) => handleDelete(e)}>
                      DELETE THIS VIDEOGAME
                    </button>
                    ) : null}
                    </div>
                  </div>
                
            </div>         
            ) : (
          <h1 className={style.h1}> Loading... </h1>
       ) }  
    </div>
    </div>
  );
}
