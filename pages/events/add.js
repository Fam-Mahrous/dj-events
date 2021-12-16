import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/layout/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";

import "react-toastify/dist/ReactToastify.css";
import classes from "@/styles/Form.module.css";
import { useHttpClient } from "hooks/http-hook";

export default function AddEventPage({ token }) {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();
  const { sendRequest, error, isLoading } = useHttpClient();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyField = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyField) {
      toast.error("please fill in all inputs");
    } else {
      try {
        const event = await sendRequest(
          `${API_URL}/events`,
          "POST",
          JSON.stringify(values),
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        );
        router.push(`/events/${event.slug}`);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Layout title="Add Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {!isLoading && (
          <button type="submit" className="btn" disabled={isLoading}>
            Add Event
          </button>
        )}

        {isLoading && (
          <button
            type="submit"
            className="btn loading-btn"
            disabled={isLoading}
          >
            <LoadingSpinner />
          </button>
        )}
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
