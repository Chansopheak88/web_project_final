import 'dotenv/config';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { sessionConfig } from './config/sessionConfig.js';
import userRoutes from './routes/userRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import toolRoutes from './routes/toolRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(sessionConfig);
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'templates/mains');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRoutes);
app.use('/tools', toolRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT_APP || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));