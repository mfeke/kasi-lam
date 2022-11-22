

module.exports = mongoose =>{
   const user = new mongoose.Schema({
    username: String,
    eamil:String,
    password:String,
    image:{
        type:String,
        required:false,
        default:"https://i.postimg.cc/024psJnk/1077114.png"
    },
    phone:{
        type: Number,
        required:false,
        default: 0
    },
    address:{
        type:String,
        required: false,
        default:" ",
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }]
   })

   user.method("toJSON", function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
   });

   
   const User = mongoose.model('users', user)

   return User
   
}