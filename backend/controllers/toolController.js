import Tool from '../models/toolModel.js';

const toolController = {
<<<<<<< HEAD
    // 1. Return tools list as JSON
    getAllTools: async (req, res) => {
        try {
            const tools = await Tool.getAll();
            // Send the tools array directly to React
            res.json({ 
                success: true,
=======
    // 1. Display the main tools list page
    getAllTools: async (req, res) => {
        try {
            const tools = await Tool.getAll();
            // This renders 'views/tools.ejs' and passes the 'tools' data to it
            res.render('tools', { 
                title: 'ExploitX - Hacking Tools', 
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
                tools: tools 
            });
        } catch (err) {
            console.error('Error fetching tools:', err);
<<<<<<< HEAD
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    },

    // 2. Return tool details as JSON
=======
            res.status(500).send('Server Error');
        }
    },

    // 2. Display details for a specific tool
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
    getToolDetails: async (req, res) => {
        try {
            const toolId = req.params.id;
            const tool = await Tool.getById(toolId);
            
            if (!tool) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
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
<<<<<<< HEAD
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
=======
                created_by: req.session.userId // Assuming you store user ID in session
            };

            await Tool.create(newToolData);
            res.redirect('/tools'); // Refresh the list after adding
        } catch (err) {
            console.error('Error adding tool:', err);
            res.status(500).send('Failed to add tool');
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
        }
    }
};

<<<<<<< HEAD
export default toolController;
=======
export default toolController;
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
