const FacilityMembership = require('../../models/FacilityMembership');
const Facility = require('../../models/Facility');
const mongoose = require('mongoose');

exports.getAllFacilityMembershipsByApartment = async (id) => {
    const facilityMemberships = await FacilityMembership.aggregate([
        {
            $match: { apartmentId: mongoose.Types.ObjectId(id)}
        },
        {
            $lookup: {
                from: "facilities",
                as: 'facility',
                localField: 'facilityId',
                foreignField: '_id'
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return facilityMemberships;
}

exports.getAllFacilityMembershipsByFacility = async (id) => {
    const facilityMemberships = await FacilityMembership.aggregate([
        {
            $match: { facilityId: mongoose.Types.ObjectId(id)}
        },
        {
            $lookup: {
                from: "apartments",
                as: 'apartment',
                localField: 'apartmentId',
                foreignField: '_id'
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return facilityMemberships;
}

exports.getAllFacilityMembershipsByApartmentAndFacility = async (apartmentId, facilityId) => {
    const facilityMemberships = await FacilityMembership.aggregate([
        {
            $match: { 
                apartmentId: mongoose.Types.ObjectId(apartmentId),
                facilityId: mongoose.Types.ObjectId(facilityId)
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return facilityMemberships;
}

exports.getAllFacilityMembershipsByApartmentAndFacilityCategory = async (apartmentId, facilityCategoryId) => {
    const facilities = await Facility.aggregate([
        {
            $match: { facilityCategoryId: mongoose.Types.ObjectId(facilityCategoryId)}
        },
        {
            $project: {
                _id: 1
            }
        }
    ])
    const facilityIds = facilities.map(item=> item._id)
    const facilityMemberships = await FacilityMembership.aggregate([
        {
            $match: { 
                apartmentId: mongoose.Types.ObjectId(apartmentId),
                facilityId: { $in: facilityIds }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return facilityMemberships;
}

exports.createFacilityMembership = async (facilityId ,{ apartmentId, type, membership, status }) => {
    if  ( !apartmentId || !type || !membership ) {
        throw {success: false, error: "Bad Request"}
    }
    if(!validateMembership(type, membership)){
        throw { success: false, error: "Validation Error"}
    }
    // Create facility membership
    const facility = await FacilityMembership.create({
        facilityId , apartmentId, type, membership, status
    })
    return facility;
}

exports.findFacilityMembership = async (id) => {
    const facilityMembership= await FacilityMembership.findById(id)
    if(!facilityMembership){
        throw { success: false, error: "FacilityMembership Not Found"}
    }
    return facilityMembership
}

exports.updateFacilityMembership = async ( id, {facilityId , apartmentId, type, membership, status }) => {
    if  ( !facilityId || !apartmentId || !type || !membership ) {
        throw {success: false, error: "Bad Request"}
    }
    if(!validateMembership(type, membership)){
        throw { success: false, error: "Validation Error"}
    }
    return FacilityMembership.updateOne({ _id: id }, {
        $set: { facilityId , apartmentId, type, membership, status }
    })
}

exports.deleteFacilityMembership = async (id) => {
    const result= await FacilityMembership.deleteOne({ _id: id })
    if(result.n ===0){
        throw { success: false, error: "FacilityMembership Not Found"}
    }
    return result
}


const validateMembership=(type, membership)=>{
    if (!["fulltime", "weekly", "monthly", "once"].includes(type)){
        return false
    }

    if(type === "fultime" && ( !membership || !Object.keys(membership).length)){
        return true
    }

    if(membership && membership[type] && (Object.keys(membership).length ===1)){
        return true
    }
    return false
}