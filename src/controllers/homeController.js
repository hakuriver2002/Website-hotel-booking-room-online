var passport = require('passport');
var bcrypt = require('bcrypt');
var User = require('../models/user.model');
var Room = require('../models/room.model');
var BookRoom = require('../models/bookroom.model');
var RoomType = require('../models/room_type.model');
const cookieParser = require('cookie-parser');

async function getRoomType(room_type_id) {
    const room_type = await RoomType.findOne({ _id: room_type_id }).exec();
    return room_type;
}

async function getRoomCode(room_code_id) {
    const room_code = await Room.findOne({ room_code: room_code_id }).exec();
    return room_code;
}
class HomeController {
    login(req, res, next) {
        res.render('client/login', {
            title: 'Login',
            layout: false,
        });
    }

    authenticateLogin(req, res, next) {
        passport.authenticate('local', {
            failureRedirect: '/login?error',
            failureFlash: true,
        })(req, res, next);
    }

    signup(req, res, next) {
        res.render('client/signup', {
            title: 'Signup',
            layout: false,
        });
    }

    async room(req, res, next) {
        try {
            const room = await Room.find();
            res.render('client/room', {
                title: 'Room',
                rooms: room
            });
        } catch (err) {
            console.log("Error:", err);
            next(err);
        }

    }
    // Form book room
    async bookroom(req, res, next) {
        const roomid = req.params.id;

        const room_types = await RoomType.find().exec();
        const types = room_types.map(room_type => {
            return {
                id: room_type._id,
                name: room_type.name
            }
        });

        try {
            const room = await Room.findOne({ room_code: roomid });
            res.render('client/bookroom', {
                title: 'Book now',
                room: room,
                room_types: types
            });
        } catch (err) {
            console.log("Error:", err);
            next(err);
        }

    }

    // Thong bao dat phong thanh cong
    async bookroomSucess(req, res, next) {
        const room_types = await RoomType.find().exec();
        const types = room_types.map(room_type => {
            return {
                id: room_type._id,
                name: room_type.name
            }
        });

        try {
            let username = '';
            if (req.user !== undefined) {
                username = req.user.username;
            } else {
                username = 'user_' + Date.now();
            }
            const id = req.params.id;
            const { checkin, checkout, adults, children, fullname, email, phone, note, room_type, totalPrice, payment } = req.body;
            const newBooking = new BookRoom({
                book_id: 'BR' + Date.now(),
                room_code: id,
                room_type: room_type,
                price: totalPrice,
                adult: adults,
                children: children,
                transaction_date: Date.now(),
                checkin: new Date(checkin),
                checkout: new Date(checkout),
                fullname: fullname,
                email: email,
                phone: phone,
                username: username,
                note: note,
                payment: payment,
                status_booking: 'pending',
                status_payment: 'pending'
            });
            await newBooking.save();

            await Room.findOneAndUpdate({ room_code: id }, { status: "reserved" }).exec();
            res.render('client/bill', {
                
                title: 'Bill',
                nameBill: "Đặt phòng thành công",
                username: username,
                billId: newBooking.book_id,
                checkin: checkin,
                checkout: checkout,
                name: fullname,
                email: email,
                phone: phone,
                room_type: room_type,
                roomid: id,
                adults: adults,
                children: children,
                note: note,
                price: totalPrice,
                room_types: types
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ error: error.message });
        }

    }
    // chi tiet phong
    async detail(req, res, next) {
        try {

            const roomID = req.params.id;
            const room = await Room.findOne({ room_code: roomID }).exec();
            if (!room) {
                return res.status(404).render('error', {
                    title: 'Not Found',
                    message: `Room with ID ${roomID} not found`,
                });
            }
            const room_types = await getRoomType(room.room_type);
            res.render('client/detailroom', {
                title: 'Detail Room ' + roomID,
                roomID: roomID,
                description: room.description,
                room_type: room_types.name,
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).render('error', {
                title: 'Server Error',
                message: 'An error occurred while processing your request',
            });
        }
    }


    bill(req, res, next) {
        res.render('client/bill', {
            title: 'Bill'
        });
    }
    // Xem lich su don hang da dat
    history(req, res, next) {
        const username = req.cookies.username;
        BookRoom.find({ username: username })
            .then((bookrooms) => {

                res.render("client/history", {
                    title: "Lịch sử đặt",
                    bookrooms: bookrooms,
                });
            })
            .catch((err) => {
                console.log("Error:", err);
                next(err);
            });
    }

    //Xem chi tiết đơn hàng
     historyDetail(req, res, next) {
        const username = req.params.username;
        const book_id = req.params.id;
        BookRoom.findOne({ book_id: book_id })
            .then(async (bookrooms) => {
                const room_code = await getRoomCode(bookrooms.room_code);
                const room_types = await getRoomType(room_code.room_type);

                res.render('client/bill', {
                    title: 'Bill',
                    nameBill: "Xem hóa đơn",
                    username: username,
                    billId: bookrooms.book_id,
                    checkin: bookrooms.checkin,
                    checkout: bookrooms.checkout,
                    name: bookrooms.fullname,
                    email: bookrooms.email,
                    phone: bookrooms.phone,
                    room_type: room_types.name,
                    roomid: bookrooms.room_code,
                    adults: bookrooms.adult,
                    children: bookrooms.children,
                    note: bookrooms.note,
                    price: bookrooms.price,
                });

            })
            .catch((err) => {
                console.log("Error:", err);
                next(err);
            });
    }
    async regiterNewUser(req, res, next) {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

        const existUsername = await User.findOne({ username: username }).exec();
        if (existUsername) {
            req.flash('error', 'Tên đăng nhập đã tồn tại.');
            return res.render('client/signup', {
                title: 'Signup',
                layout: false,
                username: username,
                email: email,
                password: password,
                confirm_password: confirm_password,
                messageFailure: req.flash('error')
            });
        }

        const existEmail = await User.findOne({ email: email }).exec();
        if (existEmail) {
            req.flash('error', 'Email đã tồn tại.');
            return res.render('client/signup', {
                title: 'Signup',
                layout: false,
                username: username,
                email: email,
                password: password,
                confirm_password: confirm_password,
                messageFailure: req.flash('error')
            });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptPassword = await bcrypt.hash(password, salt);

        // Create new account
        const user = new User({
            username: username,
            email: email,
            password: encryptPassword,
            role: 'client'
        });

        // Save account
        try {
            await user.save();
            req.flash('success', 'Đăng ký tài khoản thành công!');
            res.redirect('./login');
        } catch (err) {
            req.flash('error', err.message);
            res.redirect('./signup');
        }
    }

    logout(req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            req.flash('success', 'Đăng xuất tài khoản thành công!');
            res.redirect('./home');
        });
    }

    home(req, res, next) {
        res.render('client/home', {
            title: 'Home Page',
            user: req.user
        });
    }

}

module.exports = new HomeController();