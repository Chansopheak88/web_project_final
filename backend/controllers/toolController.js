import Tool from '../models/toolModel.js';

const toolController = {
    // 1. Display the main tools list page
    getAllTools: async (req, res) => {
        try {
            const tools = await Tool.getAll();
            // This renders 'views/tools.ejs' and passes the 'tools' data to it
            res.render('tools', { 
                title: 'ExploitX - Hacking Tools', 
                tools: tools 
            });
        } catch (err) {
            console.error('Error fetching tools:', err);
            res.status(500).send('Server Error');
        }
    },

    // 2. Display details for a specific tool
    getToolDetails: async (req, res) => {
        try {
            const toolId = req.params.id;
            const tool = await Tool.getById(toolId);
            
            if (!tool) {
                return res.status(404).send('Tool not found');
            }

            res.render('tool-details', { 
                title: tool.name, 
                tool: tool 
            });
        } catch (err) {
            console.error('Error fetching tool details:', err);
            res.status(500).send('Server Error');
        }
    },

    // 3. Handle adding a new tool (for the Admin Panel)
    addTool: async (req, res) => {
        try {
            // Data comes from the form in your EJS view
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
                created_by: req.session.userId // Assuming you store user ID in session
            };

            await Tool.create(newToolData);
            res.redirect('/tools'); // Refresh the list after adding
        } catch (err) {
            console.error('Error adding tool:', err);
            res.status(500).send('Failed to add tool');
        }
    }
};

export default toolController;