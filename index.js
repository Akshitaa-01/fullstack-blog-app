const express=require("express");
const app=express();
const path=require("path");
const { v4 : uuidv4 }= require ('uuid');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

let port=8080;

let Blogs=[];

app.listen(port,()=>{
    console.log("app is listening");
});

app.get("/blogs",(req,res)=>{
    let recentBlogs = Blogs.slice(-6).reverse();
    res.render("index.ejs",{recentBlogs});
});

app.get("/blogs/new",(req,res)=>{
    res.render("write.ejs");
});

app.post("/blogs",(req,res)=>{
    let {writer,topic,content} = req.body;
    let id=uuidv4();;
    Blogs.push({writer,topic,content,id});
    res.redirect("/blogs");
});
app.get("/blogs/search",(req,res)=>{
    let query = req.query.q.toLowerCase();
    res.render("search.ejs");

});
app.get("/blogs/:id",(req,res)=>{
    let {id}=req.params;
    let blog=Blogs.find((b)=>id===b.id);
    res.render("see.ejs",{blog});
});