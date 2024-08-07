import Cookies from "js-cookie";
import axios from "axios";
import "./RightSidebar.css";
const RightSidebar = ({
  tasks,
  setSelectedTaskId,
  selectedTaskId,
  selectedTaskListId,
  setTaskListUpdated,
}) => {
  const task = tasks.find((task) => task.id === selectedTaskId);

  const DeleteTask = async (taskId) => {
    try {
      const token = Cookies.get("tasks-user-token");
      await axios.delete(
        `http://localhost:3000/tasks/${selectedTaskListId}/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTaskListUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div>
      {task ? (
        <div className="displayRightSidebar right-sidebar">
          <button onClick={() => setSelectedTaskId(null)}>Close</button>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => DeleteTask(selectedTaskId)}>Delete</button>
        </div>
      ) : (
        <div className="hiddenRightSidebar right-sidebar"></div>
      )}
    </div>
  );
};

export default RightSidebar;
