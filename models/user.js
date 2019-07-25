const mongoose=require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex',true);

const UserSchema = new Schema({
    user_id: Number,
	username: {type:String,required:true,index:{unique:true}},
    password: {type:String,required:true},
    email:{type:String,required:true,index:{unique:true}},
    date : {type:Date,default:Date.now()},
    isAdmin: {type: Boolean,default: false},
    isFreeze:{type: Boolean,default: false},
});
const UserModel=mongoose.model('user',UserSchema);
UserModel.createIndexes();

const save=(data)=>{
    const user=new UserModel(data);
    return user.save().then(()=>{
        return true;
    }).catch(()=>{
        return false;
    })
};

const findlogin=(data)=>{
    return UserModel.findOne(data);
};

const updatePassword=(email,password)=>{
    return UserModel.update({email},{$set:{password}})
    .then(()=>{
        return true;
    }).catch(()=>{
        return false;
    })
}

const userList=()=>{
    return UserModel.find();
}

module.exports={
    save,
    findlogin,
    updatePassword,
    userList,
}

