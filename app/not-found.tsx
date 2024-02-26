import EmptyState from "./components/shared/EmptyState";

const NotFound = () => {
  return (
    <EmptyState
      title="404 Not Found"
      subTitle="Looks like this page is not available yet!"
    ></EmptyState>
  );
};

export default NotFound;
