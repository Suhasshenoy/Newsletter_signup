const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
//to send static pages
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});


app.post("/",(req,res)=>{
    var fname = req.body.fname
    var lname = req.body.lname;
    var email = req.body.email;
    const url = " https://us10.api.mailchimp.com/3.0/lists/d8ffaffb47";
    var da = {
        members : [{
            email_address :email,
            status : "subscribed",
            merge_fields : {
                FNAME: fname,
                LNAME: lname
            }
        }]
    };
    var d = JSON.stringify(da);


    var options = {
        auth : "myapi:b67d22af23beb3d8f7685d1dfe2685db-us10",
        method :"POST"

    }
    var request = https.request(url,options,function(response){
       if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
       }
       else{
        res.sendFile(__dirname+"/failure.html");
       }

        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })
    request.write(d);
    request.end();
   
})
app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT||3000,()=>{
    console.log("Server started at port 3000");
})

//api key -b67d22af23beb3d8f7685d1dfe2685db-us10

//audience id-d8ffaffb47