const express = require('express');
const path = require('path');
const cors = require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true, //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express();

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.static(__dirname + '/dist/proyecto-frontend'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/proyecto-frontend/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log("Server running on port 5000...");
});