const { Router } = require('express');
const router = Router();
//const axios = require('axios');
const {Country, Activity} = require('../db')
const {Op} = require ('sequelize');
const {getDbCountries, getCountryDetails} = require ('../controllers/getDbCountries')
const {alphabetOrder, alphabetDscOrder}= require ('../controllers/orderABC')
const {orderPopulation, orderPopulationDesc}= require ('../controllers/orderPopulation')

router.get('/?', async(req, res, next)=>{
    let {name, orderPop, orderABC} = req.query
    let countries;
   
    try{
        if(name){

           
            let country = await Country.findAll({
                include:{
                    model:Activity
                },
                    where:{
                        cName:{
                            [Op.startsWith]:`${name}`
                     },
                    
                }}
                
            )
         
        country.length?res.status(200).json(country):res.status(404).send('no Country matches your search')
            
            
        }else if(orderPop) {
            countries = await orderPopulation(orderPop)
        } else if (orderABC){
            countries = await alphabetOrder(orderABC)
        }else {
        countries = await getDbCountries();

    }
    let countryList = countries.map((c)=>{
        return{
            id: c.id,
            cName: c.cName,
            flag: c.flag,
            continent: c.continent,
            population:c.population,
            activities: c.activities
           
            

    }})
    console.log(countryList.length)
    countryList.length?res.status(200).json(countryList):res.status(404).send('error de conexion')

    }catch(e){
        next(e)
    }
})



/* router.get('prueba/orderABCascending', async (req,res,next)=>{
   try{
    let countries = await alphabetOrder();

        let countryList = countries.map((c)=>{
            return{
                id: c.id,
                cName: c.cName,
                flag: c.flag,
                continent: c.continent,
                population: c.population

        }})
       
        countryList.length?res.status(200).json(countryList):res.status(404).send('error de conexion')
        

    }catch(e){
        next(e)
    }
})


router.get('/orderABCdescending', async (req,res,next)=>{
    try{
     let countries = await alphabetDscOrder();
 
         let countryList = countries.map((c)=>{
             return{
                 id: c.id,
                 cName: c.cName,
                 flag: c.flag,
                 continent: c.continent,
                 population: c.population
 
         }})
        
         countryList.length?res.status(200).json(countryList):res.status(404).send('error de conexion')
         
 
     }catch(e){
         next(e)
     }
 })

 router.get('/orderPopAscending', async (req,res,next)=>{
    try{
     let countries = await orderPopulationAsc();
 
         let countryList = countries.map((c)=>{
             return{
                 id: c.id,
                 cName: c.cName,
                 flag: c.flag,
                 continent: c.continent,
                 population: c.population
 
         }})
        
         countryList.length?res.status(200).json(countryList):res.status(404).send('error de conexion')
         
 
     }catch(e){
         next(e)
     }
 })

 router.get('/orderPopDescending', async (req,res,next)=>{
    try{
     let countries = await orderPopulationDesc();
 
         let countryList = countries.map((c)=>{
             return{
                 id: c.id,
                 cName: c.cName,
                 flag: c.flag,
                 continent: c.continent,
                 population: c.population
 
         }})
        
         countryList.length?res.status(200).json(countryList):res.status(404).send('error de conexion')
         
 
     }catch(e){
         next(e)
     }
 }) */
 
router.get('/:id', async (req,res,next)=>{
    let { id } = req.params;
    //id = id.toLowerCase()
    try{
        let details = await getCountryDetails(id);
        details?res.status(200).json(details):res.status(404).send('an error has ocurred')
        

    }catch(e){
        next(e)
    }
})






module.exports = router