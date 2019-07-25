var {Email}=require('../untils/config.js');
var UserModel=require('../models/user');

const login=async (req,res,next)=>{
    var { username , password }=req.body;
    var result=await UserModel.findlogin({
        username,password
    });
    if(result){
        req.session.username=username;
        req.session.isAdmin=result.isAdmin;
        res.send({
            msg:"登录成功",
            status: 0,
            user: username,
        });
      
    }else{
        res.send({
            msg:"登录失败",
            status: -1,
        });
    }

};

const register=async (req,res,next)=>{
    var { username, password, email, verify}=req.body;
    if (email!==req.session.email&&verify!==req.session.verify) {
        res.send({
            msg:"验证码错误",
            status: -1,
        });
    }
    var result=await UserModel.save({
        username,password,email
    });
    if(result){
        res.send({
            msg:"注册成功",
            status: 0,
        });
    }else{
        res.send({
            msg:"注册失败",
            status: -2,
        });
    }
};

const verify=async (req,res,next)=>{
   var email=req.query.email;
   var verify=Email.verify;

   req.session.email=email;
   req.session.verify=verify;
// //    console.log(email+verify);
   var mailOptions={
    from: "喵喵网 867698328@qq.com", // sender address
    to: email, // list of receivers
    subject: "喵喵网邮箱验证码", // Subject line
    text: "验证码："+verify, // plain text body
   };

   Email.transporter.sendMail(mailOptions,(err)=>{
    if(err){
        console.log(err);
        res.send({
            msg: "验证码发送失败",
            status:-1,
        });
    }else{
        res.send({
            msg: "验证码发送成功",
            status: 0,
        });
    }
   });
};

const logout=async (req,res,next)=>{
    req.session.username='';
    res.send({
        msg : "用户已退出",
        status : 0,
    })

};

const getUser=async (req,res,next)=>{
    if (req.session.username) {
        res.send({
            msg: "获取用户信息成功",
            data:{
                user: req.session.username,
                isAdmin:req.session.isAdmin,
            },
            status: 0
        });
    }else{
        res.send({
            msg: "获取用户信息失败",
            status: -1
        })
    }

};

const findPassword=async (req,res,next)=>{
    var{email,password,verify}=req.body;
    if (email===req.session.email&&verify===req.session.verify) {
        var result=await UserModel.updatePassword(email,password);
        if (result) {
            res.send({
                msg: "修改密码成功",
                status: 0,
            });
        }else{
            res.send({
                msg: "修改密码失败",
                status: -1,
            });
        }
    }else{
        res.send({
            msg: "验证码错误",
            status: -1,
        });
    }
};

module.exports={
    login,
    register,
    verify,
    logout,
    getUser,
    findPassword,
}