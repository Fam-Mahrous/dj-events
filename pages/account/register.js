import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { authContext } from "@/context/AuthContext";

import Layout from "@/components/layout/Layout";
import classes from "@/styles/AuthForm.module.css";

import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, error } = useContext(authContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("passwords do not match");
      return;
    }
    register({ username, email, password});
  };

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };
  useEffect(() => {}, []);
  return (
    <Layout title="User Registartion">
      <div className={classes.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>

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
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <input type="submit" value="Rgister" className="btn" />
          <p>
            Already have an account ?<Link href="/account/login"> Login</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
