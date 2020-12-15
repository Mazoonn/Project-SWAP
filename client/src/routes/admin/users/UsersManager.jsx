import React, { Component } from "react";
import { changeRole, getAllUsers, deleteUser, newPassword, paginate } from "../../../services/AdminServices";
import { getCurrentUser } from "../../../services/authService";
import Pagination from "../AdminPagination";
import UserModal from "./UserModal";
import UserRaw from "./UserRaw";

const filterUsers = (users, name, email, request) => {
  const filteredUsers =
    name !== "" || email !== ""
      ? users.filter((user) => {
          const fullName = `${user["first_name"]} ${user["last_name"]}`;
          return (
            user["email"].toLowerCase().startsWith(email.toLowerCase()) &&
            fullName.toLowerCase().startsWith(name.toLowerCase()) &&
            (!request || user["request"])
          );
        })
      : users.filter((user) => !request || user["request"]);
  return filteredUsers;
};

class UsersManager extends Component {
  state = {
    users: [],
    user: {},
    email: "",
    name: "",
    pageSize: 3,
    currentPage: 1,
    request: false,
    loading: false,
    loadingSavePassword: false,
    password: "",
  };

  componentDidMount() {
    document.title = "Users";
    this.getUsers();
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getUsers = async () => {
    this.setState({ loading: true });
    try {
      const myId = getCurrentUser()["user-id"];
      let users = await getAllUsers();
      users = users.data.filter((user) => user["client_id"] !== myId);
      this.setState({ users, loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  handleOnSaveChangeRole = async (user) => {
    this.setState({ loading: true });
    try {
      await changeRole(user);
      const users = [...this.state.users];
      const index = users.indexOf(user);
      users[index]["actor"] = user["actor_new"];
      if (user["actor_new"] === "admin" || user["actor_new"] === "business") users[index].request = false;
      this.setState({ users, loading: false });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };

  handelSelectOnChange = (event, user) => {
    const users = [...this.state.users];
    const index = users.indexOf(user);
    users[index]["actor_new"] = event.target.value;
    this.setState(users);
  };

  isRoleChanged = (user) => {
    const role = user["actor"];
    const newRole = (user["actor_new"] && user["actor_new"]) || role;

    return role !== newRole;
  };

  handleFilterOnChange = (event) => {
    const { value, name } = event.target;
    const obj = {};
    obj[name] = value;
    obj.currentPage = 1;
    this.setState(obj);
  };

  handleRequestOnChange = () => {
    let { request } = this.state;
    request = !request;
    this.setState({ request, currentPage: 1 });
  };

  handleDeleteUser = async (user) => {
    this.setState({ loading: true });
    try {
      await deleteUser(user["client_id"]);
      const users = this.state.users.filter((u) => user["client_id"] !== u["client_id"]);
      this.setState({ users, loading: false, currentPage: 1 });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  };

  handleClickOnInfo = (user) => {
    this.setState({ user });
  };

  handleExitModal = () => {
    this.setState({ user: {}, password: "" });
  };

  handlePasswordOnChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSaveNewPassword = async () => {
    this.setState({ loadingSavePassword: true, password: "" });
    try {
      const { password } = this.state;
      const { client_id: id } = this.state.user;

      await newPassword(id, password);
    } catch (err) {
      console.log(err);
    }
    this.setState({ loadingSavePassword: false });
  };

  render() {
    const { email, loadingSavePassword, password, user, loading, name, pageSize, currentPage, users, request } = this.state;
    const filteredUsers = filterUsers(users, name, email, request);
    const totalCount = filteredUsers.length;
    const newUsers = paginate(filteredUsers, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="card m-auto">
          <h5 className="card-header">Manage Users</h5>
          <div className="card-body">
            {(!loading && (
              <React.Fragment>
                <div className="text-right">
                  <div className="input-group w-50 mb-2">
                    <input
                      onChange={(event) => {
                        this.handleFilterOnChange(event);
                      }}
                      name="name"
                      value={name}
                      type="text"
                      className="form-control"
                      placeholder="Filter Name"
                    />
                    <input
                      onChange={(event) => {
                        this.handleFilterOnChange(event);
                      }}
                      name="email"
                      value={email}
                      type="text"
                      className="form-control"
                      placeholder="Filter Email"
                    />
                    <button onClick={this.handleRequestOnChange} className="btn btn-sm btn-primary ml-1">
                      Requests
                    </button>
                  </div>
                </div>
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Request</th>
                      <th colSpan={2} className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {newUsers.map((user) => (
                      <UserRaw
                        key={user["client_id"]}
                        user={user}
                        handelSelectOnChange={this.handelSelectOnChange}
                        handleDeleteUser={this.handleDeleteUser}
                        handleOnSaveChangeRole={this.handleOnSaveChangeRole}
                        handleClickOnInfo={this.handleClickOnInfo}
                        isRoleChanged={this.isRoleChanged}
                      />
                    ))}
                  </tbody>
                </table>
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </React.Fragment>
            )) || (
              <div className="text-center">
                <div className="spinner-border text-primary">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <UserModal
              user={user}
              handleExitModal={this.handleExitModal}
              handlePasswordOnChange={this.handlePasswordOnChange}
              password={password}
              loading={loadingSavePassword}
              handleSaveNewPassword={this.handleSaveNewPassword}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UsersManager;
