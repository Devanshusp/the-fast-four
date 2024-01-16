import axios from "axios";
import React, { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../App.css';
import NavbarBS from "../layout/NavbarBS";


export default function EditUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: ""
  });

  const { firstName, lastName, username, password, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/user", user);
    navigate("/userhomepage");
  };
  const {id}=useParams();

    useEffect(()=>{
        loadUser()
    },[])

    const loadUser= async ()=>{
        const result=await axios.get(`http://localhost:8080/user/${id}`)
        setUser(result.data)
    }
  
  return (
    <div className="section1">
    <NavbarBS/>
    <div className="container ">
    <div className="row ">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      
        <h2 >Save Changes!</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Change your First name here"
              name="firstName"
              autoComplete="off"
              value={user.firstName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Change your Last name here"
              name="lastName"
              autoComplete="off"
              value={user.lastName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Change your Username here"
              name="username"
              autoComplete="off"
              value={user.username}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Change your Password here"
                name="password"
                autoComplete="off"
                value={user.password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Change your E-mail here"
                name="email"
                autoComplete="off"
                value={user.email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          <button type="submit" className="button">
            Submit
          </button>
          <button type="submit" className="button1 mx-2">
              Cancel
            </button>
        </form>
      </div>
    </div>
  </div>
  </div>
  );
}

