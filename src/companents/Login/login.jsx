import { Link } from "react-router-dom";
import "../Login/login.css";
import logo from "../../assets/logo.jpeg";

const login = () => {
  const login = (e) => {
    e.preventDefault();
    const { name, password } = e.target;

    fetch("http://localhost:1000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          window.localStorage.setItem("token", data.access_token);
          window.location.href = "/company";
        }else {
          window.location.href = "/login";  
        }
      });

    name.value = "";
    password.value = "";
  };

  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="text-center mt-4 name">Admin</div>
        <form className="p-3 mt-3" onSubmit={login}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="name"
              id="userName"
              placeholder="Username"
              autoComplete="off"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              autoComplete="off"
            />
          </div>
          <button className="btn mt-3">Login</button>
          <Link className="btn  mt-3 text-decoration-none text-white" to={"/company"}>Back to User</Link>
        </form>
        <div className="text-center fs-6">
          <a href="#">Forget password?</a> or <a href="#">Sign up</a>
        </div>
      </div>

    </>
  );
};

export default login;
