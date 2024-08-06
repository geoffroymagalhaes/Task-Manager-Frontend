import { useState } from "react";

import LeftSidebar from "../components/Leftsidebar/LeftSidebar";
import RightSidebar from "../components/RigthSidebar/RightSidebar";
import MainContent from "../components/MainContent/MainContent";
import BottomSidebar from "../components/Bottomsidebar/BottomSidebar";

const Home = ({ token }) => {
  const [selectedTaskListId, setSelectedTaskListId] = useState(null);

  return (
    <>
      <LeftSidebar setSelectedTaskListId={setSelectedTaskListId} />
      <MainContent selectedTaskListId={selectedTaskListId} />
      <RightSidebar />
      <BottomSidebar selectedTaskListId={selectedTaskListId} />
    </>
  );
};
export default Home;
