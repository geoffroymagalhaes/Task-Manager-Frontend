import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import menuIcon from "../../assets/icons/menu.svg";
import addIcon from "../../assets/icons/add.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import Modal from "../Modal/Modal";
import "./LeftSidebar.css";

const LeftSidebar = ({ setSelectedTaskListId }) => {
  const [taskLists, setTaskLists] = useState([]);
  const [newTaskListName, setNewTaskListName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskListToDelete, setTaskListToDelete] = useState(null);
  const [toggleLeftSidebar, setToggleLeftSidebar] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleToggle = () => {
    setToggleLeftSidebar((prevState) => !prevState);
  };

  useEffect(() => {
    fetchTaskLists();
  }, []);

  const fetchTaskLists = async () => {
    try {
      const token = Cookies.get("tasks-user-token");
      const response = await axios.get("http://localhost:3000/task-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTaskLists(response.data);
    } catch (error) {
      console.error("Error fetching task lists:", error);
    }
  };

  const createTaskList = async () => {
    try {
      const token = Cookies.get("tasks-user-token");
      await axios.post(
        "http://localhost:3000/task-list",
        { title: newTaskListName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewTaskListName("");
      fetchTaskLists();
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating task list:", error);
    }
  };

  const confirmDeleteTaskList = (taskListId) => {
    setTaskListToDelete(taskListId);
    setShowDeleteModal(true);
  };

  const deleteTaskList = async () => {
    try {
      const token = Cookies.get("tasks-user-token");

      await axios.delete(
        `http://localhost:3000/task-list/${taskListToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowDeleteModal(false);
      setTaskListToDelete(null);
      fetchTaskLists();
    } catch (error) {
      console.error("Error deleting task list:", error);
    }
  };

  return (
    <div
      className={`left-sidebar ${
        toggleLeftSidebar ? "left-sidebarM" : "left-sidebarSM"
      }`}
    >
      <button className="menuButton" onClick={handleToggle}>
        <img src={menuIcon} alt="menuIcon" />
      </button>
      {toggleLeftSidebar && (
        <div className="openmenu">
          <input
            className="input"
            type="text"
            placeholder="New Task List"
            value={newTaskListName}
            onChange={(e) => setNewTaskListName(e.target.value)}
          />
          <button className="menuButton" onClick={createTaskList}>
            <img src={addIcon} alt="add icon" />
          </button>
        </div>
      )}
      {!toggleLeftSidebar && (
        <button className="menuButton" onClick={() => setShowCreateModal(true)}>
          <img src={addIcon} alt="add icon" />
        </button>
      )}

      <ul>
        {taskLists.map((taskList) => (
          <li key={taskList.id}>
            <span onClick={() => setSelectedTaskListId(taskList.id)}>
              {taskList.title}
            </span>
            {toggleLeftSidebar && (
              <button onClick={() => confirmDeleteTaskList(taskList.id)}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            )}
          </li>
        ))}
      </ul>

      <Modal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={createTaskList}
      >
        <input
          className="input"
          type="text"
          placeholder="New Task List"
          value={newTaskListName}
          onChange={(e) => setNewTaskListName(e.target.value)}
        />
      </Modal>

      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteTaskList}
      >
        <p>
          Are you sure you want to delete this task list? All associated tasks
          will be deleted.
        </p>
      </Modal>
    </div>
  );
};

export default LeftSidebar;
