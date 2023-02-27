import React from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

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

function meetupDetails(props) {
  return (
    <MeetupDetail
      title={props.meetupData.title}
      image={props.meetupData.image}
      address={props.meetupData.address}
      description={props.meetupData.description}
    ></MeetupDetail>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jeffnext:lGvXSLjT9OKYVXNO@cluster.psx2gf1.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const data = await meetupsCollection.find({}, { _id: 1 }).toArray();

  const meetups = data.map((meetup) => ({ params: { meetupId: meetup._id.toString() } }));

  client.close();
  return {
    fallback: false,
    paths: meetups,
  };
}

export async function getStaticProps(context) {
  const meetupId = new ObjectId(context.params.meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://jeffnext:lGvXSLjT9OKYVXNO@cluster.psx2gf1.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedData = await meetupsCollection.findOne({ _id: meetupId });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedData._id.toString(),
        title: selectedData.title,
        image: selectedData.image,
        address: selectedData.address,
        description: selectedData.description,
      },
    },
  };
}

export default meetupDetails;
