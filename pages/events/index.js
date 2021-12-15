import Layout from "@/components/layout/Layout";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import { API_URL,PER_PAGE_SIZE } from "@/config/index";

export default function EventsPage({ events, total, page }) {
  return (
    <Layout>
      <h1>events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    query: { page = 1 },
  } = context;
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE_SIZE;
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE_SIZE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: {
      events,
      page: +page,
      total,
    },
  };
}
