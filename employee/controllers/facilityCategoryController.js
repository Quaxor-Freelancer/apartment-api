const facilityCategoryServices = require('../services/facilityCategoryServices')

const getAllFacilityCategories= (req, res, next) => {
    facilityCategoryServices.getAllFacilityCategories()
    .then((facilities)=>{
        return res.status(201).json(facilities)
    })
    .catch(error=>next(error))
}

const createFacilityCategory = (req, res, next) => {
    facilityCategoryServices.createFacilityCategory(req.body)
    .then((facilityCategory)=>{
        return res.status(201).json(facilityCategory)
    })
    .catch(error=>next(error))
}

const findFacilityCategory =(req, res, next) => {
    const { facilityCategoryId } = req.params
    facilityCategoryServices.findFacilityCategoryById(facilityCategoryId)
    .then((facilityCategory)=>{
        return res.status(201).json(facilityCategory)
    })
    .catch(error=>next(error))
}

const updateFacilityCategory = (req, res, next) => {
    const { facilityCategoryId } = req.params
    facilityCategoryServices.updateFacilityCategory(facilityCategoryId, req.body)
    .then(()=>{
        return res.status(200).json({status: true})
    })
    .catch(error=>next(error))
}

const deleteFacilityCategory = (req, res, next) => {
    const { facilityCategoryId } = req.params
    facilityCategoryServices.deleteFacilityCategory(facilityCategoryId)
    .then(()=>{
        return res.status(200).json({status: true})
    })
    .catch(error=>next(error))
};

module.exports = {
    getAllFacilityCategories,
    createFacilityCategory,
    findFacilityCategory,
    updateFacilityCategory,
    deleteFacilityCategory
}