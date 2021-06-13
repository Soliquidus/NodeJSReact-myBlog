import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { withItems, Menu, Modal, Posts, PostAction } from "../components";

export const Home = () => {
  const state = useSelector(state => state);
  return (
    <Fragment>
      <Modal />
      <Menu />
      {withItems(state, Posts)}
      <PostAction />
    </Fragment>
  );
};
