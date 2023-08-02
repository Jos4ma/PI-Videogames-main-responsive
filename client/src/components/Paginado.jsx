
import style from "./Paginado.module.css";
import React from "react";

export default function Paginated({
  videogamesPerPage,
  allVideogames,
  paginated,
  currentPage,
}) {
  let pageNumber = [];
    //console.log(currentPage)
  for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <div className={style.wrapperPagination}>
      <nav>
        <ul className={style.pagination}>
          {currentPage > 1 ? (
            <li className={style.pagination__item} onClick={() => paginated(currentPage - 1)}>
              <button className={style.btn}>Prev</button>
            </li>
          ) : null}
          <li className={style.pagination__item} onClick={() => paginated(currentPage)}>
            <button className={style.btn}>{currentPage}</button>
          </li>
          {currentPage < allVideogames / videogamesPerPage ? (
            <li className={style.pagination__item} onClick={() => paginated(currentPage + 1)}>
              <button className={style.btn}>Next</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}

//version de compañero  Juan o Felipe.
// import React, {Fragment} from "react";

// const Paginate = ({productsDePagina, allProducts, paged}) => {

//     const pageNumbers = [];
//     for(let i=1; i<=Math.ceil(allProducts/productsDePagina); i++){
        
//         pageNumbers.push(i);
//     }


//     return (
//         <Fragment>

//             <ul className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                 <a
//                     href="#"
//                     className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                 >
//                         Prev 
//                 </a>
//                           {
//                     pageNumbers?
//                     pageNumbers.map((num, index) =>  (
//                         <li key={index}>
//                             <a 
//                                 className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" 
//                                 href={'#'+num} 
//                                 onClick={()=>paged(num)}>{num}
//                             </a>
//                         </li>
//                     ))
//                     :
//                     <span></span>
//                 }
//                 <a
//                 href="#"
//                 className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                 >
//                     Next 
//                 </a>
//             </ul>
//         </Fragment>
//     )
// }

// export default Paginate;
