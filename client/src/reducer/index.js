import {
    GET_ALL_VIDEOGAMES,
    GET_DETAIL,
    GET_VIDEOGAME_BY_NAME,
    DELETE_VIDEOGAME,
    POST_VIDEOGAME,
    ORDER_BY_ALPHA,
    GET_ALL_GENRES,
    FILTERED_BY_GENDER,
    APIoBD,
} from "../actions/index.js";


  const initialState = {
    videogames: [],
    detail: [],
    selectedVideogame: [],
    allGenres: [],
    loader: true,
  }

  const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        // Acá va tu código:
            case GET_ALL_VIDEOGAMES:
                return {
                    ...state,
                    videogames: action.payload,
                    selectedVideogame: action.payload, // action, es la funcion del type y traig
                    loader: false,
            }
            case GET_DETAIL:
                return {
                    ...state,
                    detail: action.payload,
            };
            case DELETE_VIDEOGAME: {
                return {
                    ...state,
              };
            }
            case POST_VIDEOGAME:
                return {
                    ...state
          };
            case GET_VIDEOGAME_BY_NAME:
                return {
                    ...state,
                    selectedVideogame: action.payload, // action, es la funcion del type y traig
                }
            // case GET_ALL_PLATFORMS:
            //     var plataformas = state.videogames.map(el=>el.platforms)
            //     console.log(plataformas)
            //     return {
            //             ...state,
            //             platforms: plataformas
            //       }    
            case APIoBD:
                let orderedPokemons = [];
                switch(action.payload){
                case "filterApi": {
                        let filteredApi = state.videogames.filter(a=>{
                          if(a.id.length<10){
                              return a
                          }
                        })
                        orderedPokemons = filteredApi
                        return {
                          ...state,
                        selectedVideogame: filteredApi,
                      }
                    } 
                case "filterBD": {
                        let filteredBD = state.videogames.filter(a=>{
                        if(a.id.length>10){
                            return a
                        }
                      })
                      orderedPokemons = filteredBD
                      console.log("BD",orderedPokemons)
                      return {
                        ...state,
                      selectedVideogame: filteredBD,
                    }
                    }    
                default: return {
                        ...state,
                      };
                    }
                case ORDER_BY_ALPHA: {
                  let orderedPokemons = [];
                  if (action.payload === "asc") {
                          let orderedAToZ = state.videogames.slice().sort((a, b) => {
                            if (a.name > b.name) {
                              return 1;
                            }
                            if (b.name > a.name) {
                              return -1;
                            }
                            return 0;
                          });
                          orderedPokemons = orderedAToZ;
                          console.log("AaZ",orderedPokemons)
                        }
                  else if(action.payload==="desc")  {
                          let orderedZToA = state.videogames.slice().sort((a, b) => {
                            if (a.name > b.name) {
                              return -1;
                            }
                            if (b.name > a.name) {
                              return 1;
                            }
                            return 0;
                          });
                          orderedPokemons = orderedZToA;
                          console.log("ZtoA", orderedPokemons)
                        } 
                  return {
                    ...state,
                    selectedVideogame: orderedPokemons,
                    };
                    }
                case GET_ALL_GENRES:
                    return {
                          ...state,
                          allGenres: action.payload,
                        };
                case FILTERED_BY_GENDER:
                        //var video = state.videogames.split(",")
                        //console.log(video)
                      let filteredGender = state.videogames.filter((el) => {
                        
                      return el.genders?.includes(action.payload) ? el : null 
                    })
                    console.log(filteredGender)
                    return {
                        ...state,
                        selectedVideogame: filteredGender,
          };
            default:
                return {...state}           
        }}

        
  export default rootReducer;