const axios = require('axios')
const { Gender, Videogame } = require("../db");
const { API_KEY } = process.env;
const videogame = require("../database/index")
require("dotenv").config()


async function  pInfo(videogame)  {
  return {
        id: videogame.data.id.toString().trim(),
        name: videogame.data.name.charAt(0).toUpperCase()+videogame.data.name.slice(1), 
        released: videogame.data.released,
        description: videogame.data.description, 
        rating: videogame.data.rating,
        //   gender: videogame.data.gender[0].name,
        gender: videogame.data.gender.forEach( (p)=>  p.name),
        //   health: pokemon.data.stats[0].base_stat,
        //platform: videogame.data.platforms.map((t)=> t.plataform.name),
        image_background: videogame.data.image_background,
        //      type: pokemon.data.types.map((t) => t.type.name)
  }
}

const getApiVideogames = async (req, res) => {
	try {
		let endpoints = [
			    //axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${1}`),
			     axios.get(`https://api.rawg.io/api/games?key=246561ca3d1b44d1877ac14e4ffc9ef5&page=2`),
			     axios.get(`https://api.rawg.io/api/games?key=246561ca3d1b44d1877ac14e4ffc9ef5&page=3`),
			     axios.get(`https://api.rawg.io/api/games?key=246561ca3d1b44d1877ac14e4ffc9ef5&page=4`),
			     axios.get(`https://api.rawg.io/api/games?key=246561ca3d1b44d1877ac14e4ffc9ef5&page=5`),
		];
		const api = await Promise.all(endpoints);
		let arrOfIds = [];
        
		for (let i = 0; i < api.length; i++) {
			arr = await api[i].data.results.map((v) => {
        // console.log("holaV",v)
			return {
                id: v.id.toString().trim(),
                name: v.name.charAt(0).toUpperCase()+v.name.slice(1), 
                released: v.released,
                description: v.description,
                rating: v.rating,
                image: v.background_image,
                // rating: v.rating.toFixed(2),
                genders: v.genres.map(g => g.name).join(', ').trim(),
                // genres: v.genres.map((e) => {
                //     return { name: e.name };
                //   }).join().split(",").sort(),
                // //genres: v.genres.join().split(",").sort(),
                platforms: v.platforms.map((e) => e.platform.name).join(', ').trim(),
            }
            });

			arrOfIds= [...arrOfIds,...arr];
		}
            return arrOfIds
	} catch (error) {
	    	console.log(error);
	}
};


const mongoDatabase = async () => {
    var objeto2 = await videogame.list()
    //console.log("hola "+objeto2)
    return objeto2.map(objeto=>{
        objeto = objeto._doc;
        for (let clave in objeto) {
          if (clave === '_id') {
              objeto["id"] = objeto[clave]; 
              delete objeto[clave]; 
          }
        }
        return objeto
        })
}


const getDbInfoAll = async () => {
     var responseDb = await Videogame.findAll({
        include: {
        model: Gender,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const response = responseDb.map(el =>{
      const genders = el.dataValues.genders.map(el => el.dataValues.name).toString()
      //console.log(el)
      return {
          id: el.id,
          name: el.name,
          genders,
          released: el.released,
          description: el.description, 
          rating: el.rating,
          image: el.image,
          platforms: el.platforms,
      }
  })
  // responseDb.genders.map(g => g.name).join(', ').trim()
  
  // const response = responseDb?.map((p) => p.dataValues.genders)
  return response
  };

   

const getAllVideogames = async () => {
        const apiInfo = await getApiVideogames();
        //const dbInfoBig = await getDbInfoAll();
        const dbInfoBig = await mongoDatabase();
        const totalInfo = dbInfoBig.concat(apiInfo);
        //console.log(dbInfoBig)
        return totalInfo;
  };


const joinAllDates = async (req, res) => {
        const { _id } = req.query;
    if (_id) {
        // let videogamesTitle = await videogamesTotal.filter((r) =>
        //     r.name.toLowerCase().includes(name.toLowerCase())
        //);
        var result = await videogame.get({"_id":_id})
        var videogamesTitle = []
        videogamesTitle.push(result)
        videogamesTitle.length
            ? res.status(200).json(videogamesTitle)
            : res.status(404).send("This videogame doesn't exist -.-");
    } else {
         const videogamesTotal = await getAllVideogames();
         res.status(200).json(videogamesTotal);
    }
  };

  const getDetail = async(req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
        var VideogameInfo = await getAllVideogames()
        console.log(VideogameInfo)
        var videogameId = VideogameInfo.find((el)=>el.id===id);
        if (videogameId) {
                  return res.json({videogameId});
        } else {
                  return res.json("The Pokemon id doesn't exist");
        }
        } catch (error) {
            console.log(error);
        }
  };

  const createMongDb = async (req, res, next) => {
    try{
    const {
      _id, name, released, description, image, genders, rating, platforms
      } = req.body;
      console.log(name)
      if (!name)
        return res.send({
          error: 500,
          message: "You need to enter a name",
        });   
      
      const video = await videogame.create({_id:'7', name, released, description, image, genders, rating, platforms})
      
      res.send("Videogame created \n"+video)
     
    }catch(error) { 
            next(error)
        }
    }; 

  // agregar con sequelize
  // const postVideogame = async (req, res, next) => {
  //   try{
  //   const {
  //       name, released, description, image, genders, rating, platforms
  //     } = req.body;
  //     if (!name)
  //       return res.send({
  //         error: 500,
  //         message: "You need to enter a name",
  //       });   
      
  //     const video = await Videogame.create({name, released, description, image, genders, rating, platforms})
      
  //     const typeDbArr = await Gender.findAll({
  //       where: { name: genres },
  //     });
      
  //     const typeDbId = typeDbArr?.map((p) => p.dataValues.id);
  //     console.log(typeDbId)
  //     await video.addGender(typeDbId);
  //     res.send("Videogame created")
     
  //   }catch(error) { 
  //           next(error)
  //       }
  //   }; 
  
    const deleteMongoDb = async (req, res) => {
        try{
          const {_id} = req.params;
          console.log(_id)
          const video = await videogame.get(_id)
          console.log(video)
          if (video !== null) {
            await videogame.deleteById(_id);
            res.json("Videogame deleted correctly");
          }
        } catch (e){
            return res.status(404).json("Error ---> " + e)
        }
    };




    const deleteVideogame = async (req, res) => {
        try {
          const { id } = req.params;
          const video = await Videogame.findByPk(id);
          if (video !== null) {
            await video.destroy();
            res.json("Videogame deleted correctly");
          }
        } catch (e) {
            return res.status(404).json("Error ---> " + e);
        }
      };
    
      const getAllGenres = async (req, res) => {
        try {
            let AllGenresFromDb = await Gender.findAll();
            res.status(200).json(AllGenresFromDb);
          } catch (error) {
            console.log(error);
          }
      };


  module.exports = {
    joinAllDates,
    // getApiInfoAll,
    //postVideogame, 
    createMongDb,
    getDetail,
    //deleteVideogame,
    deleteMongoDb,
    getAllGenres
  }