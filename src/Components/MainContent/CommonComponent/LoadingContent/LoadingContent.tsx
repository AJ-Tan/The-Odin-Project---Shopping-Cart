import loadingGIF from "../../../../assets/loading-gray.gif";
import "./LoadingContent.css";

function LoadingContent() {
  return (
    <div className="loading-content">
      <img src={loadingGIF} alt="" />
      <span>Loading</span>
    </div>
  );
}

export default LoadingContent;
