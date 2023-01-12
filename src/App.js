import React from "react";
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Auth from "./Auth";
import articles from "./data.json";
import people from "./got.json";
import "./styles.css";
import verifyLogin from "./utils";
import ErrorBoundary from "./ErrorBoundary";
import { Context } from "./context";

export default class App extends React.Component {
  state = {
    navClosed: false,
    isLogin: false,
    isModalOpen: false,
    data: null,
    userInfo: null,
    people: people,
  };

  changeNavbar = () => {
    this.setState({ navClosed: !this.state.navClosed });
  };

  handleModal = (isOpen) => {
    this.setState({ isModalOpen: isOpen });
  };

  loginHandler = (email, password) => {
    verifyLogin(email, password).then((res) => {
      this.setState({
        isLogin: true,
        userInfo: res,
        data: articles,
      });
    });
  };

  logoutHandler = () => {
    this.setState({
      isLogin: false,
      data: null,
      people: null,
    });
  };

  render() {
    const { isLogin, data, userInfo, navClosed, isModalOpen, people } =
      this.state;
    let contextData = {};
    contextData = {
      changeNavbar: this.changeNavbar,
      handleModal: this.handleModal,
      loginHandler: this.loginHandler,
      logoutHandler: this.logoutHandler,
      navClosed: navClosed,
      isLogin: isLogin,
      isModalOpen: isModalOpen,
      data: data,
      userInfo: userInfo,
      people: people,
    };

    return (
      <div className={`container ${this.state.navClosed ? "nav-closed" : ""}`}>
        <Context.Provider value={contextData}>
          <Header />
          <div className="main">
            <Sidebar />
            <ErrorBoundary>
              <Main />
            </ErrorBoundary>
          </div>
          {this.state.isModalOpen ? <Auth /> : ""}
        </Context.Provider>
      </div>
    );
  }
}
