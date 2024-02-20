// DashboardPage.js
import React, { useState, useEffect } from "react";

import Header from "../Header";
import SubHeader from "../SubHeader";

import "../css/DashboardPage.css";
import Board from "../Board";
import {
  faTasks,
  faClipboardCheck,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

// import Kanban from "../components/Kanban";

const DashboardPage = () => {
  const boardIcons = {
    "to-do": faTasks,
    "in-progress": faClipboardCheck,
    done: faCheckCircle,
  };

  const [boards, setBoards] = useState([
    {
      id: "to-do",
      title: "TO DO",
      cards: [],
    },
    {
      id: "in-progress",
      title: "IN PROGRESS",
      cards: [],
    },
    {
      id: "done",
      title: "DONE",
      cards: [],
    },
  ]);

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const removeBoard = (id) => {
    // You can't remove the static boards, so this function is not needed.
  };

  const addCardHandler = (id, title) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  };

  const addEmptyCardToBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title: "",
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    if (boards[index].cards.length === 0) {
      addEmptyCardToBoard(bid); // Add an empty card to the target board
    }
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);
  const [taskCards, setTaskCards] = useState([]);

  const addTaskCard = () => {
    const newTaskCard = { id: Date.now(), content: "" };
    setTaskCards([...taskCards, newTaskCard]);
  };

  const removeTaskCardFromTodoList = (idToRemove) => {
    setTaskCards(taskCards.filter((task) => task.id !== idToRemove));
  };

  //////////////////////////////////////////////////////////////////////////////////////
  const [searchQueryFromHeader, setSearchQueryFromHeader] = useState("");

  // Function to handle search query from Header component
  const handleSearchQueryFromHeader = (query) => {
    setSearchQueryFromHeader(query);
  };
  console.log(
    "Search query from Header component to dashboard:",
    searchQueryFromHeader
  );

  /////////////////////////////////////////////////////////////////////////////////////

  return (
    // <DndProvider backend={HTML5Backend}>
    <div>
      <Header onSearch2={handleSearchQueryFromHeader} />
      <SubHeader />
      <div>
        <div className="app_boards_container">
          <div className="app_boards_row">
            {boards.map((item) => (
              <Board
                key={item.id}
                board={item}
                addCard={addCardHandler}
                removeBoard={() => removeBoard(item.id)}
                removeCard={removeCard}
                dragEnded={dragEnded}
                dragEntered={dragEntered}
                updateCard={updateCard}
                myProp={searchQueryFromHeader}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    // </DndProvider>
  );
};

export default DashboardPage;

// import React, { useState } from "react";
// import TodoList from "../components/TodoList";
// import DoingList from "../components/DoingList";
// import DoneList from "../components/DoneList";
// import Header from "../components/Header"; // Import the Header component
// import SubHeader from "../components/SubHeader";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import "../css/DashboardPage.css"; // Import your CSS file for styling if needed
// import TaskCard from "../components/TaskCard";

// const DashboardPage = () => {
//   const [taskCards, setTaskCards] = useState([
//     <TaskCard key={0} />,
//     <TaskCard key={1} />,
//     <TaskCard key={2} />,
//     <TaskCard key={3} />,
//   ]);

//   const addTaskCard = () => {
//     const newTaskCard = <TaskCard key={Date.now()} />;
//     setTaskCards([newTaskCard, ...taskCards]);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         <Header onAddItem={addTaskCard} /> {/* Pass the addTaskCard function */}
//         <SubHeader />
//         <div className="dashboard-container">
//           <div className="column">
//             {/* <FontAwesomeIcon icon={faClipboardList} className="icon" /> */}
//             {/* <h2>TodoList</h2> */}
//             <TodoList taskCards={taskCards} /> {/* Pass taskCards as prop */}
//           </div>
//           <div className="column">
//             {/* <FontAwesomeIcon icon={faCog} className="icon" /> */}
//             {/* <h2>DoingList</h2> */}
//             <DoingList />
//           </div>
//           <div className="column">
//             {/* <FontAwesomeIcon icon={faCheckCircle} className="icon" /> */}
//             {/* <h2>DoneList</h2> */}
//             <DoneList />
//           </div>
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default DashboardPage;

// import React, { useState } from "react";
// import TodoList from "../components/TodoList";
// import DoingList from "../components/DoingList";
// import DoneList from "../components/DoneList";
// import Header from "../components/Header"; // Import the Header component
// import SubHeader from "../components/SubHeader";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faClipboardList,
//   faCog,
//   faCheckCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import "../css/DashboardPage.css"; // Import your CSS file for styling if needed
// import TaskCard from "../components/TaskCard";

// const DashboardPage = () => {
//   const [taskCards, setTaskCards] = useState([
//     <TaskCard key={0} />,
//     <TaskCard key={1} />,
//     <TaskCard key={2} />,
//     <TaskCard key={3} />,
//   ]);

//   const addTaskCard = () => {
//     const newTaskCard = <TaskCard key={Date.now()} />;
//     setTaskCards([newTaskCard, ...taskCards]);
//   };

//   return (
//     <div>
//       <Header onAddItem={addTaskCard} /> {/* Pass the addTaskCard function */}
//       <SubHeader />
//       <div className="dashboard-container">
//         <div className="column">
//           {/* <FontAwesomeIcon icon={faClipboardList} className="icon" /> */}
//           {/* <h2>TodoList</h2> */}
//           <TodoList taskCards={taskCards} /> {/* Pass taskCards as prop */}
//         </div>
//         <div className="column">
//           {/* <FontAwesomeIcon icon={faCog} className="icon" /> */}
//           {/* <h2>DoingList</h2> */}
//           <DoingList />
//         </div>
//         <div className="column">
//           {/* <FontAwesomeIcon icon={faCheckCircle} className="icon" /> */}
//           {/* <h2>DoneList</h2> */}
//           <DoneList />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

// import React from "react";
// import TodoList from "../components/TodoList";
// import DoingList from "../components/DoingList";
// import DoneList from "../components/DoneList";
// import Header from "../components/Header"; // Import the Header component
// import SubHeader from "../components/SubHeader";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faClipboardList,
//   faCog,
//   faCheckCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import "../css/DashboardPage.css"; // Import your CSS file for styling if needed

// const DashboardPage = () => {
//   return (
//     <div>
//       <Header /> {/* Include the Header component at the top */}
//       <SubHeader />
//       <div className="dashboard-container">
//         <div className="column">
//           {/* <FontAwesomeIcon icon={faClipboardList} className="icon" /> */}
//           {/* <h2>TodoList</h2> */}
//           <TodoList />
//         </div>
//         <div className="column">
//           {/* <FontAwesomeIcon icon={faCog} className="icon" /> */}
//           {/* <h2>DoingList</h2> */}
//           <DoingList />
//         </div>
//         <div className="column">
//           {/* <FontAwesomeIcon icon={faCheckCircle} className="icon" /> */}
//           {/* <h2>DoneList</h2> */}
//           <DoneList />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

// import React from "react";
// import TodoList from "../components/TodoList";
// import DoingList from "../components/DoingList";
// import DoneList from "../components/DoneList";

// const DashboardPage = () => {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <TodoList />
//       <DoingList />
//       <DoneList />
//     </div>
//   );
// };

// export default DashboardPage;
