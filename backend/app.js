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

// 1. Configure CORS once
const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
};

// 2. Apply Middlewares
app.use(cors(corsOptions));
app.use(sessionConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. View Engine (Optional if you are moving fully to React)
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'templates/mains');

// 4. Routes
app.use('/api/v1', apiRoutes);
app.use('/tools', toolRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT_APP || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
