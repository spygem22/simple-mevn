const Post = require('../models/post');
const fs = require('fs');

module.exports = class API {
    // all post
    static async fetchAllPost(req, res){
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    // get single
    static async fetchPostByID(req, res) {
        const id = req.params.id;
        try{ 
            const post = await Post.findById(id);
            res.status(200).json(post);
        }catch (error){
            res.status(404).json({message: error.message});
        }
    }
   // create new
    static async createPost(req, res){
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;
        try{
          await Post.create(post);
          res.status(201).json ({ message: 'Post created successfully!' });
        } catch (error) {
          res.status(400).json({ message: error.message})
        }

    }
   // update
    static async updatePost(req, res){

       const id = req.params.id;
       let new_image = "";
       if(req.file){
       new_image = req.file.filename;
       try{
        fs.unlinkSync("./uploads" + req.body.old_image);
       } catch (err) {
           console.log(err);
       }
       }else{
        new_image = req.body.old_image;
       }
       const newPost = req.body;
       newPost.image = new_image; 
       try{
           await Post.findOneAndUpdate(id, newPost);
           res.status(200).json({ message: 'Updated successfully!' });
       } catch (err){
           res.status(404).json({ message: err.message });
       }
    }
    // delete
    static async deletePost(req, res){
        const id = req.params.id;
        try{
            const result = await Post.findByIdAndDelete(id);
            if(result.image != ''){
                try{
                    fs.unlinkSync('./uploads/' + result.image);
                } catch (err) {
                    console.log(err); 
                }
            }
            res.status(200).json({message: 'Deleted Successfully!'});
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }



}