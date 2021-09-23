import React from "react";
import PropTypes from "prop-types";
import HistoryList from "../components/HistoyList";

const CreateHistoryPage = () => {
    //Si le paso sin el userID este muestra todo sin identificar al usuario
    return <HistoryList />;
};

CreateHistoryPage.propTypes = {
    userId: PropTypes.string,
};

export default CreateHistoryPage;