import Link from "next/link";
import classes from "@/styles/Footer.module.css";

export default function Footer() {
    return (
        <footer className={classes.footer}>
            <p>Copyrights &copy; DJ Events 2021</p>
            <p>
                <Link href="/about">
                    <a>About THis Project</a>
                </Link>
            </p>
        </footer>
    )
}
