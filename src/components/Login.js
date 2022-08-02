import React from 'react';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setAuthUser} from '../actions/userAuth';

function Login({dispatch, auth, users}) {
  const [user, setUser] = useState("Select");

  const navigate = useNavigate();
  useEffect(() => {
    auth && navigate(-1);
  }, [auth, navigate]);

  function handleLogin() {
    dispatch(setAuthUser(user));
  }

  return (
    <div>
      <h1>Employee Polls</h1>
      <img src='https://media.istockphoto.com/vectors/voting-polls-icon-on-white-round-vector-button-vector-id516786690?k=6&m=516786690&s=170667a&w=0&h=cI8zXyXpIZW85Qf8h2nd8STCxKXlPsqK2QUxrFLCya0=' alt=''></img>
      <h1>Select User to Login</h1>
      <select style={{fontSize: "25px", borderRadius: "5px", marginTop: "30px", padding: "7px 5px"}} value={user} data-testid="dropdown"
              onChange={(e) => setUser(e.target.value)}>
        <option>Select User</option>
        {Object.keys(users).map((k) => (
          <option key={"login" + users[k].id} value={users[k].id}>
            {users[k].name} ({users[k].id})
          </option>
        ))}
      </select>
      {user !== "Select" && user !== "Select User" && (
        <button
          data-testid="login"
          style={{
            marginLeft: "10px",
            backgroundColor: "black",
            fontSize: "20px",
            color: "white",
            cursor: "pointer",
            borderRadius: "5px",
            padding: "7px 50px",
          }}
          onClick={handleLogin}
        >Login
        </button>
      )}
    </div>
  );
}

const mapStateToProps = ({ userAuth, users }) => {
  return {
    auth: userAuth,
    users,
  };
};

export default connect(mapStateToProps)(Login);
