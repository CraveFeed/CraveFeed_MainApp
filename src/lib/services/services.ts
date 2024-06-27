import * as dotenv from "dotenv";

dotenv.config();

const fetchBio = async (id: string): Promise<object> => {
  const response = await fetch(`http://localhost:3000/${id}`);
  const data = await response.json();

  //   return data;

  let bio = {
    bio: "Hey there! I'm Vibhor, a huge food enthusiast.",
    username: "@vibhorphalke",
    firstName: "Vibhor",
    lastname: "Phalke",
    noOfFollowers: "5000",
    noOfFollowing: "12",
    Avatar: "Avatar S3 hosted url",
  };

  return bio;
};
