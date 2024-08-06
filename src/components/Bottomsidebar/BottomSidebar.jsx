import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./BottomSidebar.css";

const BottomSidebar = ({ selectedTaskListId }) => {
  const [tasks, setTasks] = useState([]);
  const [toggleBottomSidebar, setToggleBottomSidebar] = useState(false);
  const handleToggle = () => {
    setToggleBottomSidebar((prevState) => !prevState);
  };

  useEffect(() => {
    if (selectedTaskListId) {
      fetchTasks(selectedTaskListId);
    }
  }, [selectedTaskListId]);

  const fetchTasks = async (taskListId) => {
    try {
      const token = Cookies.get("tasks-user-token");
      const response = await axios.get(
        `http://localhost:3000/tasks?tasklistId=${taskListId}&status=DONE`,
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
    <div
      className={`bottom-sidebar ${
        toggleBottomSidebar ? "bottom-sidebarM" : "bottom-sidebarSM"
      }`}
    >
      <div>
        <p>completed task section</p>
        <button onClick={handleToggle}>up</button>
      </div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div>
                <div>
                  <h1>{task.title}</h1>
                  <h2>{task.description}</h2>
                  <p>{task.status}</p>
                  <p>{task.dueDate}</p>
                </div>
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
        <p>There is no task completed.</p>
      )}
    </div>
  );
};

export default BottomSidebar;
