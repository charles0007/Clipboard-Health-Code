const express = require('express');
const router = express.Router();
const Agent = require('./models/agent');
const Facility = require('./models/facility');

router.get('/:id/agents', async (req, res) => {
    try {
        const facility = await Facility.findById(req.params.id);
        
        const agents = await Agent.find({ _id: { $in: facility.agent_ids } });
        res.render('agents', { agents, facility });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching agents');
    }
});

router.post('/:id/agents', async (req, res) => {
    try {
        const agent = await Agent.findById(req.body.agent_id);
        agent.custom_agent_id = req.body.custom_agent_id;
        await agent.save();
        res.redirect(`/facilities/${req.params.id}/agents`);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating custom agent ID');
    }
});

module.exports = router;