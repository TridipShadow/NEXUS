const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "random1234";
const { UserModel, TodoModel } = require('./db');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3000;
mongoose.connect("mongodb+srv://godtridip2003:GfhYgphIsARvVhKU@cluster0.dakcx.mongodb.net/todo-app-database");
app.use(express.json());




app.use(cors({
  origin: 'http://localhost:3000', // Adjust as needed for your policy
  referrerPolicy: 'no-referrer'
}));

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/Landing.html');
});
app.get('/redir_to_match',function(req,res){
  res.sendFile(__dirname + '/match.html');
});
// app.get('/img',function(req,res){
//   res.sendFile(__dirname + '/profile.avif');
// })

app.post('/signup', async function(req, res) {

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    try {
        await UserModel.create({
            email,
            password,
            name
        });
        res.json({
            message: "you are signed up"
        })
    }
    catch{
        res.status(400).json({
            message: "email already exists"
        });
        return;
    }

    
});

// app.get('/predict/:team1/:team2/:i', function(req, res){
//     const team1 = (req.params.team1).trim();
//     const team2 = (req.params.team2).trim();
//     const i = req.params.i;
//     console.log("here")
//     res.sendFile(__dirname + `/predict.html?team1=${team1}&team2=${team2}&i=${i}`);
// })

app.get('/predict.html',function(req,res){
  res.sendFile(__dirname + '/predict.html');
})
// app.post('/login', async function(req, res) {
//     const email = req.body.email;
//     const password = req.body.password;

//     const user = await UserModel.findOne({
//         email:email,
//         password:password
//     })
//     console.log(user);
//     if(user) {
//         const token = jwt.sign({
//             id: user._id
//         },JWT_SECRET);

//         res.header("token" , token);
//         res.json({
//             // token,
//             message:"you are signed in"
//         }); 
//     }
//     else{
//         res.status(403).json({
//             message:"Incorrect credential"
//         });
//     }
// });
app.get('/redir_to_ind',function(req,res){
  res.sendFile(__dirname + '/index.html');
})
app.get('/loged_user',function(req,res){
    res.sendFile(__dirname + '/loged_user.html');
})

app.post('/login', async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({ email: email, password: password });

    if (user) {
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, JWT_SECRET);

      // Update the user's authToken in the database
      user.authToken = token;
      await user.save();  // Save the updated user document

      // Send the token in the response header and a success message
      res.json({
        token : token,
        message: 'You are signed in',
      });
      
    //   res.redirect('/loged_user');
    } else {
      res.status(403).json({
        message: 'Incorrect credentials',
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log("http://localhost:3000")
});