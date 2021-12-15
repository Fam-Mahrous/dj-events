import Layout from "@/components/layout/Layout";
import {API_URL} from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function HomePage({events}) {
 
  return (
    <Layout>
    <h1>
     upcoming events
    </h1>
    {events.length===0&&<h3>No Events to show</h3>}
    {events.map(event=>(
   <EventItem key={event.id} event={event}/>   
    ))}
    {
      events.length>0&&<Link href="/events">
        <a className="btn-secondary">
          View All Events
        </a>
      </Link>
    }
    </Layout>
  )
}

export async function getServerSideProps(context){
  const res=await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events =await res.json();

  return {
    props:{
      events
    }
  }
}
