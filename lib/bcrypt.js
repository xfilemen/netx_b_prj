import bcrypt from "bcrypt";

const saltRounds = 10;
const bcryptObj = {
    genSalt : function(){
        return bcrypt.genSaltSync(saltRounds);
    },
    hash : function(inputPassword, salt){
        return bcrypt.hashSync(inputPassword, salt);
    },
    compare : function (inputPassword,userPassword) {
        return bcrypt.compareSync(inputPassword, userPassword);
    }
}



export default bcryptObj;