var express = require('express');
var adminControllers=require('../controllers/admin.js')
var router = express.Router();


/* GET users listing. */
router.use((req,res,next)=>{
    if (req.session.username&&req.session.isAdmin) {
        next();
    }else{
        res.send({
            msg: '无管理员权限',
            status: -1,
        })
    }
})
router.get('/', adminControllers.index);
router.get('/userList',adminControllers.userList);



module.exports = router;