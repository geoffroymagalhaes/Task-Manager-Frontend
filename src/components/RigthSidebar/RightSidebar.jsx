import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "../Modal/Modal";
import "./RightSidebar.css";

const RightSidebar = ({
  tasks,
  setSelectedTaskId,
  selectedTaskId,
  selectedTaskListId,
  setTaskListUpdated,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      setShowDeleteModal(false); // Close modal after deletion
      setSelectedTaskId(null); // Clear the selected task
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const confirmDeleteTask = (taskId) => {
    setShowDeleteModal(true);
  };

  return (
    <div>
      {task ? (
        <div className="displayRightSidebar right-sidebar">
          <button onClick={() => setSelectedTaskId(null)}>X</button>
          <div>
            <h1>Title:</h1>
            <h1>{task.title}</h1>
          </div>
          <div>
            <h1>Description:</h1>
            <p>{task.description}</p>
          </div>
          <div>
            <h1>Due Date:</h1>
            <p>{task.dueDate.split("T")[0].split("-").reverse().join("-")}</p>
          </div>
          <div>
            <h1>Date Creation:</h1>
            <p>
              {task.createdDate.split("T")[0].split("-").reverse().join("-")}
            </p>
          </div>

          <button onClick={() => confirmDeleteTask(selectedTaskId)}>
            Delete
          </button>
        </div>
      ) : (
        <div className="hiddenRightSidebar right-sidebar"></div>
      )}

      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => DeleteTask(selectedTaskId)}
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </div>
  );
};

export default RightSidebar;
