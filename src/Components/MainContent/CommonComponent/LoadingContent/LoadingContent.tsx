import loadingGIF from "../../../../assets/loading-gray.gif";
import "./LoadingContent.css";

function LoadingContent() {
  return (
    <div className="loading-content">
      <img src={loadingGIF} alt="Loading content gif." />
      <span>Loading</span>
    </div>
  );
}

export default LoadingContent;
