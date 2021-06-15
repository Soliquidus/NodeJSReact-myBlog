import axios from "axios";

export const getPosts = () => {
    console.log("GET POST DONE")
    return new Promise((onSuccess, onFail) => {
       axios.get('http://localhost:4000/api/posts').then((response, error) => {
           if(!response || error) {
               onFail(`Response failure ${error}`)
           }
           onSuccess(response)
       });
    });
};
const getPostBy = id => {};
const addPost = body => {};
