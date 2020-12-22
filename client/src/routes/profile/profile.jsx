import React, { Component } from "react";
import { getCurrentUser } from "./../../services/authService";
import { clientInfo, changePassword, requestBusinessOwner, updateInformation } from "../../services/clientService";
import { dateString, zeroPrefixNumber } from "./../../services/date";
import UserBirthdayModal from "./userBirthdayModal";
import "./widthFit.css";

const roles = {
  client: "Client",
  business: "Business Owner",
  admin: "Admin",
};

//Get full name string
const getFullName = (firstName, LastName) => {
  const First_Name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const Last_Name = LastName.charAt(0).toUpperCase() + LastName.slice(1);

  return `${First_Name} ${Last_Name}`;
};

//Get age
const getAge = (userDateString) => {
  if (userDateString) {
    const date = new Date(userDateString);
    const timeNow = new Date().getTime();
    const timeDate = date.getTime();
    const timeAge = timeNow - timeDate;
    return `${Math.floor(timeAge / (1000 * 60 * 60 * 24 * 365.25))} years (${dateString(userDateString)})`;
  }
  return "";
};

//get date string
const getFormatedDate = date =>
{
    
    const newDate = new Date(date);
    const dateValue = `${newDate.getFullYear()}-${zeroPrefixNumber(newDate.getMonth()+1)}-${zeroPrefixNumber(newDate.getDate())}`;
    return dateValue;
};

//get user information from api
const getClientInfo = async () => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    try {
      const user = await clientInfo(currentUser["user-id"]);
      return user.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  return null;
};

//Profile page
class Profile extends Component {
  state = {
    user: {},
    newValues: {
      password: "",
      sex: "male",
      phone: "",
      birthday_date: "",
    },
    loadingPage: false,
    allowBirthdayModal: false,
    savingBirthday: false
  };

  //set title and user information
  componentDidMount() {
    this.mounted = true;
    document.title = "Profile";
    if(this.mounted) this.handleGetUser();
  };

  //stop waiting to api call when this page closed
  componentWillUnmount()
  {
    this.mounted = false;
  }

  //get user information from the api and set is
  handleGetUser = async () => {
    this.setState({ loadingPage: true });
    const newValues = { ...this.state.newValues };
    const user = await getClientInfo();
    if(user)
    {
        user.phone && (newValues.phone = user.phone);
        user.sex && (newValues.sex = user.sex);
        if(user.birthday_date)
        {
            const newDate = getFormatedDate(user.birthday_date);
            user.birthday_date = newDate;
            newValues.birthday_date = newDate;
        }
         this.setState({ user, newValues, loadingPage: false });
    }
    this.setState({ loadingPage: false });
  };

  //Set password value to state
  handlePasswordOnChange = (event) => {
    const newValues = { ...this.state.newValues };
    newValues.password = event.target.value;
    this.setState({ newValues });
  };

  //Changed password button
  handleChangePassword = async () => {
    this.setState({ loadingPage: true });
    try {
      const { client_id } = this.state.user;
      const newValues = { ...this.state.newValues };
      const { password } = newValues;
      await changePassword(client_id, password);
      newValues.password = "";
      this.setState({ newValues, loadingPage: false });
    } catch (err) {
      console.log(err);
      this.setState({ loadingPage: false });
    }
  };

  //Request to business owner button
  handleRequestBusinessOwner = async () => {
    this.setState({ loadingPage: true });
    try {
      const { client_id } = this.state.user;
      await requestBusinessOwner(client_id);
      const user = { ...this.state.user };
      user.request = true;
      this.setState({ loadingPage: false, user });
    } catch (err) {
      this.setState({ loadingPage: false });
      console.log(err);
    }
  };

  //Set birthday date to state
  handleDateOnChange = (event) => {
    const newValues = { ...this.state.newValues };
    newValues.birthday_date = event.target.value;
    this.setState({ newValues });
  };

  //Set new values to state
  handleOnChangeNewValues = (event) => {
    const newValues = { ...this.state.newValues };
    const { name, value } = event.target;
    if (name === "phone" && value.match(/^(\s*|\d+)$/) == null) return;
    newValues[name] = value;
    this.setState({ newValues });
  };

  //Check if any phone number or sex changed
  areChanges = () => {
    const names = ["phone", "sex"];
    const { newValues, user } = this.state;
    return names.some((name) => newValues[name] !== user[name]) && !names.some((name) => !newValues[name]);
  };

  //Open birthday modal
  handleAllowModal = () => {
    this.setState({ allowBirthdayModal: true });
  };

  //Close birthday modal
  handleCloseModal = () => {
    const newValues = { ...this.state.newValues };
    const { birthday_date } = this.state.user;
    newValues.birthday_date = birthday_date ?? "";
    this.setState({ newValues, allowBirthdayModal: false });
  };

