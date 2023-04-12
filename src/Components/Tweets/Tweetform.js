import "./Tweetform.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useReducer, useState } from "react";
import Tag from "./Tag";

const tagReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      let tagName = action.tag;
      let updatedTags = [...state, tagName];
      return updatedTags;
    }
    case "REMOVE": {
      let updatedTags = state.filter((tag) => {
        return tag !== action.tag;
      });
      return updatedTags;
    }

    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

const Tweetform = (props) => {
  const [tags, dispatchTags] = useReducer(tagReducer, []);

  const clickHandler = () => {
    props.setIsClicked(false);
  };

  const [enteredContent, setContent] = useState("");

  const contentHandler = (event) => {
    setContent(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const username = props.user.email.substr(
      0,
      props.user.email.indexOf("@")
    );

    const tweetData = {
      username: username,
      name: props.user.displayName,
      content: enteredContent,
      image: props.user.photoURL,
    };

    props.onSaveTweet(tweetData);
    clickHandler();
    setContent("");
  };

  const keyPressHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      dispatchTags({
        type: "ADD",
        tag: event.target.value,
      });

      event.target.value = "";
    }
  };

  const removeTagHandler = (tag) => {
    dispatchTags({
      type: "REMOVE",
      tag: tag,
    });
  };

  return props.trigger ? (
    <div className="newtweet">
      <Card className="newtweet-inner">
        <div className="close" onClick={clickHandler}></div>
        <form onSubmit={onSubmitHandler}>
          <ul className="list-outer">
            <li className="list-outer__content">
              <textarea
                name="paragraph_text"
                cols="50"
                rows="10"
                placeholder="Enter your message here"
                onChange={contentHandler}
                value={enteredContent}
              ></textarea>
            </li>
            <li>
              <input
                placeholder="Enter tag here"
                onKeyPress={keyPressHandler}
              ></input>
            </li>
            <li>
              {tags.map((tag) => {
                return (
                  <Tag
                    key={tag}
                    tag={tag}
                    onClick={removeTagHandler}
                  />
                );
              })}
            </li>
          </ul>
          <div className="newtweet-inner__actions">
            <Button
              type="submit"
              className="newtweet-inner__action__tweet"
            >
              Tweet
            </Button>
          </div>
        </form>
      </Card>
    </div>
  ) : (
    ""
  );
};

export default Tweetform;
