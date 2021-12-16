import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaImage } from "react-icons/fa";

import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/layout/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

import "react-toastify/dist/ReactToastify.css";
import classes from "@/styles/Form.module.css";
import { useHttpClient } from "hooks/http-hook";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function EditEventPage({ event, token }) {
  const { name, performers, venue, address, date, time, description } = event;
  const [values, setValues] = useState({
    name,
    performers,
    venue,
    address,
    date,
    time,
    description,
  });

  const [imagePreview, setImagePreview] = useState(
    event.image ? event.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { error, isLoading, sendRequest } = useHttpClient();

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
        const updatedEvent = await sendRequest(
          `${API_URL}/events/${event.id}`,
          "PUT",
          JSON.stringify(values),
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        );
        router.push(`/events/${updatedEvent.slug}`);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const imageUploaded = async (e) => {
    try {
      const data = await sendRequest(`${API_URL}/events/${event.id}`);
      setImagePreview(data.image.formats.thumbnail.url);
      setShowModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Layout title="Update Event">
      <Link href="/events">Go Back</Link>
      <h1>Update Event</h1>
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
              value={moment(values.date).format("yyyy-MM-DD")}
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

        {!isLoading&&<button type="submit" className="btn" disabled={isLoading}>
          Update Event
        </button>}

        {isLoading&&<button type="submit" className="btn loading-btn" disabled={isLoading}>
          <LoadingSpinner/>
        </button>}
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} alt={event.name} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          eventId={event.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { id },
    req,
  } = context;

  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/${id}`);

  const event = await res.json();

  return {
    props: {
      event,
      token,
    },
  };
}
