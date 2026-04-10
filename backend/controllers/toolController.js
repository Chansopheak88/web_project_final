import Tool from '../models/toolModel.js';

const toolController = {
    // 1. Return tools list as JSON
    getAllTools: async (req, res) => {
        try {
            const tools = await Tool.getAll();
            // Send the tools array directly to React
            res.json({ 
                success: true,
                tools: tools 
            });
        } catch (err) {
            console.error('Error fetching tools:', err);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    },

    // 2. Return tool details as JSON
    getToolDetails: async (req, res) => {
        try {
            const toolId = req.params.id;
            const tool = await Tool.getById(toolId);
            
            if (!tool) {
                return res.status(404).json({ success: false, message: 'Tool not found' });
            }

            res.json({ success: true, tool: tool });
        } catch (err) {
            console.error('Error fetching tool details:', err);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    },

    // 3. Handle adding a new tool via JSON request
    addTool: async (req, res) => {
        try {
            const newToolData = {
                name: req.body.name,
                category_id: req.body.category_id,
                dob: req.body.dob,
                description: req.body.description,
                platform: req.body.platform || 'Linux',
                risk_level: req.body.risk_level,
                official_source: req.body.official_source,
                command_example: req.body.command_example,
                video_link: req.body.video_link,
                created_by: req.session.userId 
            };

            const result = await Tool.create(newToolData);
            
            // Instead of redirecting, tell React it was successful
            res.status(201).json({ 
                success: true, 
                message: 'Tool added successfully',
                toolId: result.insertId 
            });
        } catch (err) {
            console.error('Error adding tool:', err);
            res.status(500).json({ success: false, message: 'Failed to add tool' });
        }
    }
};

export default toolController;
