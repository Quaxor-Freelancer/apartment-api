const buildingFacilityServices = require('../services/buildingFacilityServices')

const getAllFacilities= (req, res) => {
    const { buildingId } = req.params
    buildingFacilityServices.getAllFacilities(buildingId)
    .then((facilities)=>{
        return res.status(201).json(facilities)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const createFacility = (req, res) => {
    const { buildingId } = req.params
    const { facilityId, buildingFloorId, code, common, name, details, divisible, items, status, images } = req.body;
    if ( !facilityId || !buildingFloorId || !code || !name ) {
        return res.status(500).send("Bad Request")
    }
    buildingFacilityServices.createFacility({id:buildingId, facilityId, buildingFloorId, code, common, name, details, divisible, items, status, images })
    .then((facility)=>{
        return res.status(201).json(facility)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const findFacility = (req, res) => {
    const { buildingFacilityId } = req.params
    buildingFacilityServices.findFacilityById(buildingFacilityId)
    .then((facility)=>{
        return res.status(201).json(facility)
    })
    .catch((error)=>{
        console.log(error)
        return res.status(500).send("Internal Server Error")
    })
}

const updateFacility = (req, res) => {
    const { buildingFacilityId } = req.params
    const {facilityId, buildingFloorId, code, common, name, details, divisible, items, status, images} = req.body
    if  ( !facilityId || !buildingFloorId || !code || !name ) {
        return res.status(500).send("Bad Request")
    }
    buildingFacilityServices.updateFacility({id:buildingFacilityId, facilityId, buildingFloorId, code, common, name, details, divisible, items, status, images })
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
    const { buildingFacilityId } = req.params
    buildingFacilityServices.deleteFacility(buildingFacilityId)
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