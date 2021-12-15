import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { authContext } from "@/context/AuthContext";

import Layout from "@/components/layout/Layout";
import classes from "@/styles/AuthForm.module.css";

import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login,error}=useContext(authContext);

  useEffect(()=>{
    if(error){
        toast.error(error)
    }
  },[error])

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    login({ email, password }); 
  };

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  useEffect(() => {}, []);
  return (
    <Layout title="User Login">
      <div className={classes.auth}>
        <h1>
          <FaUser /> Log in
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>

          <input type="submit" value="Login" className="btn" />
          <p>
            Don`t have an account ?
            <Link href="/account/register"> Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
