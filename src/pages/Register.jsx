import React, { useState } from "react";
import image from "../images/fingerpint.svg";
import hide from "../images/Eye-closed.svg";
import show from "../images/Eye.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [load, setLoad] = useState(false);

  const [per, setPer] = useState(false);
  const navigate = useNavigate();

  function validate() {
    if (username.length < 2) {
      alert("Username is too short!");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      alert("Email is not corectlly!");
      return false;
    }
    if (password !== rePassword) {
      alert("Password and rePassword should be same!");
      return false;
    }
    return true;
  }

  function handleReg(e) {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };
    const isValid = validate();
    if (!isValid) {
      return;
    }
    setLoad(true);
    axios
      .post("https://auth-rg69.onrender.com/api/auth/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);

        if (response.status == 200) {
          alert("You registered succesfully!");
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.status == 400) {
          alert("You alredy have account! Login please");
        }
      })
      .finally(() => {
        setLoad(false);
        setusername("");
        setEmail("");
        setPassword("");
        setRePassword("");
      });
  }

  return (
    <div className=" register">
      <div className="container flex items-center">
        <div className=" left">
          <img
            className="select-none"
            src={image}
            width={700}
            height={700}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-6 rounded-[10px] bg-white p-[20px] w-[500px] h-[420px] right">
          <Link className="hover:text-blue-400" to="/login">
            to Login Page
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
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="p-2 border focus:outline-none rounded-[10px]"
            type="email"
            placeholder="Enter the email"
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
          <input
            value={rePassword}
            onChange={(e) => {
              setRePassword(e.target.value);
            }}
            className=" p-2 border focus:outline-none rounded-[10px]"
            type={per ? "text" : "password"}
            placeholder="Confirm your password"
          />
          <button
            onClick={handleReg}
            className="p-4 text-white bg-blue-400 rounded-[15px] active:scale-[0.95] transition-all"
            disabled={load}
          >
            {load ? "LOADING.." : "REGISTER"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
