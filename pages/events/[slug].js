import Image from "next/image";
import Link from "next/link";

import Layout from "@/components/layout/Layout";
import { API_URL } from "@/config/index";
import classes from "@/styles/Event.module.css";

export default function EventPage({ event }) {
 
  return (
    <Layout>
      <div className={classes.event}>

        <span>
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>

        <h1>{event.name}</h1>
        {event.image && (
          <div className={classes.image}>
            <Image
              src={event.image.formats.medium.url}
              alt={event.name}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue:{event.venue}</h3>
        <p>{event.address}</p>

        <Link href="/events">
          <a className={classes.back}>{"<"}Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const res = await fetch(`${API_URL}/events?slug=${params.slug}`);

  const events = await res.json();
  return {
    props: {
      event: events[0],
    },
  };
}
