import Loader from "rsuite/Loader";

// (Optional) Import component styles. If you are using Less, import the `index.less` file.
import "rsuite/Loader/styles/index.css";
const LoaderComponent = () => {
  return (
    <div style={{ textAlign: "center", paddingTop: "2rem" }}>
      <Loader size="md" />
    </div>
  );
};

export default LoaderComponent;
