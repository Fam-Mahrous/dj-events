import Head from "next/head";
import { Fragment } from "react";
import {useRouter} from 'next/router';

import Header from "./Header";
import Footer from "./Footer";
import ShowCase from "../ShowCase";

import classes from "@/styles/Layout.module.css";

export default function Layout({ title, description, keywords, children }) {
  const router=useRouter();
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header/>
      {router.pathname==="/"&&<ShowCase/>}
      <div className={classes.container}>{children}</div>
      <Footer/>
    </Fragment>
  );
}

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Find the latest DJ and other musical events",
  keywords: "music,dj,edm,events",
};
