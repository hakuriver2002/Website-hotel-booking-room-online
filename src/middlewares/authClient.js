const ensureAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    
    if (req.isAuthenticated() && req.user.role === 'client') {
        return next();
    } else if (req.isAuthenticated() && req.user.role !== 'client') {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/home');
        });
    } else {
        res.redirect('/login');
    }
}

const forwardAuth = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== 'client') {
        return next();
    }
    res.redirect('/home');
}

const accountAuth = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'client') {
        req.flash('success', 'Đăng nhập tài khoản thành công!');
        res.redirect('/home');
    } else {
        req.logout(function (err) {
            if (err) { return next(err); }
            req.flash('error', 'Sai tên đăng nhập hoặc mật khẩu.');
            res.redirect('/login');
        });
    }
}

module.exports = {
    ensureAuth,
    forwardAuth,
    accountAuth
};