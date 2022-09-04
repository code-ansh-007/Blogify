import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    name: String,
    title: String,
    text: String,   
    imgSrc: String
})

export default BlogPostSchema;