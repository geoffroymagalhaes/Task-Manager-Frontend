import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import "./MainContent.css";
const MainContent = ({
  setSelectedTaskId,
  selectedTaskListId,
  taskListUpdated,
  tasks,
  setTasks,
}) => {
  // const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  useEffect(() => {
    if (selectedTaskListId) {
      fetchTasks(selectedTaskListId);
    }
  }, [selectedTaskListId, taskListUpdated]);

  const fetchTasks = async (taskListId) => {
    try {
      const token = Cookies.get("tasks-user-token");
      const response = await axios.get(
        `http://localhost:3000/tasks?tasklistId=${taskListId}&status=OPEN`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const createTask = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get("tasks-user-token");
      await axios.post(
        `http://localhost:3000/tasks/${selectedTaskListId}`,
        { title: title, description: description, dueDate: dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDueDate("");
      setDescription("");
      fetchTasks(selectedTaskListId);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  const toggleTaskStatus = async (taskId) => {
    try {
      const token = Cookies.get("tasks-user-token");
      const task = tasks.find((task) => task.id === taskId);
      const newStatus = task.status === "OPEN" ? "DONE" : "OPEN";
      await axios.patch(
        `http://localhost:3000/tasks/${selectedTaskListId}/${taskId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks(selectedTaskListId);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="main-content">
      {selectedTaskListId && (
        <form onSubmit={createTask}>
          <input
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            required
            type="date"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <input type="submit" value="Add Task" />
        </form>
      )}
      {!selectedTaskListId ? (
        <p>Select A Tasklist, please.</p>
      ) : (
        <>
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} onClick={() => setSelectedTaskId(task.id)}>
                  <div>
                    <h1>{task.title}</h1>
                    {/* <h2>{task.description}</h2>
                      <p>{task.status}</p>
                      <p>{task.dueDate}</p> */}
                    <button
                      onClick={() => {
                        toggleTaskStatus(task.id);
                      }}
                    >
                      {task.status === "OPEN" ? "DONE" : "OPEN"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Tasklist empty, please start adding tasks.</p>
          )}
        </>
      )}
    </div>
  );
};

export default MainContent;
