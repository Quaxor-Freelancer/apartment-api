const mongoose = require('mongoose')
const Building = require('../../models/Building')

exports.getAllBuildings = () => {
    return Building.find()
}

exports.getBuilding = ({ buildingId }) => {
    return Building.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(buildingId)
            }

        },
        {
            $lookup: {
                from: 'resources',
                localField: 'resourceIds',
                foreignField: '_id',
                as: 'resources'
            }
        }
    ]).then(data => data[0])
}

exports.createBuilding = ({ buildingCode, name, city, country, address, buildingType, facilityIds, floors = [], status, resourceIds=[] }) => {
    const building = new Building({
        buildingCode, name, city, country, address, buildingType, facilityIds, floors, status, resourceIds
    })
    return building.save()
}

exports.updateBuilding = ({ buildingId, buildingCode, name, city, country, address, buildingType, facilityIds = [], floors = [], status, resourceIds=[] }) => {
    return Building.updateOne({ _id: buildingId }, {
        $set: {
            buildingCode,
            name,
            city,
            country,
            address,
            buildingType,
            facilityIds,
            floors,
            status,
            resourceIds
        }
    })
}

exports.deleteBuilding = ({ buildingId }) => {
    return Building.deleteOne({ _id: buildingId })
}

exports.changeStatus = ({ buildingId, status }) => {
    return Building.updateOne({ _id: buildingId }, {
        $set: {
            status
        }
    })
}