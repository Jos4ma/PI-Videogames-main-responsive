import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllVideogames, orderAlphabetic, filteredByGender, getAllGenres } from '../actions'
import Card from './Card.jsx'
import style from './Home.module.css'
import {Link} from 'react-router-dom'
import SearchBtn from "./SearchBar";
import Paginated from "./Paginado";
import NavHome from './NavHome'
import Loader from './Loader'



export default function Home () {
    const dispatch = useDispatch()
    const [order, setOrder] = useState("")
    const allVideogames = useSelector ((state) => state.selectedVideogame)  
//    console.log("cargaInicial",allVideogames)
    const allGenres = useSelector ((state) => state.allGenres)
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setPokemonsPerPage] = useState(15);  //
    const LastVideogameIndex = currentPage * videogamesPerPage; //el total de pk x la pag actual nos da el ultimo de la lista
    const FirstVideogameIndex = LastVideogameIndex - videogamesPerPage;   // 
    const currentVideogames = allVideogames.slice(FirstVideogameIndex, LastVideogameIndex);
    const loader = useSelector((state) => state.loader)
//    console.log("currentVideo", currentVideogames)

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    useEffect (()=>{
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
    },[dispatch])

    function handleAlphabetic(e) {
        e.preventDefault();
        dispatch(orderAlphabetic(e.target.value));
        setOrder(e.target.value);
//        setCurrentPage(1);
      }
      function handleGender(e) {
          console.log(e.target.value)
        e.preventDefault();
        dispatch(filteredByGender(e.target.value));
    //    setCurrentPage(1);
        setOrder(e.target.value);
      }

    return (
    
    <div className={style.body}>
                <div className={style.navBar}>
                     <NavHome/>
                </div>
    {/* <h1 className={style.title}> VIDEOGAME'LIST </h1>
    <Link to="/create">
                      <button className={style.link}>Create Videogame</button>
    </Link>    
    <SearchBtn />
    <select className={style.abc} onChange={(e)=>handleAlphabetic(e)}>
                    <option value="asc">Ascendente A to Z</option>
                    <option value="desc">Descendente Z to A</option>
                    <option value="filterApi">Filter for Api</option>
                    <option value="filterBD">Filter for Data Base</option>
            </select>
            <select className={style.type} onChange={(e) => { handleGender(e); }}>
                    <option hidden>All genres</option>
                      {allGenres?.map((el) => (
                    <option value={el.name} key={el.id}>
                      {el.name}
                    </option>
                    ))}
            </select> */}

            {allVideogames.length > 15 ? (
                    <div className={style.pagination}><Paginated
                        videogamesPerPage={videogamesPerPage}
                        allVideogames={allVideogames.length}
                        paginated={paginated}
                        currentPage={currentPage}
                        /></div>
                    ) : null}
 
        <div className={style.cardsConteiner}>
            {   loader ? (
          <Loader />
        ) : (  
            
            currentVideogames?.map( el => {      //allBreeds?.map( el => { cuando hay ? esta preguntando si hay datos y si hay mapea
                    return (
                         <div key={el.id+"key-home-"}> 
                            <Card id={el.id} name={el.name} genders={el.genders} image={el.image}/>   
                        </div>
                    )   //los fragment son lo mismo que los div pero no dejan "esos" espacios
                })
            
            )}                                     
        </div>           
            <div className={style.navBar_botton}>
                <ul className={style.navhome_Botton}>
                    <div className={style.titleGray}> created by JOSEMA</div>
                </ul>
            </div> 
    </div>
    )
}
