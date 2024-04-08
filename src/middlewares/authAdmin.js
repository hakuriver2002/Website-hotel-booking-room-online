const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    res.redirect('/admin/login');
}

const forwardAuth = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
        return next();
    }
    res.redirect('/admin/dashboard');
}

const accountAuth = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        req.flash('success', 'Đăng nhập tài khoản thành công!');
        res.redirect('/admin/dashboard');
    } else {
        req.logout(function (err) {
            if (err) { return next(err); }
            req.flash('error', 'Sai tên đăng nhập hoặc mật khẩu.');
            res.redirect('/admin/login');
        });
    }
}

module.exports = {
    ensureAuth,
    forwardAuth,
    accountAuth
};