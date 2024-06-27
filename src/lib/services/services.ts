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
    noOfFollowers: "sum(followers)",
    noOfFollowing: "sum(following)",
    Avatar: "Avatar S3 hosted url",
  };

  return bio;
};
