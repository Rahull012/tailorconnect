const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());


const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://rahulgorinta2002:rahul12@cluster0.doit0oj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB connection error", err);
});

const User = require('./models/user.model');
const tailorData = require('./models/tailor.model');
const db=mongoose.connection;


const R = 6371; 

function calculateDistance(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
}



app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/api/register', async(req, res) => {
    const { name, password, confirmpassword } = req.body;
    if(!name || !password || !confirmpassword){
        return res.status(422).json({error:"Please fill all the fields"});
    }

    if(password != confirmpassword){
        return res.status(422).json({error:"Password and Confirm Password does not match"});
    }
    else
    {
    
    try{
         const user= await User.create({
            name:req.body.name,
            password:req.body.password,
        });
       return res.json({status:"ok", message:"User registered successfully"});

     
        
    }
    catch(err){
        console.log(err);
       return res.json({status:"error", message:"Email already exists"});
    }
}
});


app.post('/api/login', async(req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(422).json({ error: "Please provide username and password" });
    }

    try {
        const user = await User.findOne({
            name:name
        }).then((data) => {
            if (data.password === password) {
                return data;
            } else {
                return null;
            }
        });

       if(user)
       {
        return res.json({status:'ok',name:name})
       }
       
    } catch (err) {
        console.log(err);
       return res.json({ status: "error", message: "Invalid Credent" });
    }
    
   
});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
     user: 'rahuldeveloper070@gmail.com',
     pass: 'cjljbdciuekpuhld'
    },
    tls: {
      rejectUnauthorized: false,
     },

   });
 
   const sendEmail = (email, token) => {
    const mailOptions = {
     from: 'rahuldeveloper070@gmail.com',
     to: email,
     subject: 'Email verification',
        html: `<h1>Email Verification</h1>
        <h2>Hello User</h2>
        <p>Thanks for registering into our website</p>
        <p>Please enter this OTP to verify your email</p>
        <h1>${token}</h1>
        </div>`,
   };
 
   transporter.sendMail(mailOptions, function (error, info) {
     if (error) {
       console.log('Error in sending email  ' + error);
       return true;
     } else {
      console.log('Email sent: ' + info.response);
      return false;
     }
    });
   };

app.post('/api/tailorRegistration', async(req, res) => {
    const { name, email, location } = req.body;

    const generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();


    if(!name || !email || !location){
        return res.status(422).json({error:"Please fill all the fields"});
    }
    else
    {
    
    try{
         const tailor= await tailorData.create({
            name:req.body.name,
            email:req.body.email,
            location:req.body.location,
            password:req.body.password,
            emailVerified:false,
            otp: generatedOTP,
            otpExpiration: Date.now() + 600000,
            Number:req.body.Number,
            url:req.body.url,
            rating:0,
            count:0,
            currentrating:0,
        });
       const sentmail= await sendEmail(req.body.email, generatedOTP);

       return res.json({status:"success", message:"Tailor registered successfully"});

      
       
    }
    catch(err){
        console.log(err);
       return res.json({status:"error", message:"Email already exists"});
    }
}
});


app.post('/api/verifyOTP', async(req, res) => {
    const { email, otp } = req.body;

    try {
        const tailor = await tailorData.findOne({
            email: email,
        }).then((data) => {
            if (data.otp === otp && data.otpExpiration > Date.now()) {
                return data;
            } else {
                return null;
            }
        });


       if(tailor)
       {
        await tailorData.updateOne({ email: email }, { emailVerified: true });
        return res.json({status:'ok', message:"OTP verified successfully"})
       }
       else{
        return res.json({status:'error', message:"Invalid OTP"})
       }
       
    } catch (err) {
        console.log(err);
       return res.json({ status: "error", message: "Invalid Credent" });
    }
});




  app.get('/api/nearbyTailors', async(req, res) => {
    const { latitude, longitude } = req.query;
    
    try{
        const tailors=await tailorData.find();

        const nearbyTailors = tailors.filter((tailor) => {
            const distance = calculateDistance(
              parseFloat(latitude),
              parseFloat(longitude),
              parseFloat(tailor.location.latitude),
              parseFloat(tailor.location.longitude)
            );
            return distance <= 500; 
          });
          return res.json({ status: 'success', data: nearbyTailors });
    }
    catch(err){
        console.log(err);
       return res.json({status:"error", message:"Email already exists"});
    }
   
});


app.post('/api/tailorlogin', async(req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(422).json({ error: "Please provide email and password" });
    }

    try {
        const tailor = await tailorData.findOne({
            name:name,
        }).then((data) => {
            if (data.password === password&&data.emailVerified==true) {
                return data;
            } else {
                return null;
            }
        });

       if(tailor)
       {
        return res.json({status:'ok',currentrating:tailor.currentrating});
       }
       else{
        return res.json({status:'error', message:"Invalid Credent"})
       }
       
    }catch (err) {
        console.log(err);
       return res.json({ status: "error", message: "Invalid Credent" });
    } 
   
});


app.get('/api/tailors/:tailorId', async(req, res) => {
    const { tailorId } = req.params;

    try {
        const tailor = await tailorData.findOne({
            email: tailorId,
        });
        return res.json({ status: 'success', data: tailor });
    } catch (err) {
        console.log(err);
        return res.json({ status: 'error', message: 'Invalid Tailor ID' });
    }
});


app.post('/api/rate', async(req, res) => {
     const{rating , name}=req.body;

     const tailor=await tailorData.findOne({
            name:name
        });
        const count=tailor.count;
        const rating1=tailor.rating;
        const newrating=rating1+rating;
        const newcount=count+1;
        const newcurrentrating=newrating/newcount;
        await tailorData.updateOne({ name: name }, { rating: newrating,count:newcount,currentrating:newcurrentrating });
        return res.json({ status: 'ok', message: 'rated successfully' });
});





app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
