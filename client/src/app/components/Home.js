import React, {Fragment, useState} from "react";
import {useSelector} from "react-redux";
import {withItems, Menu, Modal, Posts, PostAction} from "../components";

const posts = [
    {
        id: 1,
        title: "My blog post 1",
        content: "Content",
        author: "Jimmy Hendrix",
        category: "music",
        createdAt: "2020-03 13T16:08:57.092+00:00"
    },
    {
        id: 2,
        title: "My blog post 2",
        content: "Content",
        author: "John Petrucci",
        category: "music",
        createdAt: "2020-03 13T19:06:27.782+00:00"
    },
    {
        id: 3,
        title: "My blog post 3",
        content: "Content",
        author: "Jimmy Hendrix",
        category: "music",
        createdAt: "2020-03 13T19:07:36.811+00:00"
    }
];


export const Home = () => {
    const state = useSelector(state => state);
    // const [state, setState] = useState({
    //     posts: posts,
    //     isFetching: false
    // })
    return (
        <Fragment>
            <Modal/>
            <Menu/>
            {withItems(state, Posts)}
            <PostAction/>
        </Fragment>
    );
};
