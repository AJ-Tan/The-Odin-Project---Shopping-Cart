import { Link } from "react-router";
import "./pageError.css";

function PageError() {
  return (
    <div className="page-error">
      <h1>This Page Doesn't Seem To Exist.</h1>
      <p>It looks like the link pointing here was faulty.</p>
      <Link className="primary-button " to="/">
        Go back
      </Link>
    </div>
  );
}

export default PageError;
