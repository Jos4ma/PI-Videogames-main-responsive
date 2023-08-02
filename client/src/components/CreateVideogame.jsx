import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAllGenres, getAllVideogames, postVideogame } from "../actions";
import style from "./CreateVideogame.module.css";


export default function CreateVideogame() {
  //const defaultImage = 'https://media.gettyimages.com/photos/pickachu-toy-character-from-pokemon-anime-picture-id534195339'   
  const defaultImage = 'https://www5.minijuegosgratis.com/v3/games/thumbnails/222662_1.jpg'
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  //const temperament = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const genres = useSelector((state) => state.allGenres)
  const video = useSelector((state) => state.videogames)
  var setArr = []
  
  video.map((e) => e.platforms?.split(",").map((e) => setArr.push(e.trim())));
  let newData = [...new Set(setArr)]

  var valor = newData.map( (e,index) =>{
    return {
        id: index,
        name: e,
    }
  })


  let [input, setInput] = useState({
    name: "",
    released: "",
    description: "",
    image: "",
    genres: [],
    platforms: [],
  });

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length === 0 ) {
      // input.name = input.name.charAt(0).toUpperCase()+input.name.slice(1)
      if (!input.image) input.image=defaultImage
      input.genres = input.genres.toString()
      input.platforms = input.platforms.toString()
      dispatch(postVideogame(input));
      alert("¡Videogame successfully created!");
      navigate("/home");
    } else {
      alert(
        "All information about the new videogame must be completed and valid, also you have to select a gender"
      );
    }
  }

  function handleSelectGenres(e) {
    if (input.genres.length < 4) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
      let temps = input.genres;
  
      let findTemp = temps.indexOf(e.target.value);
      if (findTemp >= 0) {
        temps.splice(findTemp, 1);
      } else {
        temps.push(e.target.value);
      }
      temps.toString()
      setInput({
        ...input,
        genres: temps,
      });
    } else {
      alert("You can only select 4 genres");
    }
  }

  function handleSelectPlatforms(e) {
    if (input.platforms.length < 4) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
      let temps = input.platforms;
  
      let findTemp = temps.indexOf(e.target.value);
      if (findTemp >= 0) {
        temps.splice(findTemp, 1);
      } else {
        temps.push(e.target.value);
      }
      temps.toString()
      setInput({
        ...input,
        platforms: temps,
      });
    } else {
      alert("You can only select 4 platforms");
    }
  }

  function handleDeleteGenres(e) {
    setInput({
      ...input,
      genres: input.genres.filter((el) => el !== e),
    });
  }

  function handleDeletePlatforms(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((el) => el !== e),
    });
  }

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllVideogames());
  }, [dispatch]);

  console.log("perro",genres)
  return (
    <div className={style.background}>
      <div className={style.degradeFrame}>
      <div className={style.frame}>
      <div className={style.title_create}>
        <h1>CREATE YOUR OWN VIDEOGAME CARD</h1>
      </div>

      <div className={style.dogCreate}>
        <div className={style.created}>
          <form className={style.form}  onSubmit={(e) => handleSubmit(e)}>
            <div className={style.inputDiv}>
              <label  className={style.label}>Name: </label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="name"
                value={input.name=input.name.charAt(0).toUpperCase()+input.name.slice(1)}
                required
              />
              <span >
                {errors.name && <p>{errors.name}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
              <label className={style.label}>Released: </label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="released"
                value={input.released}
                required
              />
              <span >
                {errors.released && <p>{errors.released}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
              <label className={style.label}>Description: </label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="description"
                value={input.description}
                required
              />
              <span >
                {errors.description && <p>{errors.description}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
              <label className={style.label}>Rating: </label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="rating"
                value={input.rating}
                required
              />
              <span >
                {errors.description && <p>{errors.description}</p>}
              </span>
            </div>

            <div className={style.inputDiv}>
            <select
                className={style.label}
                onChange={(e) => handleSelectGenres(e)}
              >
                <option hidden>Genres</option>
                {genres.map((el) => (
                  <option value={el.name} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>

            {input.genres.map((el) => (
            <div className={style.buttonPlat} key={el}>
              <button
                className={style.buttonCreate}
                onClick={() => handleDeleteGenres(el)}
              >
                {el}
              </button>
            </div>
          ))}


          <div className={style.inputDiv}>
            <select
                className={style.label}
                onChange={(e) => handleSelectPlatforms(e)}
              >
                <option hidden>Platforms</option>
                {valor.map((el) => (
                  <option value={el.name} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>

            {input.platforms.map((el) => (
            <div className={style.buttonPlat} key={el}>
              <button
                className={style.buttonCreate}
                onClick={() => handleDeletePlatforms(el)}
              >
                {el}
              </button>
            </div>
          ))}
              
{/* 
            <div className={style.inputDiv}>
              <label className={style.label}>Platforms:</label>
              <input
                className={style.input}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="platforms"
                value={input.platforms}
                required
              />
              <span >
                {errors.platforms && <p>{errors.platforms}</p>}
              </span>
            </div>
             */}

            <div>
            {/* {input.urlImg!==''? 
               (<img src={input.image} alt='new videogame' width='240px' height='200px' />) :
               (<img src={defaultImage}  alt='new videogame' className={style.image} />)}
               <hr/>
             */}
            <label className={style.labelLink}>
             {errors.image? <span className={style.error}>{errors.image}</span> :
            <span  htmlFor="image" className={style.span}>URL Image: </span>}
            <input 
                name='image'
                className={style.input}
                type='url'
                placeholder="Add link of image"
                onChange={(e) => handleInputChange(e)}
                //porque no funciona la ter
                value={input.image} />
            </label>
             <hr/>
            </div>


            <div >
              <button className={style.buttonCreate} type="submit">
                CREATE A POKEMON
              </button>
            </div>
          </form>
          <div >
            <Link to="/home">
              <button className={style.buttonToHome}>HOME</button>
            </Link>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(input.name)) {
    errors.name = "Name can only contain letters";
  } else if (!input.name || input.name.length > 20){
    errors.name = "Name is required with no more than 20 characters";
  } else if (!input.name || input.name.length > 10)
    errors.name = "Name is with the first letter big";
//   if (input.attack < 0 || input.attack > 200)
//     errors.attack = "Invalid! Range between 0 - 200";
//   if (input.defense < 0 || input.defense > 200)
//     errors.defense = "Invalid! Range between 0 - 200";
//   if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(input.type))
//     errors.type = "Type can only contain letters";

  return errors;
}
