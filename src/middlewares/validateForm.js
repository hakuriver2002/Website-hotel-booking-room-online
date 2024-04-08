var { check } = require('express-validator');
var { validationResult, matchedData } = require('express-validator');

let validateSignUp = () => {
    return [
        check('username', 'Tên đăng nhập không được để trống.').trim().not().isEmpty(),
        check('username').custom(value => !/\s/.test(value)).withMessage('Tên đăng nhập không được có khoảng cách.'),
        check('username').custom(value => /^[A-Za-z0-9(+\=\._-]+$/g.test(value)).withMessage('Tên không được chứa các ký tự đặc biệt.'),
        check('email', 'Email không được để trống.').trim().not().isEmpty(),
        check('email', 'Email không hợp lệ.').trim().isEmail(),
        check('password', 'Mật khẩu không được để trống.').trim().not().isEmpty(),
        check('password', 'Mật khẩu phải chứa ít nhất 6 ký tự.').trim().isLength({ min: 6 }),
        check('confirm_password', 'Mật khẩu xác nhận không được để trống.').trim().not().isEmpty(),
        check('confirm_password').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Mật khẩu xác nhận không khớp.');
            }
            return true;
        })
    ];
}

let validateLogin = () => {
    return [
        check('username', 'Tên đăng nhập không được để trống.').trim().not().isEmpty(),
        check('password', 'Mật khẩu không được để trống.').trim().not().isEmpty(),
    ];
}

let handleLoginAdmin = (req, res, next) => {
    const data = matchedData(req);
    let error = validationResult(req);
    if (!error.isEmpty()) {
        req.flash('error', error.array()[0].msg);

        return res.render('admin/login', {
            title: 'Login Dashboard',
            layout: false,
            username: data.username,
            password: data.password,
            messageFailure: req.flash('error'),
        });
    }
    return next();
}

let handleLoginClient = (req, res, next) => {
    const data = matchedData(req);
    let error = validationResult(req);
    if (!error.isEmpty()) {
        req.flash('error', error.array()[0].msg);

        return res.render('client/login', {
            title: 'Login',
            layout: false,
            username: data.username,
            password: data.password,
            messageFailure: req.flash('error'),
        });
    }
    return next();
}

let handleSignUp = (req, res, next) => {
    const data = matchedData(req);
    let error = validationResult(req);
    if (!error.isEmpty()) {
        req.flash('error', error.array()[0].msg);

        return res.render('client/signup', {
            title: 'Signup',
            layout: false,
            username: data.username,
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
            messageFailure: req.flash('error'),
        });
    }
    return next();
}


module.exports = {
    validateSignUp,
    validateLogin,
    handleLoginAdmin,
    handleLoginClient,
    handleSignUp
}