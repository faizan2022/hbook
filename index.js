const express = require("express");
const bodyParser = require("body-parser");
const https = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  // res.sendFile(__dirname + "/index.html");
  const pinAPI = "https://cdn-api.co-vin.in/api/v4/appointment/sessions/findByPin?pincode=825301&date=" + Date.now();
  console.log(pinAPI);
    https.get(pinAPI, function(response){
        response.on("data", function(data){
            const pinResult = JSON.parse(data);
            // res.send(pinResult);
            console.log(pinResult);
        })
    })
});

app.post("/", function(req, res){
  var pin = req.body.pin;
  var district = req.body.district;
  var calenderPin = req.body.calenderPin;
 
//   const pinAPI = "https://cdn-api.co-vin.in/api/v4/appointment/sessions/findByPin?pincode=" + pin + "&date=" + Date.now();
//   const districtAPI = "https://cdn-api.co-vin.in/api/v4/appointment/sessions/findByDistrict?district_id=" + district + "&date=" + Date.now();
//   const calenderPinAPI = "https://cdn-api.co-vin.in/api/v4/appointment/sessions/calendarByPin?precaution_flag=true&pincode=" + calenderPin + "&date=" + Date.now();


  if((pin !== undefined) && (pin !== null) && (pin !== "")){
    const pinAPI = "https://cdn-api.co-vin.in/api/v4/appointment/sessions/findByPin?pincode=" + pin + "&date=" + Date.now();
    https.get(pinAPI, function(response){
        response.on("data", function(data){
            const pinResult = JSON.parse(data);
            res.send(pinResult);
        })
    })
    
  }
  else if ((district !== undefined) && (district !== null) && (district !== "")){
    const districtAPI = "https://cdn-api.co-vin.in/api/v4/appointment/sessions/findByDistrict?district_id=" + district + "&date=" + Date.now();
    https.get(pinAPI, function(response){
        response.on("data", function(data){
            const districtResult = JSON.parse(districtAPI);
            res.send(districtResult);
        })
    })
  }
  else if ((calenderPin !== undefined) && (calenderPin !== null) && (calenderPin !== "")){
    const calenderPinAPI = "https://cdn-api.co-vin.in/api/v4/appointment/sessions/calendarByPin?precaution_flag=true&pincode=" + calenderPin + "&date=" + Date.now();
    https.get(pinAPI, function(response){
        response.on("data", function(data){
            const calenderPinResult = JSON.parse(calenderPinAPI);
            res.send(calenderPinResult);
        })
    })
  }
  else{
    //catch unwanted
  }

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
