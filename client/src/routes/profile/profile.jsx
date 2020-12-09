import React, { Component } from 'react';
import { getCurrentUser } from './../../services/authService';
import { clientInfo, changePassword, requestBusinessOwner } from "../../services/client"

const roles =
    {
        client:"Client",
        business: "Business Owner",
        admin: "Admin"
    };

const getFullName = (firstName, LastName) =>
{
    const First_Name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const Last_Name = LastName.charAt(0).toUpperCase() + LastName.slice(1);

    return `${First_Name} ${Last_Name}`;
};

const getAge = dateString =>
{
        const date = new Date(dateString);
        if(date != "Invalid Date")
        {
        const timeNow = new Date().getTime();
        const timeDate = date.getTime();
        const timeAge = timeNow - timeDate;
        return  Math.floor(timeAge/(1000 * 60 * 60 * 24 * 365.25));
        }
        return "";
};

const getClientInfo = async () =>
{
    const currentUser = getCurrentUser();
    if(currentUser)
    {
        try
        {
            const user = await clientInfo(currentUser["user-id"]);
            return user.data;
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return null;
};

class Profile extends Component {
    state = 
    {
        user: 
        {
            clientId: "",          
            actor: "",   
            birthday_date: "",
            email: "",
            first_name: "",
            last_login: "",
            last_name: "",
            phone: "",
            platform: "",
            request: false,
            sex: "",
        },
        password: "",
        loadingPage: false      
    }

    componentDidMount() 
    {
        this.handleGetUser();
    }

    handleGetUser = async () =>
    {
        this.setState({ loadingPage: true });
        const user = await getClientInfo();
        if(user) this.setState({ user, loadingPage: false });
    }

    handlePasswordOnChange = event =>
    {
        this.setState({ password: event.target.value });
    }

    handleChangePassword = async ()=>
    {
        this.setState({ loadingPage: true });
        try
        {
            const { client_id } = this.state.user;
            const { password } = this.state;
            await changePassword(client_id, password);
            this.setState({ password: "", loadingPage: false });
        }
        catch(err)
        {
            console.log(err);
            this.setState({ loadingPage: false });
        }
    }

    handleRequestBusinessOwner = async ()=>
    {
        this.setState({ loadingPage: true });
        try
        {
            const { client_id } = this.state.user;
            await requestBusinessOwner(client_id);
            const user = { ...this.state.user };
            user.request = true;
            this.setState({ loadingPage: false, user });
        }
        catch(err)
        {
            this.setState({ loadingPage: false });
            console.log(err);
        }
    }

    render() 
    { 
        const { password, loadingPage } = this.state;
        if(loadingPage) return <React.Fragment>
        <div className="text-center">
          <div className="spinner-border text-primary">
          <span className="sr-only">Loading...</span>
          </div>
        </div>
        </React.Fragment>;

        const { actor, birthday_date, email, first_name, last_login, last_name,
            phone, platform, request, sex } = this.state.user;
        const requestBusinessOwner = (actor === "client") && !request;

        return (<div>
                <div className="card m-auto w-25">
        <h5 className="card-header">Account</h5>
        <div className="card-body">
            <h5 className="text-primary">{getFullName(first_name, last_name)}</h5>
            <span><p>{roles[actor]}</p></span>   
            <table>
            <tbody>
            <tr>
              <td className="pb-2 pt-2 pr-4"><b>First name:</b></td>
              <td className="pb-2 pt-2">{first_name}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2"><b>Last name:</b></td>
              <td className="pb-2 pt-2">{last_name}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2"><b>Email:</b></td>
              <td className="pb-2 pt-2">{email}</td>
            </tr>
             <tr hidden={platform !== "local"}>
                <td className="pb-2 pt-2 pr-2"><b>New password:</b></td>
                <td className="pb-2 pt-2">
                  <input onChange={event => {this.handlePasswordOnChange(event)}} value={password} type="text" className="form-control" />
                </td>
                <td>
                    <button onClick={this.handleChangePassword} disabled={password.length < 6} className="btn btn-primary">Save</button>
                </td>
            </tr>
            <tr>
              <td className="pb-2 pt-2"><b>Phone:</b></td>
              <td className="pb-2 pt-2">{phone}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2"><b>Age:</b></td>
              <td className="pb-2 pt-2">{getAge(birthday_date)}</td>
            </tr>
            <tr>
              <td className="pb-2 pt-2"><b>Sex:</b></td>
              <td className="pb-2 pt-2">{sex}</td>
            </tr>                      
            </tbody> 
            </table>
        </div>
        <div hidden={!requestBusinessOwner} className="card-footer">
            <b>Ask to become a business owner</b>
            <button onClick={this.handleRequestBusinessOwner} className="btn btn-primary ml-2">Request</button>
        </div>
      </div>
        </div>);
    }
}
 
export default Profile;