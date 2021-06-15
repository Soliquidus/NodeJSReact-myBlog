import axios from "axios";

export const getPosts = () => {
    console.log("GET POST DONE")
    return new Promise((onSuccess, onFail) => {
       axios.get('http://localhost:4000/api/posts').then((response, error) => {
           if(!response || error) {
               onFail(`Response failure ${error}`);
               return false;
           }
           onSuccess(response)
       });
    });
};
export const getPostBy = id => {
    console.log("GET SINGLEPOST DONE")
    return new Promise((onSuccess, onFail) => {
        axios.get(`http://localhost:4000/api/post/${id}`).then((response, error) => {
            if(!response || error) {
                onFail(`Response failure ${error}`);
                return false;
            }
            onSuccess(response)
        });
    });
};
const addPost = body => {};