  //Save changes button
  handleSaveChanges = async () =>
  {
    this.setState({ loadingPage: true });
    const { client_id } = this.state.user;
    const { sex, phone } = this.state.newValues;
    const request = { sex, phone };
    try
    {
        await updateInformation(request, client_id);
        const user = { ...this.state.user };
        user.sex = sex;
        user.phone = phone;
        this.setState({ user, loadingPage: false });
    }
    catch(err)
    {
        this.setState({ loadingPage: false });
        console.log(err);
    }
  };

  //Save birthday button
  handleSaveBirthday = async () =>
  {
    this.setState({ savingBirthday: true });
    const { birthday_date } = this.state.newValues;
    const request = { birthday_date };
    const { client_id } = this.state.user;
    try
    {
        await updateInformation(request, client_id);
        const user = { ...this.state.user };
        user.birthday_date = birthday_date;
        this.setState({ user, savingBirthday: false });
    }
    catch(err)
    {
        this.setState({ savingBirthday: false });
        console.log(err);
    }

  };

  //Check if birthday changed
  isDateChanges = () => {
    const { birthday_date: originalDate } = this.state.user;
    const { birthday_date: newDate } = this.state.newValues;
    return originalDate !== newDate && newDate;
  };

  //Profile page
  render() {
    const noUser = Object.keys(this.state.user).length === 0;
    const { loadingPage, allowBirthdayModal, savingBirthday } = this.state;
    if (loadingPage)
      return (
        <React.Fragment>
          <div className="text-center">
            <div className="spinner-border text-primary">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </React.Fragment>
      );

    const { actor, birthday_date, email, first_name, last_name, platform, request } = this.state.user;
    const requestBusinessOwner = actor === "client" && !request;
    const { password, sex, phone, birthday_date: newBirthday } = this.state.newValues;

    return (
      <React.Fragment>
        <div>
          <div className="card m-auto fit-content">
            <h5 className="card-header">Account</h5>
            <div className="card-body">
              <h5 className="text-primary">{getFullName(first_name || "", last_name || "")}</h5>
              <span>
                <p>{roles[actor]}</p>
              </span>
              <table>
                <tbody>
                  <tr>
                    <td className="pb-2 pt-2 pr-4">
                      <b>First name</b>
                    </td>
                    <td className="pb-2 pt-2">{first_name || ""}</td>
                  </tr>
                  <tr>
                    <td className="pb-2 pt-2">
                      <b>Last name</b>
                    </td>
                    <td className="pb-2 pt-2">{last_name || ""}</td>
                  </tr>
                  <tr>
                    <td className="pb-2 pt-2">
                      <b>Email</b>
                    </td>
                    <td className="pb-2 pt-2">{email || ""}</td>
                  </tr>
                  {platform === "local" && <tr>
                    <td className="pb-2 pt-2 pr-2">
                      <label htmlFor="password">
                        <b>New password</b>
                      </label>
                    </td>
                    <td className="pb-2 pt-2">
                      <input
                        id="password"
                        onChange={this.handlePasswordOnChange}
                        value={password}
                        type="text"
                        className="form-control"
                      />
                    </td>
                    <td>
                      <button onClick={this.handleChangePassword} disabled={password.length < 6} className="btn btn-primary ml-1">
                        Save
                      </button>
                    </td>
                  </tr>}
                  <tr>
                    <td className="pb-2 pt-2">
                      <b>Age</b>
                    </td>
                    <td className="pb-2 pt-2">{getAge(birthday_date || "")}</td>
                    <td className="pb-2 pt-2">
                      <button onClick={this.handleAllowModal} disabled={noUser} className="btn btn-primary">
                        Change
                      </button>
                    </td>
                  </tr>
                  <tr className="border-top">
                    <td className="pb-2 pt-2">
                      <label htmlFor="phone">
                        <b>Phone</b>
                      </label>
                    </td>
                    <td className="pb-2 pt-2">
                      <input
                        id="phone"
                        onChange={this.handleOnChangeNewValues}
                        name="phone"
                        type="text"
                        className="form-control"
                        value={phone}
                      />
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="pb-2 pt-2">
                      <label htmlFor="sex">
                        <b>Sex</b>
                      </label>
                    </td>
                    <td className="pb-2 pt-2">
                      <select id="sex" onChange={this.handleOnChangeNewValues} className="form-control" name="sex" value={sex}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <button onClick={this.handleSaveChanges} disabled={!this.areChanges() || noUser} className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
            {requestBusinessOwner && <div className="card-footer text-center">
              <b>Ask to become a business owner</b>
              <button onClick={this.handleRequestBusinessOwner} className="btn btn-primary ml-2">
                Request
              </button>
            </div>}
          </div>
        </div>
        <UserBirthdayModal
          allowModal={allowBirthdayModal}
          handleClose={this.handleCloseModal}
          birthday={newBirthday}
          onChange={this.handleDateOnChange}
          isDateChanges={this.isDateChanges}
          isUpdating={savingBirthday}
          handleSaveDate={this.handleSaveBirthday}
        />
      </React.Fragment>
    );
  }
}

export default Profile;
