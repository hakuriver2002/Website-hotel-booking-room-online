var express = require('express');
var router = express.Router();

/* GET products listing. */

router.route('/').get(protect, accessChat);
router.route('/').post(protect, fetchChats); // lich su
router.route('/product').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/productadd').put(protect, addToGroup);
router.route('/productdelete').put(protect, removeFromGroup);

module.exports = router;
