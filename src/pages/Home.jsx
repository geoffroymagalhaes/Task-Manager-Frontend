import { useState } from "react";

import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import MainContent from "../components/MainContent";

const Home = ({ token }) => {
  const [selectedTaskListId, setSelectedTaskListId] = useState(null);

  return (
    <>
      <h1>My task Manager</h1>
      <LeftSidebar setSelectedTaskListId={setSelectedTaskListId} />
      <MainContent selectedTaskListId={selectedTaskListId} />
      <RightSidebar />
    </>
  );
};
export default Home;
