import { useState } from "react";

import LeftSidebar from "../components/Leftsidebar/LeftSidebar";
import RightSidebar from "../components/RigthSidebar/RightSidebar";
import MainContent from "../components/MainContent/MainContent";
import BottomSidebar from "../components/Bottomsidebar/BottomSidebar";

const Home = () => {
  const [selectedTaskListId, setSelectedTaskListId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskListUpdated, setTaskListUpdated] = useState(false);
  const [taskStatusUpdated, setTaskStatusUpdated] = useState(false);
  const [tasks, setTasks] = useState([]);
  console.log(selectedTaskId);

  return (
    <>
      <LeftSidebar
        selectedTaskListId={selectedTaskListId}
        setSelectedTaskListId={setSelectedTaskListId}
      />
      <MainContent
        tasks={tasks}
        setTasks={setTasks}
        setSelectedTaskId={setSelectedTaskId}
        selectedTaskListId={selectedTaskListId}
        taskListUpdated={taskListUpdated}
        taskStatusUpdated={taskStatusUpdated}
        setTaskStatusUpdated={setTaskStatusUpdated}
      />
      <RightSidebar
        tasks={tasks}
        setSelectedTaskId={setSelectedTaskId}
        selectedTaskId={selectedTaskId}
        selectedTaskListId={selectedTaskListId}
        setTaskListUpdated={setTaskListUpdated}
      />
      <BottomSidebar
        selectedTaskListId={selectedTaskListId}
        setTaskStatusUpdated={setTaskStatusUpdated}
        taskStatusUpdated={taskStatusUpdated}
      />
    </>
  );
};
export default Home;
