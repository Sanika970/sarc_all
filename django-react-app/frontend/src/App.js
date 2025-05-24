import React, { Component } from "react";
import Modal from "./components/Modal";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// class structure
class App extends Component {
  constructor(props) {
    super(props); //calls constructer of parent class
    this.state = {
      //state: holds dynamic data
      modal: false,
      viewCompleted: false,

      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
      todoList: [],
    };
  }
  // to connect backend-frontend
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks/")
      // promis what it will do with the response
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  // creating toggle property
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/task/${item.id}/`, item)
        .then((res) => this.refreshList());
    } else {
      axios
        .post("http://localhost:8000/api/tasks/", item)
        .then((res) => this.refreshList());
    }
  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // class function if status==true, viewcomplete ==true. (toggels btwn views)
  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  //  after clicking the above fn is called
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        {/* after clicking completed tab */}
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed
        </span>

        {/* after clicking incomplete tab*/}
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    );
  };

  // Rendering item in the list (comleted )
  // filter completed and imcomplete tasks

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    // mapping
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            item.completed ? "completed-todo" : ""
          }`}
          title={item.title}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-info mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mr-2"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="all">
        {/* bg vdo */}
        <video autoPlay loop muted className="bg-video">
    <source src="/bg.mp4" type="video/mp4" />
     video tag.
  </video>
  <div className="content">
        <h1 className="text-white text-uppercase text-center my-4">
          {" "}
          Task Manager
        </h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card ">
              <div>
                <button className="task" onClick={this.createItem}>
                  {" "}
                  Add Task
                </button>
              </div>
              {this.renderTabList()}
              <div className="List">
              <ul className="list">
                {this.renderItems()}
              </ul>
              </div>
            </div>
          </div>
        </div>
        <footer className="aa">
          Copyright 2025 &copy; All Rights Reserved
        </footer>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        </div>
      </main>
    );
  }
}

export default App;
