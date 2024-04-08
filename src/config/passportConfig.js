var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var User = require('../models/user.model');


module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, async (username, password, done) => {
        if (username == null) return done(null, false, { message: 'Bạn chưa nhập tên đăng nhập.' });
        if (password == null) return done(null, false, { message: 'Bạn chưa nhập mật khẩu.' });

        await User.findOne({ username }).exec()
            .then(user => {
                if (!user) return done(null, false, { message: 'Sai tên đăng nhập hoặc mật khẩu.' });
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) return done(null, false, { message: err.message });
                    if (!isMatch) return done(null, false, { message: 'Sai tên đăng nhập hoặc mật khẩu.' });
                    
                    return done(null, user);
                });
            })
            .catch(err => {
                return done(null, false, { message: err.message });
            });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById({ _id: id }).then((user) => {
            done(null, user);
        });
    });
}