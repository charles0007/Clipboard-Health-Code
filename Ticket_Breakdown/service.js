
const Shift = require('./models/shift');

const getShiftsByFacility = async (facilityId) => {
    try {
        const shifts = await Shift.find({ facility_id: facilityId }).populate({
            path: 'agent_id',
            select: 'custom_agent_id internal_agent_id',
            model: 'Agent'
        });
        return shifts;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};