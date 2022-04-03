const mongoose = require('mongoose')
const Apartment = require('../../models/Apartment')
const Building = require('../../models/Building')

exports.getAllApartments = () => {
    return Apartment.find()
}

exports.getApartment = (apartmentId) => {
    return Apartment.findById(apartmentId)
}

exports.createApartment = ({code, name, details, floorId, images, status}) => {
    const building = new Apartment({
        code, name, details, floorId, images, status
    })
    return building.save()
}

exports.updateApartment = ({apartmentId, code, name, details, floorId, images, status}) => {
    return Apartment.updateOne({ _id: apartmentId }, {
        $set: {
            code, name, details, floorId, images, status
        }
    })
}

exports.deleteApartment = (apartmentId) => {
    return Apartment.deleteOne({_id: apartmentId})
}

exports.changeStatus = ({apartmentId, status}) => {
    return Apartment.updateOne({ _id: apartmentId }, {
        $set: {
            status
        }
    })
}

exports.getApartmentByFloor = (floorId) => {//*
    return Apartment.aggregate([
        {
            $match: {
                floorId
            }
        }
    ])
}

exports.getApartmentByBuilding = async(buildingId) => {
    const building = await Building.findById(buildingId)
    const floorIds = building.floors.map((floor)=>{
        return floor._id
    })
    return Apartment.aggregate([ 
        {
            $match: {
                floorId: {$in: floorIds}
            }
        }
    ])
}