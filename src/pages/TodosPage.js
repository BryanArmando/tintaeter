
import React from "react";
import TodoList from "../components/TodoList";

import PropTypes from "prop-types";

const TodosPage = ({ userId }) => {
  //Si le paso sin el userID este muestra todo sin identificar al usuario
  return <TodoList userId={userId} />;
};

TodosPage.propTypes = {
  userId: PropTypes.string,
};

export default TodosPage;