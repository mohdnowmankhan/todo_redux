import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./todo.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskToStore,
  completeTaskToStore,
  deleteTaskToStore,
  editTaskToStore,
} from "../../redux/todo/todoActions";

function Todo() {
  const [taskInput, setTaskInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState({});

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const taskList = useSelector((state) => state.taskList);
  const dispatch = useDispatch();

  const addTask = () => {
    const taskToAdd = {
      id: `list-${new Date().getTime()}`,
      desc: taskInput,
      status: "Pending",
    };
    dispatch(addTaskToStore(taskToAdd));
    setTaskInput("");
  };

  const saveTask = () => {
    const taskIndex = taskList.findIndex((item) => {
      return item.id === editingTask.id;
    });
    const task = taskList[taskIndex];
    const updatedTask = {
      ...task,
      desc: taskInput,
    };
    const updatedTaskList = [...taskList];
    updatedTaskList[taskIndex] = updatedTask;
    dispatch(editTaskToStore(updatedTaskList));
    setTaskInput("");
    setIsEditing(false);
  };

  const editTask = (id) => {
    setIsEditing(true);
    const taskIndex = taskList.findIndex((item) => {
      return item.id === id;
    });
    const task = taskList[taskIndex];
    console.log("task: ", task);
    setTaskInput(task.desc);
    setEditingTask(task);
  };

  const deleteTask = (id) => {
    if (isEditing && editingTask.id === id) {
      // if user is editing the task and clicks on delete button for that task
      setTaskInput("");
      setIsEditing(false);
    }
    const newList = taskList.filter((task) => {
      return task.id !== id; // just don't take the task user chose for deleting
    });
    dispatch(deleteTaskToStore(newList));
  };

  const handleCheckbox = (e, id) => {
    const taskIndex = taskList.findIndex((item) => {
      return item.id === id;
    });
    const task = taskList[taskIndex];
    const updatedtask = {
      ...task,
      status: task.status === "Pending" ? "Completed" : "Pending",
    };
    const updatedTaskList = [...taskList];
    updatedTaskList[taskIndex] = updatedtask;
    dispatch(completeTaskToStore(updatedTaskList));
  };

  return (
    <div className="todoContainer">
      <h2>React Todo App</h2>
      <div className="addTask">
        <input
          type="text"
          placeholder="Enter task description..."
          value={taskInput}
          onChange={handleInputChange}
        />
        {isEditing ? (
          <button onClick={saveTask}>Save</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>
      <div className="taskListContainer">
        {taskList?.length ? (
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Description</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {taskList.map((task, index) => {
                return (
                  <tr key={task.id}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheckbox(e, task.id)}
                      />
                    </td>
                    <td className={task.status === "Completed" ? "strike" : ""}>
                      {task.desc}
                    </td>
                    <td className={task.status === "Completed" ? "strike" : ""}>
                      {task.status}
                    </td>
                    <td onClick={() => editTask(task.id)}>
                      <FontAwesomeIcon icon={faPen} className="modify" />
                    </td>
                    <td onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrash} className="modify" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "No tasks found. Please add some tasks..."
        )}
      </div>
    </div>
  );
}

export default Todo;
