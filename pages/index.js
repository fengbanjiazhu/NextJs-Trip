import React from "react";
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
      <MeetupList meetups={props.meetups}></MeetupList>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  // fetch data here
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;
