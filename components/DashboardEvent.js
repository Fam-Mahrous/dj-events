import classes from "@/styles/DashboardEvent.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function DashboardEvent({ event,handleDelete }) {
  return (
    <div className={classes.event}>
      <h4>
        <Link href={`/events/${event.slug}`}>
          <a>{event.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${event.id}`}>
        <a className={classes.edit}>
          <FaPencilAlt /> <span>Edit</span>
        </a>
      </Link>
      <a
        href="#"
        className={classes.delete}
        onClick={() => handleDelete(event.id)}
      >
        <FaTimes /> Delete
      </a>
    </div>
  );
}
