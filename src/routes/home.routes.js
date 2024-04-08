var express = require('express');
var router = express.Router();

var { 
    validateSignUp, 
    validateLogin, 
    handleLoginClient,
    handleSignUp
} = require('../middlewares/validateForm');
var homeController = require('../controllers/homeController');
var { 
    ensureAuth,
    forwardAuth,
    accountAuth } = require('../middlewares/authClient');

router.post('/login', validateLogin(), handleLoginClient, homeController.authenticateLogin, accountAuth);
router.post('/signup', validateSignUp(), handleSignUp, homeController.regiterNewUser);

router.get('/login', forwardAuth, homeController.login);
router.get('/logout', homeController.logout);
router.get('/signup', forwardAuth, homeController.signup);
router.get('/home', ensureAuth, homeController.home);
router.get('/room', ensureAuth, homeController.room);
router.get('/bookroom/:id', ensureAuth, homeController.bookroom);
router.post('/bookroom/:id', ensureAuth,homeController.bookroomSucess);

router.get('/detail/:id', ensureAuth, homeController.detail);
router.get('/bill', ensureAuth, homeController.bill);
router.get('/history/', ensureAuth, homeController.history);
router.get('/history/:id', ensureAuth, homeController.historyDetail);

router.get('/', (req, res) => {
    res.redirect('home');
});



module.exports = router;