import React, {useEffect, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {fetchSinglePost} from "../lib/state/actions";

const styles = {
    blog: {
        flex: "0 1 60%",
        overflow: "scroll",
        marginLeft: "15%"
    },
    info: {
        display: "flex",
        justifyContent: "space-between"
    },
    small: {
        fontSize: "14px",
        fontWeight: "400"
    },
    category: {
        color: "navy",
        fontWeight: "800"
    }
};

const Header = ({category, createdAt, title, author}) => {
    const format = createdAt => {
        const date = new Date(createdAt);
        const day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <Fragment>
            <br/>
            <div style={styles.info}>
                <span style={(styles.small, styles.category)}> {category}</span>
                <span style={styles.small}>{format(createdAt)}</span>
            </div>
            <h3>
                {title}&nbsp;
                <div style={styles.small}>by {author}</div>
            </h3>
        </Fragment>
    );
};

export const Single = ({match: {params: {id}}}) => {
    const dispatch = useDispatch();
    const singlePost = useSelector(state => state.single);
    useEffect(() => {
        dispatch(fetchSinglePost(id))
    }, []);

    if (!singlePost) {
        return <Fragment>No Post</Fragment>;
    }
    return (
        <div style={styles.blog}>
            <Link to="/">back</Link>

            <Header {...singlePost}/>
            <p>{singlePost.content}</p>
            <div style={{border: "1px solid #eee"}}></div>
        </div>
    );
};
