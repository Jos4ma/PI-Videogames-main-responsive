//Componente que renderizara todos los botones de filtrado y busqueda
import SearchBtn from "./SearchBar";
import { useSelector } from "react-redux";
import styles from "./NavHome.module.css";
import {Link} from 'react-router-dom'
import { orderAlphabetic, getAllGenres, filteredByGender, getAPIoBD } from '../actions'
import {useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'


function NavHome( ) {

  const allGenres = useSelector((state) => state.allGenres);
  console.log(allGenres)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("");

  useEffect (()=>{
    dispatch(getAllGenres())
  },[dispatch])

  function handleAlphabetic(e) {
    e.preventDefault();
    dispatch(orderAlphabetic(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleAPIoBD(e) {
    e.preventDefault();
    dispatch(getAPIoBD(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleGender(e) {
    e.preventDefault();
    dispatch(filteredByGender(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  return (
    <>
      <ul className={styles.navhome_ul}>
      <h1 className={styles.title}> VIDEOGAMES'S LIST </h1>

        <li className={styles.list}>
          <SearchBtn />
            <div>
                <Link to="/create">
                    <button className={styles.btnCreate}>Create Gender</button>
                </Link>
                <select className={styles.abc} onChange={(e)=>handleAlphabetic(e)}>
                    <option value="asc">Ascendant A to Z</option>
                    <option value="desc">Descendent Z to A</option>
                </select> 
                <select className={styles.btnDbOrApi} onChange={(e)=>handleAPIoBD(e)}>
                    <option>Filter by Api Or Bd </option>
                    <option value="filterApi">Filter for Api</option>
                    <option value="filterBD">Filter for Data Base</option>
                </select> 
                <select className={styles.type} onChange={(e) => { handleGender(e); }}>
                    <option hidden>All genres</option>
                      {allGenres?.map((el) => (
                    <option value={el.name} key={el.id}>
                      {el.name}
                    </option>
                    ))}
                </select> 
            </div>
        </li>
      </ul>
    </>
  );
}

export default NavHome;