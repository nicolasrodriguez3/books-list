import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Lo sentimos, algo no salio como debia.</p>
      <p>
        <i>{error.status} - {error.statusText || error.message}</i>
      </p>
    </div>
  );
}