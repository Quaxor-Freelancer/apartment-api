const mongoose = require('mongoose');
const timeSchema = require('./schemas/Time')

const facilityMembershipSchema = mongoose.Schema({
    buildingFaciltyId: {
        type: mongoose.Types.ObjectId,
        ref: 'Building'
    },
    apartmentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    },
    type: {
        type: String,
        enum: ["fulltime", "weekly", "monthly", "once"]
    },
    membership: {
        weekly: [{
            day: {
                type: String,
                enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            },
            fullday: {
                type: Boolean,
                default: false
            },
            from: timeSchema,
            to: timeSchema,
        }],
        monthly: [{
            day: {
                type: Number,
                default: 1
            },
            fullday: {
                type: Boolean,
                default: false
            },
            from: timeSchema,
            to: timeSchema,
        }],
        once: [{
            datetime: {
                type: Date
            },
            fullday: {
                type: Boolean,
                default: false
            },
            from: timeSchema,
            to: timeSchema,
        }]
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const FacilityMembership = mongoose.model("FacilityMembership", facilityMembershipSchema);
module.exports = FacilityMembership;