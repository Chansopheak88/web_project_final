import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import expressLayouts from 'express-ejs-layouts';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { sessionConfig } from './config/sessionConfig.js';
import userRoutes from './routes/userRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import toolRoutes from './routes/toolRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('/api/v1/create', cors(corsOptions));

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
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

const PORT = process.env.PORT_APP || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

