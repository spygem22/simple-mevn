import axios from 'axios';
const url = "api/post";

export default class API {
    // to get all post from the serve
    static async getAllPost(){
        const res = await axios.get(url);
        return res.data;
    }
    // to get single by id
    static async getPostByID(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
    // to insert into database
    static async addPost(post){
        const res = await axios.post(url, post);
        return res.data;
    }
     // to update into database
     static async updatePost(id, post){
        const res = await axios.patch(`${url}/${id}`, post);
        return res.data;
    }
     // to delete into database
     static async deletePost(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}