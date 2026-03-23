export const isAuth = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/login');
};

export const isGuest = (req, res, next) => {
    if (!req.session.userId) return next();
    res.redirect('/dashboard');
};

export const isAuthenticated = isAuth;