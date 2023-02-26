import React from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function newMeetup() {
  const addMeetupHandler = (meetupData) => {
    console.log(meetupData);
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>;
}

export default newMeetup;
