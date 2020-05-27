const app = require("express")();
app.get("/", (req, res) =>{
    res.setHeader("set-cookie",['sessionid={"sessionid":"adsf"}',"another=123","welcome=100; samesite=strict; max-age=30min","jscannotseethis=12345; httponly"]);
    res.sendFile(`${__dirname}/index.html`);
});

app.get("/img",(req,res)=>{
    res.setHeader("set-cookie",["imagetrackingset=true"]);
    res.sendFile(`${__dirname}/cookie.jpg`);
});

app.get("/path1",(req,res)=>{
    res.send(`Path1 got these cookies${req.headers.cookie}`);
});

app.get("/path2",(req,res)=>{
    res.send(`Path2 got these cookies${req.headers.cookie}`);
});

app.get("/cookiecollector",(req,res)=>{
    console.log(req.headers.cookie);
    res.send("{}");
});

app.get("/steal",(req,res) =>{
    console.log(`Got the cookie ${req.query.c}`);
    res.sendStatus(200);
});

app.listen(8080, ()=>console.log("Listening"));