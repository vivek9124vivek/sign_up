const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
   

    const data = {

        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fiels: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]

    }
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/42df306ead"
    const options = {
        method: "POST",
        auth: "vivek:08bf73e331d7f4cfedb41151936d6a67-us21"
    }
    const request = https.request(url, options, function (response) {
           
        if(response.statusCode==200){
            res.send("Successfully subscribed!");
        }else{
            res.send("Please try again !")
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
                request.write(jsonData);
                request.end();
})

app.listen(3000, function () {
    console.log("server is listening on port 3000");
})


// api key 08bf73e331d7f4cfedb41151936d6a67-us21
//list id/audience id: 42df306ead
//hello i am adding comment to check github.