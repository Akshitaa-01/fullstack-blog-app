const express=require("express");
const app=express();
const path=require("path");
const { writer } = require("repl");
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
    res.render("Home.ejs",{recentBlogs});
});

app.get("/blogs/new",(req,res)=>{
    res.render("postBlog.ejs");
});

app.post("/blogs",(req,res)=>{
    let {writer,topic,content} = req.body;
    let id=uuidv4();;
    Blogs.push({writer,topic,content,id});
    res.redirect("/blogs");
});

app.get("/blogs/search",(req,res)=>{
    let search = req.query.q;
    if (!search) return res.redirect("/");
    const query = search.toLowerCase();

    const searchedBlogs = Blogs.filter(b =>
        b.writer.toLowerCase().includes(query) ||
        b.topic.toLowerCase().includes(query) ||
        b.content.toLowerCase().includes(query)
    );
   
    res.render("searchResult.ejs", { searchedBlogs, search });
});

app.get("/blogs/:id",(req,res)=>{
    let {id}=req.params;
    let blog=Blogs.find((b)=>id===b.id);
    res.render("inDetail.ejs",{blog});
});