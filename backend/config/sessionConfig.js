import db from './db.js';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';

const MySQLStore = MySQLStoreFactory(session);

const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 3600000,
    createDatabaseTable: true
}, db);

export const sessionConfig = session({
    key: 'session_cookie_name',
    secret: process.env.SESSION_SECRET || 'cadt_cyber_default_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    }
});