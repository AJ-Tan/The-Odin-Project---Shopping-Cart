import "./errorContent.css";

function ErrorContent({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="error-content">
      <span>Something went wrong, please try again later.</span>
      <span className="error-content-message"> {errorMessage}</span>
    </div>
  );
}

export default ErrorContent;
