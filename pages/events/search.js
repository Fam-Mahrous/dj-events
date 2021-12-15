import Layout from "@/components/layout/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";
import qs from "qs";
import { useRouter } from "next/router";

export default function SearchPage({ events }) {
    const router=useRouter();
  return (
    <Layout title="Search results">
        <Link href="/events">Go Back</Link>
      <h1>Search results for {router.query.term}</h1>
      {events.length === 0 && <h3>No Events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    query: { term },
  } = context;

  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
