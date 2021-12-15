import {parseCookies} from "@/helpers/index"
import Layout from "@/components/layout/Layout";
import { API_URL } from "@/config/index";
import classes from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";
import { toast ,ToastContainer} from "react-toastify";
import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage({events,token}) {
    const router = useRouter();
    const deleteEvent = async (id) => {
        if (confirm("Are you sure")) {
          const res = await fetch(`${API_URL}/events/${id}`, {
            method: "DELETE",
            headers:{
                Authorization:`Bearer ${token}`
            }
          });
    
          const data = await res.json();
    
          if (!res.ok) {
            toast.error(data.message);
          } else {
            router.push("/account/dashboard");
          }
        }
      };
    
    return (
        <Layout title="User Dashboard">
            <div className={classes.dash}>
            <h1>Dashboard</h1>
            <ToastContainer/>
            <h3>My Events</h3>

            {events.map(event=><DashboardEvent key={event.id} event={event} handleDelete={deleteEvent}/>)}

            </div>
        </Layout>
    )
}

export async function getServerSideProps({req}){
    const {token}=parseCookies(req);

    const res=await fetch(`${API_URL}/events/me`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    const events=await res.json();
    return {
        props:{
            events,
            token
        }
    }
}
