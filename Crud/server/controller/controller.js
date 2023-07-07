const collection = require('../../database/mongodb');
var Userdb = require('../model/model')
const bcrypt = require('bcryptjs');

//signUp and  save user details into database...
exports.signUpUser = async (req, res) =>{
  
    const { username, password } = req.body;
    let user = await collection.findOne({username})
    if(user) {
        // return res.redirect('/signup');!!!
        return res.render("signup", { message: "Username already exists" });

    }
    const hashPsw = await bcrypt.hash(password, 12);

    user = new collection({
        username,
        password:hashPsw
    })
    await user.save();
    res.redirect('/login');
}

exports.loginUser = async (req, res) => {
    
    const { username, password } = req.body;
    const user = await collection.findOne({username});
   
    if(!user){
        
        // return res.redirect('/login');!!
        return res.render("signup", { message: "Username not found" });
       
    }
   
    const isMatch = await bcrypt.compare(password, user.password);
   
    if(!isMatch){
        return res.render("login", { message: "Incorrect password" });
    }
    else
    {
     req.session.userId= user._id 
    return res.redirect('/api/users');
    }
    
}

exports.sessionChecker = async (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
}



// create and save new user
exports.create = (req, res) => {
    //validate
    if(!req.body){
        res.status(400).send({message:"content can't be empty"});
        return;
    }
    // new user
    const user = new Userdb({
        userId:req.session.userId,
        name:req.body.name,
        department:req.body.department,
        phone:req.body.phone,
    })

    // save user in database
    user.
        save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message || "Some error occurred while creating a create operation"
            });
        });
}

// write and return all users / 
exports.find = (req, res) => {


    // }else{
    
        Userdb.find({userId:req.session.userId})
        .then(user => {
            // console.log(user);
           // res.send(user)
        //    console.log("asbefewf");
           res.render("index",{users:user})
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || "Error occurred while retriving a user information"
            });
        })
    }
//}


// update a new identified user by user id
exports.update = (req, res) => {
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to Update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data => {
        if(!data){
            res.status(404).send({message:`Cannot Update User With ${id}. Maybe User not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message:"Error update user informatiom"})
    })
}

// Delete a user
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message:`Cannot Delete User With ${id}. Maybe id is wrong`})
        }else{
            res.send({
                message:"User was deleted successfully!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({message:"Could not delete user with id="+id});
    });

}
exports.showUpdateDetails=async (req,res)=>{
    try {
        let id = req.query.id;
        let UserDetails = await Userdb.findOne({ _id: id });
        if (UserDetails) {
            res.render('update_user.ejs', { user: UserDetails })
        }
        else {
            res.send("No data found");
        }

    }
    catch (e) {
        console.log(e);
    }
}


