import { useEffect, useState } from "react";
import "../styles/todoList.css";
import AddHistoryForm from "./AddHistoryForm";
import { db } from "../firebase";
import PropTypes from "prop-types";
import {Card, Col, Image} from "antd";
import CreateHistory from "../styles/CreateHistory.css"
import Row from "antd/es/descriptions/Row";

const HistoryList = ({ userId }) => {
    const [todos, setTodos] = useState(null);
    const [completed, setCompleted] = useState([]);
    const [darkMode, setDarkMode] = useState(false);


    useEffect(() => {
        console.log("useEffect TodoList (en cada renderizado)");
    }); // se ejecuta en cada renderizado del componente

    useEffect(() => {
        console.log("useEffect TodoList (solo cuando se monta)");
    }, []); // si la lista de dependencias es vacía ([]) se ejecuta solo cuando se monta el componente

    useEffect(() => {
        console.log("useEffect TodoList (completed)");
    }, [completed]); // se ejecuta solo cuando se actualiza la variable de estado "completed"



    useEffect(() => {
        if (darkMode) {
            console.log("DARK");
        } else {
            console.log("LIGHT");
        }
    }, [darkMode]);



    // Lectura de datos una sola vez al montar el componente
    // useEffect(() => {
    //   const getTodos = async () => {
    //     // const todoList = snapshot.val();
    //     // console.log("todoList", todoList);
    //
    //     const initialTodosList = [];
    //     const snapshot = await db.ref("todos").once("value");
    //     snapshot.forEach((childSnapshot) => {
    //       const todoId = childSnapshot.key;
    //       const todoData = childSnapshot.val();
    //       console.log("todoId", todoId);
    //       console.log("todoData", todoData);
    //
    //       initialTodosList.push(todoData);
    //     });
    //     setTodos(initialTodosList);
    //   };
    //
    //   getTodos();
    // }, []);

    // Suscribirnos a los cambios que ocurran en la base de datos
    useEffect(() => {
        db.ref(`history/${userId}`).on("value", (snapshot) => {
            const initialTodosList = [];
            console.log("snapshot", snapshot.val());
            snapshot.forEach((childSnapshot) => {
                const todoId = childSnapshot.key;
                const todoData = childSnapshot.val();
                console.log("histoId", todoId);
                console.log("histoData", todoData);

                initialTodosList.push(todoData);
            });
            setTodos(initialTodosList);
        });

        return () => {
            db.ref("history").off();
        };
    }, []);



    // const handleAddTask = (newTodo) => {
    //   setTodos((prevState) => [...prevState, newTodo]);
    // };

    const handleDeleteTask = (positionToDelete) => {
        const newTodos = todos.filter(
            (todo, taskPosition) => taskPosition !== positionToDelete
        );
        setTodos(newTodos);
    };

    const handleCompleteTask = (positionToComplete) => {
        const taskToComplete = todos[positionToComplete];
        handleDeleteTask(positionToComplete);
        setCompleted((prevState) => [...prevState, taskToComplete]);
    };

    const handleSetDarkMode = () => {
        setDarkMode(!darkMode);
    };


    return (
        <div className={darkMode ? "dark-mode" : ""}>
            <h1 className="titulo">Primeros pasos para crear tu historia</h1>

            <AddHistoryForm userId={userId} />

            <div>
                <h3 className="othertitle">Historias que te pueden gustar </h3>
                <div>
                    <div className="recomendados">
                    {todos === null
                        ? "Obteniendo historias..."
                        : todos.length === 0
                            ? "No existen historias :c"
                            : todos.map((todo, index) => (
                                <td key={todo.id}>
                                    <Card title={todo.title}
                                          style={{ width: 240, height:250 }}
                                          cover={<img alt="example" src={todo.imageURL} height={100} width={100} />}
                                    >
                                        {todo.genre}
                                    </Card>
                                </td>
                            ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

HistoryList.propTypes = {
    userId: PropTypes.string,
};

export default HistoryList;