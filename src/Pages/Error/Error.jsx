import React from "react";

/* 404 Not Found 처리 */
const Error = ({ history }) => {
  history.push("/");
  return <div>404 Not Found</div>;
};

export default Error;
