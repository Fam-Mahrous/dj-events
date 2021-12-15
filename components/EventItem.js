import Link from "next/link";
import Image from "next/image";
import classes from "@/styles/EventItem.module.css";

export default function EventItem({event}) {
    return (
        <div className={classes.event}>
            <div className={classes.img}>
                <Image src={event.image?event.image.formats.thumbnail.url:"/images/event-default.png"} alt={event.name} width={170} height={100}/>

            </div>
            <div className={classes.info}>
                <span>
                    {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
                </span>
                <h3>{event.name}</h3>
            </div>
            <div className={classes.link}>
                <Link href={`/events/${event.slug}`}>
                <a className="btn">
                    Details
                </a>
                </Link>
            </div>
        </div>
    )
}
