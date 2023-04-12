import "./LoginButton.css";
import Card from "../UI/Card";
import { signInWithGoogle } from "../../Firebase/Firebase";

const LoginButton = (props) => {
  const onClickHandler = (event) => {
    props.setIsLoggedIn(true);
    signInWithGoogle(props.setUser);
  };

  return (
    <div className="login">
      <Card className="login-card" onClick={onClickHandler}>
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="nope"
            />
          </div>
          <p className="btn-text">Sign in with Google</p>
        </div>
      </Card>
    </div>
  );
};

export default LoginButton;
