import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import {addNewPost, setFilterAction} from "../lib/state/actions";

const styles = {
  blog: {
    flex: "1 0 60%",
    overflow: "scroll",
    margin: "0 20px"
  },
  posts: {
    fontWeight: "600"
  },
  small: {
    fontSize: "14px",
    fontWeight: "400"
  },
  menu: {
    flex: "0 1 10%"
  },
  categories: {
    display: "flex",
    alignItems: "flex-end",
    listStyleType: "none",
    flexDirection: "column"
  },
  category: {
    margin: "3px 0"
  },
  blogUL: {
    padding: "0"
  },
  add: {
    flex: "0 1 30%",
    marginLeft: "50px"
  },
  a: {
    color: "#000"
  },
  plus: {
    fontSize: "22px",
    fontWeight: "700",
    background: "white",
    borderRadius: "5px"
  }
};

export const Menu = () => {
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state);
  const [active, setActive] = useState(categories [0]);
  return (
    <div style={styles.menu}>
      <ul style={styles.categories}>
        {categories.map(category => {
          return <li
              className={`category ${active === category && "active"}`}
              onClick={() => {
                dispatch(setFilterAction(category))
                setActive(category)
              }}
              style={styles.category}>{category}
          </li>;
        })}
      </ul>
    </div>
  );
};
export const PostAction = () => (
  <div style={styles.add}>
    <button style={styles.plus} data-toggle="modal" data-target="#form">
      <span>+</span>
    </button>
  </div>
);
const Form = () => {
  const inputs = document.querySelectorAll(".form-control");
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state);
  const cats = categories.filter(category => category !== "All")
  const [item, setItem] = useState({
    title: "",
    author: "",
    content: "",
    category: "technology"
  });
  const validate = callback => {
    inputs.forEach(input => {
      if (!input.value) {
        input.style.border = "1px solid crimson";
      } else {
        input.style.border = "1px solid #ced4da";
      }
    });
    callback();
  };
  //add & reset
  const add = () => {
    dispatch(addNewPost(item))
    window.jQuery('#form').modal("hide")
  };

  const reset = () => {
    inputs.forEach(input => {
      input.style.border = "1px solid #ced4da"
    });
    setItem({title: "", author: "", content: "", category: "music"})
  };

  const submit = e => {
    e.preventDefault();
    //validate
    validate(() => {
      if (item.title === "" || item.author === "" ||item.content === "") {
        return false;
      }
      add();
      reset();
    });
  };
  return (
    <form onSubmit={e => submit(e)}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Add a Post
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <select
          className="float-right mb-2"
          onChange={e => {
            setItem({
              ...item,
              category: e.target.value
            });
          }}
        >
          {cats.map(category => {
            return <option>{category}</option>;
          })}
        </select>
        <input
          type="text"
          className="form-control"
          placeholder="title"
          value={item.title}
          onChange={e => {
            setItem({ ...item, title: e.target.value });
          }}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="author"
          value={item.author}
          onChange={e => {
            setItem({ ...item, author: e.target.value });
          }}
        />
        <br />
        <textarea
    className="form-control"
    rows="5"
    value={item.content}
    onChange={e => {
      setItem({...item, content: e.target.value});
    }}
    />
      </div>
      <div className="modal-footer">
        <button type="button" data-dismiss="modal" style={styles.plus}>
          Close
        </button>
        <button type="submit" style={styles.plus}>
          Save
        </button>
      </div>
    </form>
  );
};
export const Modal = () => {
  return (
    <div
      className="modal fade"
      id="form"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <Form />
        </div>
      </div>
    </div>
  );
};

export const Posts = () => {
  const state = useSelector(state => state);
  const {posts} = state

  const truncate = text => {
    if (text.length < 99) {
      return;
    }
    return `${text.substring(0, 100)} ...`;
  };
  return posts.map(post => {
    return (
      <div class="container">
        <h3 style={styles.h3}>
          <Link
            style={styles.a}
            to={`/post/${post._id}`}
            params={{ _id: post._id }}
          >
            {post.title}{" "}
          </Link>
          <div style={styles.small}>by {post.author}</div>
        </h3>

        <p>{truncate(post.content)}</p>
        <div style={{border: "1px solid #eee"}}/>
      </div>
    );
  });
};

export const withItems = (props, Component) => {
  const {posts, isFetching} = props
  return (
    <div style={styles.blog}>
      {!posts.length && <p style={styles.posts}>No Posts :(</p>}
      {isFetching && posts.length ? (
        <p>Loading... </p>
      ) : (
        <Component />
      )}
    </div>
  );
};
