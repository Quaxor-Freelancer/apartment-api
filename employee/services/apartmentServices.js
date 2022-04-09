const mongoose = require('mongoose')
const Apartment = require('../../models/Apartment')
const Building = require('../../models/Building')

exports.getAllApartments = () => {
    return Apartment.find()
}

exports.getApartment = (apartmentId) => {
    return Apartment.findById(apartmentId)
}

exports.createApartment = ({code, name, details, floorId, ownerId, buildingId, status}) => {
    const apartment = new Apartment({
        code, name, details, floorId, buildingId, ownerId, status
    })
    return apartment.save()
}

exports.updateApartment = ({apartmentId, code, name, details, floorId, ownerId, buildingId, status}) => {
    return Apartment.updateOne({ _id: apartmentId }, {
        $set: {
            code, name, details, floorId, buildingId, ownerId, status
        }
    })
}

exports.deleteApartment = (apartmentId) => {
    return Apartment.deleteOne({_id: apartmentId})
}

exports.changeStatus = ({apartmentId , status}) => {
    return Apartment.updateOne({ _id: apartmentId }, {
        $set: {
            status
        }
    })
}

exports.getApartmentByFloor = (floorId) => {
    return Apartment.aggregate([
        {
            $match: {
                floorId: mongoose.Types.ObjectId(floorId)
            }
        }
    ])
}

exports.getApartmentByBuilding = async(buildingId) => {
    return Apartment.aggregate([ 
        {
            $match: {
                buildingId: mongoose.Types.ObjectId(buildingId)
            }
        }
    ])
}

exports.updateApartmentOwner = ({apartmentId},{ ownerId }) => {
    return Apartment.updateOne({ _id: apartmentId }, {
        $set: {
            ownerId: ownerId || null
        }
    })
}