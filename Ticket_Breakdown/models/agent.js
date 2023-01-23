
const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    
    custom_agent_id: {
        type: String,
        unique: [true, 'custom agent id must be unique'],
        sparse: true,
        required: false,
    },
    facility_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility'
    }
});

const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;