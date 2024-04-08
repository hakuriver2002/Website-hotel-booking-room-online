var express = require('express');
var router = express.Router();
var { ensureAuth, forwardAuth, accountAuth} = require('../middlewares/authAdmin');
var { validateLogin, handleLoginAdmin } = require('../middlewares/validateForm');
var adminController = require('../controllers/adminController');

// router.get('/profile/:id',adminController.profile);

router.post('/login', validateLogin(), handleLoginAdmin, adminController.authenticateLogin, accountAuth);

router.get('/login', forwardAuth, adminController.login);
router.get('/logout', adminController.logout);

// Trang quản lý khách hàng
router.get('/customers', ensureAuth, adminController.customer_manage);
router.get('/customers/:username', ensureAuth, adminController.customer_detail);
router.get('/customers/update/:username', ensureAuth, adminController.customer_edit);
router.post('/customers/update/:username', ensureAuth, adminController.update_customer);
router.delete('/customers/delete/:id', ensureAuth, adminController.delete_customer);

// Trang quản lý loại phòng
router.get('/room_types', ensureAuth, adminController.room_type_manage);
router.post('/room_types', ensureAuth, adminController.create_room_type);
router.post('/room_types/update/:id', ensureAuth, adminController.update_room_type);
router.delete('/room_types/delete/:id', ensureAuth, adminController.delete_room_type);

// Trang quản lý phòng
router.get('/rooms', ensureAuth, adminController.room_manage);
router.get('/rooms/create', ensureAuth, adminController.room_create);
router.post('/rooms/create', ensureAuth, adminController.create_room);
router.get('/rooms/:room_code', ensureAuth, adminController.room_edit);
router.post('/rooms/:room_code', ensureAuth, adminController.update_room);
router.delete('/rooms/delete/:id', ensureAuth, adminController.delete_room);

router.get('/rooms/room_codes/:floor', ensureAuth, adminController.getCodeRoom);

// Trang quản lý đơn đặt phòng
router.get('/orders', ensureAuth, adminController.order_manage);
router.get('/orders/:book_id', ensureAuth, adminController.order_detail);
router.post('/orders/:book_id', ensureAuth, adminController.update_order);

router.get('/dashboard', ensureAuth, adminController.dashboard);
router.get('/calendar', ensureAuth, adminController.calendar);

router.get('/', (req, res) => {
    res.redirect('dashboard');
});

module.exports = router;

