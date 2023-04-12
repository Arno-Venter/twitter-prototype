import "./App.css";
import Button from "./Components/UI/Button";
import Tweet from "./Components/Tweets/Tweet";
import Tweetform from "./Components/Tweets/Tweetform";
import { useState, useEffect } from "react";
import { db } from "./Firebase/Firebase";
import {
  getDocs,
  collection,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import LoginButton from "./Components/Login/LoginButton";

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [dbTweets, setDbTweets] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const tweetCollectionRef = collection(
    db,
    "twitter-clone"
  );
  const q = query(
    tweetCollectionRef,
    orderBy("date", "desc")
  );

  // getting data form database
  useEffect(() => {
    const getTweets = async () => {
      const data = await getDocs(q);
      setDbTweets(
        data.docs.map((doc) => ({
          ...doc.data(),
          dbID: doc.id,
        }))
      );
    };

    getTweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setIsLoggedIn(true);
    }
  }, []);

  function tweetHandler() {
    setIsClicked(true);
  }

  async function createTweet(tweet) {
    await addDoc(tweetCollectionRef, {
      name: tweet.name,
      username: tweet.username,
      content: tweet.content,
      image: tweet.image,
      date: Date.now(),
    });
  }

  function onSaveTweet(tweet) {
    setDbTweets((prevTweets) => {
      return [tweet, ...prevTweets];
    });

    createTweet(tweet);
  }

  return isLoggedIn ? (
    <div>
      <Tweetform
        trigger={isClicked}
        setIsClicked={setIsClicked}
        onSaveTweet={onSaveTweet}
        user={user}
      ></Tweetform>
      <div className="tweet-button">
        <Button
          className="tweet-button__button"
          onClick={tweetHandler}
        >
          Tweet
        </Button>
      </div>
      {dbTweets &&
        dbTweets.map((tweet) => {
          return (
            <Tweet
              key={tweet.dbID}
              name={tweet.name}
              username={tweet.username}
              content={tweet.content}
              image={tweet.image}
            ></Tweet>
          );
        })}
    </div>
  ) : (
    <LoginButton
      setIsLoggedIn={setIsLoggedIn}
      setUser={setUser}
    />
  );
}

export default App;
