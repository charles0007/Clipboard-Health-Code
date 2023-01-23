const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    agent_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent'
    }]
});

const Facility = mongoose.model('Facility', facilitySchema);
module.exports = Facility;