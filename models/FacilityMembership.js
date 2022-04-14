const mongoose = require('mongoose');
const timeSchema = require('./schemas/Time')

const facilityMembershipSchema = mongoose.Schema({
    facilityId: {
        type: mongoose.Types.ObjectId,
        ref: 'Facility',
        required: true
    },
    facilityItemId: {
        type: mongoose.Types.ObjectId,
        ref: 'Facility'
    },
    apartmentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Apartment',
        required: true
    },
    type: {
        type: String,
        enum: ["fulltime", "weekly", "monthly", "once"],
        required: true
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

const FacilityMembership = mongoose.model("facilityMembership", facilityMembershipSchema);
module.exports = FacilityMembership;