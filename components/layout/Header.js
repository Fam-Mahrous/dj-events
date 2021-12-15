import Link from "next/link";
import classes from "@/styles/Header.module.css";
import Search from "../Search";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import { authContext } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(authContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link href="/events/add">
                  <a>add Event</a>
                </Link>
              </li>

              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>

              <li>
                <button
                  onClick={() => logout()}
                  className="btn-secondary byn-icon"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt />
                    Login
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/account/register">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt /> Register
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
