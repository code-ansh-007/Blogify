import express from "express";
import BlogPost from "../server.js";
import bodyParser from "body-parser";
import NewBlogPost from "../server.js";
import LikeBlogPost from "../server.js";
import RealBlogPost from "../server.js";
import Blog from "../server.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const router = express.Router();

router.get("/", (req, res) => { // this is the home component 
    res.send("This is the home route");
})

router.get("/feed", (req,res)=>{
    res.send("This is the feed route")
})

// router.post("/save", (req,res) => {
//   const Mydata = new BlogPost;
//    console.log("body: ",req.body);
//    try{

//    const BlogPost = BlogPost.create({
//     name,
//     title,
//     text
//    })
//    res.json({
//     msg: "we have successfully recieved your data"
//    }) 
//    } catch(err){
//     console.log(err);
//    }
//   // const newBlogPost = new BlogPost()
// })

// router.post("/save", async (req,res) => {
//   var myData = new BlogPost(req.body);
//   await myData.save()
//   .then(item => {
//     res.send("item saved to database")
//   })
//   .catch(err => {
//     res.status(400).send("Unable to save to database");
//   })
// })



router.get("/data", (req,res)=>{
    Blog.find()
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
      res.json(error);
    });
})

export default router;