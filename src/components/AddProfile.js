import React, { useRef } from "react";
import PropTypes from "prop-types";
import { db } from "../firebase";

const AddProfile = ({ userId }) => {
    const inpRef = useRef(null);

    const handleAddTask = async () => {
        try {
            const newProfile = inpRef.current.value;

            // guardar en firebase
            const addProfRef = db.ref(`todos/${userId}`);
            const newProfileRef = addProfRef.push();
            console.log("newTodoRef", newProfileRef.key);
            await newProfileRef.set({
                id: newProfileRef.key,
                title: newProfile,
            });
            inpRef.current.value = "";
            // onAddTask(newTodo);
        } catch (e) {
            console.log("e", e);
        }
    };

    return (
        <div>
            <label htmlFor="profile">dato de usuario</label>
            <input type="text" id="todo" ref={inpRef} />

            <button onClick={handleAddTask}>cambiar datos</button>
        </div>
    );
};

AddProfile.propTypes = {
    onAddTask: PropTypes.func,
};

AddProfile.propTypes = {
    userId: PropTypes.string,
};

export default AddProfile;