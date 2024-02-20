import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";

import Dropdown from "./Dropdown";

import "../Components/css/Card.css";
import CardInfo from "./CardInfo";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, tasks, labels } = props.card;
  console.log(
    "SearchBar data received from the Board component to the Card",
    props.searchData
  );

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  const highlightStyle = {
    backgroundColor: "yellow", // Change this to the desired highlight color
  };

  const searchDataRegExp = new RegExp(props.searchData, "i");
  const isTitleMatching = props.searchData && searchDataRegExp.test(title);

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div
          className="card_title"
          style={isTitleMatching ? highlightStyle : null}
        >
          {title}
          <div className="hello-its-walid">CLICk TO VIEW OR VIEW DETAILS</div>
        </div>
        <div className="card_footer">
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className="card_footer_item">
              <CheckSquare className="card_footer_icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;

// import React, { useState } from "react";
// import { CheckSquare, Clock, MoreHorizontal } from "react-feather";

// import Dropdown from "../Dropdown/Dropdown";

// import "./Card.css";
// import CardInfo from "./CardInfo/CardInfo";

// function Card(props) {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const { id, title, date, tasks, labels } = props.card;
//   console.log(
//     "SearchBar data received from the Board component to the Card",
//     props.searchData
//   );

//   const formatDate = (value) => {
//     if (!value) return "";
//     const date = new Date(value);
//     if (!date) return "";

//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Aprl",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];

//     const day = date.getDate();
//     const month = months[date.getMonth()];
//     return day + " " + month;
//   };

//   const highlightStyle = {
//     backgroundColor: "yellow", // Change this to the desired highlight color
//   };

//   const searchDataRegExp = new RegExp(props.searchData, "i");
//   const isTitleMatching = searchDataRegExp.test(title);

//   return (
//     <>
//       {showModal && (
//         <CardInfo
//           onClose={() => setShowModal(false)}
//           card={props.card}
//           boardId={props.boardId}
//           updateCard={props.updateCard}
//         />
//       )}
//       <div
//         className="card"
//         draggable
//         onDragEnd={() => props.dragEnded(props.boardId, id)}
//         onDragEnter={() => props.dragEntered(props.boardId, id)}
//         onClick={() => setShowModal(true)}
//       >
//         <div className="card_top">
//           <div className="card_top_labels">
//             {labels?.map((item, index) => (
//               <label key={index} style={{ backgroundColor: item.color }}>
//                 {item.text}
//               </label>
//             ))}
//           </div>
//           <div
//             className="card_top_more"
//             onClick={(event) => {
//               event.stopPropagation();
//               setShowDropdown(true);
//             }}
//           >
//             <MoreHorizontal />
//             {showDropdown && (
//               <Dropdown
//                 class="board_dropdown"
//                 onClose={() => setShowDropdown(false)}
//               >
//                 <p onClick={() => props.removeCard(props.boardId, id)}>
//                   Delete Card
//                 </p>
//               </Dropdown>
//             )}
//           </div>
//         </div>
//         <div
//           className="card_title"
//           style={isTitleMatching ? highlightStyle : null}
//         >
//           {title}
//           <div className="hello-its-walid">CLICk TO VIEW OR VIEW DETAILS</div>
//         </div>
//         <div className="card_footer">
//           {date && (
//             <p className="card_footer_item">
//               <Clock className="card_footer_icon" />
//               {formatDate(date)}
//             </p>
//           )}
//           {tasks && tasks?.length > 0 && (
//             <p className="card_footer_item">
//               <CheckSquare className="card_footer_icon" />
//               {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
//             </p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Card;

// import React, { useState } from "react";
// import { CheckSquare, Clock, MoreHorizontal } from "react-feather";

// import Dropdown from "../Dropdown/Dropdown";

// import "./Card.css";
// import CardInfo from "./CardInfo/CardInfo";

// function Card(props) {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const { id, title, date, tasks, labels } = props.card;
//   console.log(
//     "SearchBar data received from the Board component to the Card",
//     props.searchData
//   );
//   const formatDate = (value) => {
//     if (!value) return "";
//     const date = new Date(value);
//     if (!date) return "";

//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Aprl",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];

//     const day = date.getDate();
//     const month = months[date.getMonth()];
//     return day + " " + month;
//   };

//   return (
//     <>
//       {showModal && (
//         <CardInfo
//           onClose={() => setShowModal(false)}
//           card={props.card}
//           boardId={props.boardId}
//           updateCard={props.updateCard}
//         />
//       )}
//       <div
//         className="card"
//         draggable
//         onDragEnd={() => props.dragEnded(props.boardId, id)}
//         onDragEnter={() => props.dragEntered(props.boardId, id)}
//         onClick={() => setShowModal(true)}
//       >
//         <div className="card_top">
//           <div className="card_top_labels">
//             {labels?.map((item, index) => (
//               <label key={index} style={{ backgroundColor: item.color }}>
//                 {item.text}
//               </label>
//             ))}
//           </div>
//           <div
//             className="card_top_more"
//             onClick={(event) => {
//               event.stopPropagation();
//               setShowDropdown(true);
//             }}
//           >
//             <MoreHorizontal />
//             {showDropdown && (
//               <Dropdown
//                 class="board_dropdown"
//                 onClose={() => setShowDropdown(false)}
//               >
//                 <p onClick={() => props.removeCard(props.boardId, id)}>
//                   Delete Card
//                 </p>
//               </Dropdown>
//             )}
//           </div>
//         </div>
//         <div className="card_title">
//           {title}
//           <div className="hello-its-walid">CLICk TO VIEW OR VIEW DETAILS</div>
//         </div>
//         <div className="card_footer">
//           {date && (
//             <p className="card_footer_item">
//               <Clock className="card_footer_icon" />
//               {formatDate(date)}
//             </p>
//           )}
//           {tasks && tasks?.length > 0 && (
//             <p className="card_footer_item">
//               <CheckSquare className="card_footer_icon" />
//               {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
//             </p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Card;
