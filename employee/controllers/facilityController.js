const facilityServices = require('../services/facilityServices')

const getAllFacilities= (req, res) => {
    facilityServices.getAllFacilities()
    .then((facilities)=>{
        return res.status(201).json(facilities)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const createFacility = (req, res) => {
    const { code, title, details, icon, status } = req.body;
    if ( !title || !code ) {
        return res.status(500).send("Bad Request")
    }
    facilityServices.createFacility({ code, title, details, icon, status })
    .then((facility)=>{
        return res.status(201).json(facility)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const findFacility = (req, res) => {
    const { facilityId } = req.params
    facilityServices.findFacilityById(facilityId)
    .then((facility)=>{
        return res.status(201).json(facility)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const updateFacility = (req, res) => {
    const { facilityId } = req.params
    const {code, title, details, icon, status} = req.body
    if  (!title || !code ) {
        return res.status(500).send("Bad Request")
    }
    facilityServices.updateFacility({id:facilityId, code, title, details, icon, status })
    .then((response)=>{
        if(response.error){
            return res.status(201).json(response)
        }
        if(response.n===0){
            return res.status(201).json({status:false, error:"Facility not Found"})
        }
        return res.status(200).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const deleteFacility = (req, res) => {
    const { facilityId } = req.params
    facilityServices.deleteFacility(facilityId)
    .then((response)=>{
        if(response.n===0){
            return res.status(200).json({status:false, error:"Facility not Found"})
        }
        return res.status(200).json({status: true})
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
};

module.exports = {
    getAllFacilities,
    createFacility,
    findFacility,
    updateFacility,
    deleteFacility
}