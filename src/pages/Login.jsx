import React, { useState } from "react";
import image from "../images/fingerpint.svg";
import hide from "../images/Eye-closed.svg";
import show from "../images/Eye.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [per, setPer] = useState(false);
  const navigate = useNavigate();

  function validate() {
    if (username.length < 2) {
      alert("Username is too short!");
      return false;
    }
    if (password === "") {
      alert("Enter the password!");
      return false;
    }
    return true;
  }

  function handleLog(e) {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }
    setLoad(true);
    const user = {
      username,
      password,
    };
    axios
      .post("https://auth-rg69.onrender.com/api/auth/signin", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);

        if (response.status == 200) {
          localStorage.setItem("user", response.data);
          localStorage.setItem("token", response.data.accessToken);
          navigate("/", {
            state: { token: response.data.accessToken },
          });
        }
      })
      .catch((err) => {
        if (err.status == 401) {
          alert("Your password is not correctlly!");
        }
        if (err.status == 404) {
          alert("User not found ! Plesase Register");
          navigate("/register");
        }
        console.log(err);
      })
      .finally(() => {
        setLoad(false);
        setusername("");
        setPassword("");
      });
  }

  return (
    <div className=" register">
      <div className="container flex items-center">
        <div className=" left">
          <img src={image} width={700} height={700} alt="" />
        </div>
        <div className="flex flex-col gap-6 rounded-[10px] bg-white p-[20px] w-[500px] h-[300px] right">
          <Link className="hover:text-blue-400" to="/register">
            to Register Page
          </Link>
          <input
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            className="p-2 border focus:outline-none rounded-[10px]"
            type="text"
            placeholder="Enter the username"
          />

          <div className="flex w-full p-2 border Same rounded-[10px]">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-[90%]  focus:outline-none"
              type={per ? "text" : "password"}
              placeholder="Enter the password"
            />
            <img
              className="cursor-pointer"
              onClick={() => {
                setPer(!per);
              }}
              width={30}
              height={30}
              src={per ? hide : show}
              alt=""
            />
          </div>

          <button
            onClick={handleLog}
            className="p-4 text-white bg-blue-400 rounded-[15px] active:scale-[0.95] transition-all"
            disabled={load}
          >
            {load ? "LOADING..." : "LOGIN"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
