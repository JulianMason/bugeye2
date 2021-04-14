module.exports = {
    ensureAuth: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Login to access this page');
        res.redirect('/auth/login')
    },
    ensureGuest: function(req, res, next) {
        if(req.isAuthenticated()) {
            res.redirect('/dashboard');
        } else {
            return next();
        }
    }
}