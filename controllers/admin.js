var userModel=require('../models/user');
const index=async (req,res,next)=>{
    res.send({
        msg: '管理员权限',
        status: 0,
    })
}

const userList=async (req,res,next)=>{
    var result=await userModel.userList();
    if (result) {
        res.send({
            msg:'获取用户列表成功',
            status: 0,
            data:{
                userlist:result,
            },
        })
    }else{
        res.send({
            msg: '获取用户列表失败',
            status:-1,
        })
    }
}

module.exports={
    index,
    userList
}