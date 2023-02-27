import React from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Trip",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Kiyomizu.jpg",
    address: "Some street Kyoto Japan",
    description:
      "Kyoto , officially Kyoto City , is the capital city of Kyoto Prefecture in Japan. Located in the Kansai region on the island of Honshu, Kyoto forms a part of the Keihanshin metropolitan area along with Osaka and Kobe.",
  },
  {
    id: "m2",
    title: "A Second Trip",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Hakodate_Goryokaku_Panorama_1.JPG/1920px-Hakodate_Goryokaku_Panorama_1.JPG",
    address: "Some street Hokkaido Japan",
    description:
      "Hokkaido 'Northern Sea Circuit', is Japan's second largest island and comprises the largest and northernmost prefecture, making up its own region.",
  },
];

function HomePage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://jeffnext:lGvXSLjT9OKYVXNO@cluster.psx2gf1.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const data = await meetupsCollection.find().toArray();

  const meetups = data.map((meetup) => ({
    title: meetup.title,
    address: meetup.address,
    image: meetup.image,
    id: meetup._id.toString(),
  }));

  client.close();

  return {
    props: {
      meetups: meetups,
    },
    revalidate: 1,
  };
}

export default HomePage;
