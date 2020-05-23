const app = require("express")();
app.get("/", (req, res) =>{
    res.setHeader("set-cookie",['sessionid={"sessionid":"adsf"}',"welcome=100"]);
    res.sendFile(`${__dirname}/index.html`);
});

app.get("/path1",(req,res)=>{
    res.send(`Path1 got these cookies${req.headers.cookie}`);
});

app.get("/path2",(req,res)=>{
    res.send(`Path2 got these cookies${req.headers.cookie}`);
});

app.listen(8080, ()=>console.log("Listening"));