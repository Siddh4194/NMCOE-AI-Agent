////////// packages -----------------------------------------------
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const {chatData_All} = require("./gemini");
const cors = require("cors");
const env = require('dotenv').config();
// authentication tokens
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const { GoogleGenerativeAI } = require("@google/generative-ai");
const mailSender = require("./sendMail");
// const GoogleUser = require("./googleSchema");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// google oauth
require('./auth');





var pass = process.env.DB_PASSWORD;

mongoose.connect(pass, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a new MongoDBStore
const store = new MongoDBStore({
  uri: pass,
  collection: 'sessions',
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// student schema created

const studentSchema = new mongoose.Schema({
  name : String, //we can specify only true also  and [true,"check the entered data"] also like this
  whatsapp_no :{
    type : Number
  }, 
  email :String,
  added_AT:Date
});

const Student = mongoose.model("Student",studentSchema);


// Prediction insights
const collectionSchema = new mongoose.Schema({
  predictedQueNo : Number,
  accuracy:Number,
  userquestion:String,
  added_AT:Date
});

// wrong answers
const wrongAnswer = mongoose.model("WrongAnswer", collectionSchema);

const badResponceSchema = new mongoose.Schema({
  userInput1:String,
  botResponce1:String,
  added_AT:Date
});

// /bad responce
const badResponse = mongoose.model("BadResponse", badResponceSchema);

// good response
const goodResponceSchema = new mongoose.Schema({
  userInput:String,
  botResponce:String,
  added_AT:Date
});

const goodResponse = mongoose.model("GoodResponse", goodResponceSchema);

// Feedtext response

const feedbackSchema = new mongoose.Schema({
  Rating:Number,
  Catagory:String,
  feedText:String,
  added_AT:Date
});

const FeedBack = mongoose.model("FeedBack", feedbackSchema);
// initialized the express

const app = express();
app.use(
  express.urlencoded({ extended: true })
);




// 	{
//   origin: 'https://aptous-nmce.vercel.app',
//   credentials: true, // Set to 'true' to allow credentials (cookies, HTTP authentication) to be sent with requests
// }
  
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This line is sufficient for parsing URL-encoded data
// cors policy
app.use(cors({
  origin: 'https://aptous-nmce.vercel.app',
  credentials: true,
}));

// Making Creadentials
app.use(session({
  secret:process.env.SECRETKEY,
  resave:false,
  saveUninitialized:true,
  store:store,
  // credentials:true
}))
app.use(passport.initialize());
app.use(passport.session());



// // Initialize the view engine
// app.set("view engine", "ejs");
// app.set('view options', {
//   strict: true,
//   destructuredLocals: ["user", "timestamp"],
// });
// // app.set('views', './views')


app.use('/predict', cors({
  origin: 'https://aptous-nmce.vercel.app',
  credentials: true,
}));


// student data is posted
app.post("/post",function(req,res){
  var name = req.body.name;
  var wpno = req.body.no;
  var email = req.body.mail;
  var newStudent = new Student({
    name:name,
    whatsapp_no:wpno,
    email:email,
    added_AT:new Date()
  });
  newStudent.save();
  res.send({response:"success"});
});


app.post("/downthumb",(req, res) => {
  var bad = new badResponse({
    userInput1:req.body.userInput,
    botResponce1:req.body.botResponce,
    added_AT:new Date()
  })
  bad.save();
  res.send({response:"success"});
});

app.post("/upthumb",(req, res) => {
  var good = new goodResponse({
    userInput:req.body.userInput,
    botResponce:req.body.botResponce,
    added_AT:new Date()
  });
  good.save();
  res.send({response:"success"});
});

app.post("/feeddata",(req, res) => {
  var feed = new FeedBack({
    Rating:req.body.rating,
    Catagory:req.body.catagory,
    feedText:req.body.feedText,
    added_AT:new Date()
  })
  feed.save();
  res.send({response:"success"});
})

//creating the file for nural network

// the user unput is fetched and give back the predictios.
let chatInstance;
async function run(string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  console.log(chatData_All[chatData_All.length - 1]);
  chatInstance = model.startChat({
    history: [
      {
        role: "user",
        parts: chatData_All
        // ["Developed by Siddhant Dhanaji Kadam student at NMCOE.Peth To assist student to give the positive fedback for there further jurney","programmed by Siddhant Dhanaji Kadam, And programmed in such way that I can Guide students for there admission process and many more"],
      },
      {
        role: "model",
        parts: "Great to meet you. What would you like to know?",
      },
    ],
    generationConfig: {
      maxOutputTokens: 400,
    },
  });
  const result = await chatInstance.sendMessage(string);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
  // console.log("model is loaded successfully");
}

async function renderModelReply(string){
  const result = await chatInstance.sendMessage(string);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

app.post("/predict",async (req,res) => {
  // res.setHeader('Access-Control-Allow-Origin', 'https://aptous-nmce.vercel.app');
  // res.setHeader('Access-Control-Allow-Credentials', 'true');
  console.log(req.body.input);
  let pred = await run(req.body.input);
  res.send({responce:pred});
});

app.post("/api/predict",async (req,res) => {
  console.log(req.body.input);
  let pred = await run(req.body.input);
  res.send({responce:pred});
});

app.post("/wrongAnswer",(req, res) => {
  var newQue = new wrongAnswer({
    predictedQueNo:req.body.predQue,
    accuracy:req.body.accuracy,
    userquestion:req.body.userInput,
    added_AT:new Date()
  });
  newQue.save();
    res.send({response:"Your Question is stored to process. I'll process it shortly."});
});


app.get('/getStatus',(req,res)=>{
try {
  require.resolve('@google/generative-ai');
  res.send('Package is installed.');
} catch (error) {
  res.send('Package is not installed.');
}
	// res.send(chatData_All);
// res.sendFile("public/chatbot.html");
	// res.render("chatbot");
	  // res.render("chatbot");
});

  
////////// server  -----------------------------------------------
// main page render
app.get('/',(req,res)=>{
    res.send("Aptous4");
// res.sendFile("public/chatbot.html");
	// res.render("chatbot");
	  // res.render("chatbot");
});




// possport and required things are going to use
const UserSchema = new mongoose.Schema({
  email:String,
  name:String,
  password:String
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('UserStudent', UserSchema);

passport.use(User.createStrategy());

// PASSPORT SERIALIZATION
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Catch errors in the MongoDBStore
store.on('error', function (error) {
  console.log(error);
});


app.post('/login', function(req,res){
  const user = new User({
      username: req.body.username,
      password: req.body.password
  });
  passport.authenticate('local', function(err) {
    if (err) {
      // Handle authentication error
      console.error(err);
      res.status(401).send({ status: false, message: err.message });
    }
    else {
      // Authentication successful, log in the user and send response
      req.login(user, function(err) {
        if (err) {
          console.error(err);
          return res.status(400).send({ status: false, message: err.message });
        }
        res.send({ status: true, message: 'Successfully logged in' });
      });
    }
  })(req, res);
})

app.get('/logout', function(req, res){
  req.logout((err)=>{
    err ? 
    res.status(500).send({  status:"Error",message:"logOut Failed"})
    :
    res.send({status:"Logged Out"});
  });
  // res.send({status:'logout'});
})

app.get('/checkAuth', function(req, res) {
  if (req.isAuthenticated()) {
    res.send({ status: true, user: req.user });
    console.log('Authorized user');
  } else {
    res.send({ status: false });
    console.log('Unauthorized user');
  }
});

app.post('/register', async function (req, res) {
  const { email,password,name } = req.body;
  let username = email;
  console.log(req.body);
  try {
    // Server-side validation (optional)
    if (!username || !password) {
      throw new Error('Missing required fields: username or password');
    }

    // Register user with Passport
    const user = await User.register({ username: username,name:name}, password);
    passport.authenticate('local', function(err) {
      if (err) {
        // Handle authentication error
        console.error(err);
        res.status(401).send({ status: false, message: err.message });
      }
      else {
        // Authentication successful, log in the user and send response
        req.login(user, function(err) {
          if (err) {
            console.error(err);
            return res.status(400).send({ status: false, message: err.message });
          }
          res.send({ status: true, message: 'Successfully logged in' });
        });
      }
    })(req, res);
  } 
  catch (error) {
    console.error(error);
    res.status(400).send({ status: false, message: error.message });
  }
});


function generateRandomNumber() {
  // Generate a random number between 100000 and 999999
  return Math.floor(Math.random() * 900000) + 100000;
}
let randomServerNumber = null;
// Example usage
// sendMail.js

app.post('/sendemail', async (req, res) => {
  try {
    randomServerNumber = generateRandomNumber();

    // Check if req.body.email is a valid email address
    if (!isValidEmail(req.body.email)) {
      throw new Error('Invalid email address');
    }

    await mailSender(req.body.email, randomServerNumber.toString());
    res.send({ status: true, message: randomServerNumber });
  } catch (e) {
    console.error(e);
    res.status(500).send({ status: false, message: e.message });
  }
});

// Function to check if the email address is valid
function isValidEmail(email) {
  // Implement your own email validation logic or use a library like 'validator'
  // For a simple check, you can use a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.post('/checkOtp', (req, res) =>{
  // Convert to string
  console.log(req.body);
  if(req.body.otp === randomServerNumber.toString()) {
    res.send({status: true})
  } else{
    console.log(randomServerNumber);
    res.send({status: false})
  }
})

const googleUserSchema = new mongoose.Schema({
  email:String,
  name:String,
});

const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/failure' }),
   (req, res) => {
	// const email = req.user.email;
	
	// // Check if a user with the given email already exists
	// const existingUser =  GoogleUser.findOne({ email:email });
	
	// if (existingUser) {
	// // User with the given email already exists
	// // Redirect to the frontend failure route or handle accordingly
	// return res.redirect(`https://aptous-nmce.vercel.app/auth/success`);
	// }
	
	// // Create a new user and save it to the database
	// const newUser = new GoogleUser({
	// email: req.user.email,
	// name: req.user.displayName,
	// });
	
	// await newUser.save();

    // Redirect to the frontend success route along with user details
    res.redirect(`https://aptous-nmce.vercel.app/auth/success`);
  }
);


// Custom middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get('/auth/google/success', (req, res) => {
  console.log(req.user);
  res.send(`Authentication with Google was successful! of ${req.user}`);
});

// Route for handling failed Google authentication
app.get('/auth/google/failure', (req, res) => {
  res.redirect(`https://aptous-nmce.vercel.app/auth/fail`);
});

// Protected route that requires authentication
app.get('/auth/protected', isLoggedIn, (req, res) => {
  const name = req.user.displayName;
  res.send(`Hello ${name}, you are authenticated!`);
});


app.listen(process.env.PORT || 3001 , function() {
    console.log("Server started on port 3001");
	// run();
});
