import axios from 'axios'

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const GET_DETAIL = "GET_DETAIL"             
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME"
export const POST_VIDEOGAME = "POST_VIDEOGAME"  
export const GET_VIDEOGAME_BY_NAME = 'GET_VIDEOGAME_BY_NAME'
export const ORDER_BY_ALPHA = "ORDER_BY_ALPHA"
export const FILTERED_BY_GENDER = "FILTERED_BY_GENDER"
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const APIoBD = "APIoBD"




export function getAllVideogames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/allVideogames')
        //console.log(json.data)
        return dispatch({
            type: 'GET_ALL_VIDEOGAMES',
            payload: json.data //estara buena esta extraccion de datos?
        })
    }
}

export function getDetail(payload) {
  console.log(payload)
    return async function (dispatch) {
      try {
        const detail = await axios.get(`http://localhost:3001/allVideogames/detail/${payload}`);
        //console.log(detail.data.result)
         console.log(detail.data.videogameId)
        return dispatch({
          type: "GET_DETAIL",
          payload: detail.data.videogameId,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function deleteVideogame(id) {
    return async function (dispatch) {
      try {
        console.log(id)
        const deleteVideogame = await axios.delete(`http://localhost:3001/allVideogames/delete/${id}`);
        console.log(deleteVideogame)
        return dispatch({
          type: "DELETE_VIDEOGAME",
          payload: deleteVideogame,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function postVideogame(input){
    console.log(input)
    return async(dispatch)=>{
        const responsePost = await axios.post('http://localhost:3001/allVideogames/create', input);
        input.id = responsePost.data.id;
        dispatch({
            type: "POST_VIDEOGAME",
            payload: input
        })
        alert(responsePost.data.message)
    }
  }

  export function getVideogameByName(payload) {
    return async function (dispatch) {
      try {
        let videogamesNames = await axios.get(`http://localhost:3001/allVideogames?name=${payload}`);
        //console.log(pokemonsNames.data)
        return dispatch({
          type: "GET_VIDEOGAME_BY_NAME",
          payload: videogamesNames.data,
        });
      } catch (error) {
        console.log(error);
        alert("Videogame not found");
      }
    };
  }

  export function orderAlphabetic(payload) {
    console.log(payload)
    return {
      type: "ORDER_BY_ALPHA",
      payload,
    };
  }

  export function getAPIoBD(payload) {
    console.log(payload)
    return {
      type: "APIoBD",
      payload,
    };
  }

  export function getAllGenres() {
    return async function (dispatch) {
      let genres = await axios.get("http://localhost:3001/allVideogames/genres");
      return dispatch({
        type: "GET_ALL_GENRES",
        payload: genres.data,
      });
    };
  }


  export function filteredByGender(payload) {
    return {
      type: "FILTERED_BY_GENDER",
      payload,
    };
  }

//Hay 2 funciones una dentro de la otra, una funcion dentro del return de la 1era funcion. la funcion interior 