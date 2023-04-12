import "./Tweet.css";
import Card from "../UI/Card";

const Tweet = (props) => {
  return (
    <Card className="tweet-card">
      <div className="tweet-card__photo">
        <img src={props.image} alt="None" />
      </div>
      <header>
        <h1>
          {props.name}{" "}
          <span className="tweet-header__username">
            @{props.username}
          </span>
        </h1>
      </header>
      <p className="tweet-content">{props.content}</p>
    </Card>
  );
};

export default Tweet;
