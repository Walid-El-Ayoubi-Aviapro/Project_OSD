import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../Components/Card";
import Dropdown from "./Dropdown";
import Editable from "./Editable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faClipboardCheck,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../Components/css/Board.css";

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropAreaRef = useRef(null);
  console.log(
    "Search data received from Dshboard page down to board",
    props.myProp
  );
  useEffect(() => {
    // Check if the board has no cards
    if (props.board.cards.length === 0) {
      // Add a default card to the board
      props.addCard(props.board.id, "Drop Here Or In Place of The needed Card");
    }
  }, [props.board]); // Run whenever props.board changes

  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    const sourceBoardId = e.dataTransfer.getData("sourceBoardId");
    const sourceCardId = e.dataTransfer.getData("sourceCardId");
    props.dragEnded(sourceBoardId, sourceCardId);
    props.removeCard(sourceBoardId, sourceCardId);

    // props.addCard(props.board.id, cardId); // Pass the cardId instead of a new card title
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const boardIcons = {
    "to-do": faTasks,
    "in-progress": faClipboardCheck,
    done: faCheckCircle,
  };

  const Icon = boardIcons[props.board.id];

  return (
    <div>
      <div className="board" onDrop={handleDrop} onDragOver={handleDragOver}>
        <div className="board_header">
          <p className="board_header_title">
            <FontAwesomeIcon icon={Icon} className="icon" />
            {props.board?.title}
            <span>{(props.board?.cards?.length || 0) - 1}</span>
          </p>
          <div
            className="board_header_title_more"
            onClick={() => setShowDropdown(true)}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeBoard()}>Delete Board</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="board_cards custom-scroll">
          {props.board?.cards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              boardId={props.board.id}
              removeCard={props.removeCard}
              dragEntered={props.dragEntered}
              dragEnded={props.dragEnded}
              updateCard={props.updateCard}
              searchData={props.myProp}
            />
          ))}
          <Editable
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board_add-card"
            editClass="board_add-card_edit"
            onSubmit={(value) => props.addCard(props.board?.id, value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useRef, useEffect } from "react";
// import { MoreHorizontal } from "react-feather";
// import Card from "../Card/Card";
// import Dropdown from "../Dropdown/Dropdown";
// import Editable from "../Editabled/Editable";
// import "./Board.css";

// function Board(props) {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropAreaRef = useRef(null);

//   useEffect(() => {
//     // Check if the board has no cards
//     if (props.board.cards.length === 0) {
//       // Add a default card to the board
//       props.addCard(props.board.id, "Drop Here Or In Place of The needed Card");
//     }
//   }, []); // Run only once when the component mounts

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const cardId = e.dataTransfer.getData("cardId");
//     const sourceBoardId = e.dataTransfer.getData("sourceBoardId");
//     const sourceCardId = e.dataTransfer.getData("sourceCardId");
//     props.dragEnded(sourceBoardId, sourceCardId);
//     props.removeCard(sourceBoardId, sourceCardId);

//     props.addCard(props.board.id, cardId);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="board" onDrop={handleDrop} onDragOver={handleDragOver}>
//       <div className="board_header">
//         <p className="board_header_title">
//           {props.board?.title}
//           <span>{(props.board?.cards?.length || 0) - 1}</span>
//         </p>
//         <div
//           className="board_header_title_more"
//           onClick={() => setShowDropdown(true)}
//         >
//           <MoreHorizontal />
//           {showDropdown && (
//             <Dropdown
//               class="board_dropdown"
//               onClose={() => setShowDropdown(false)}
//             >
//               <p onClick={() => props.removeBoard()}>Delete Board</p>
//             </Dropdown>
//           )}
//         </div>
//       </div>
//       <div className="board_cards custom-scroll">
//         {props.board?.cards?.map((item) => (
//           <Card
//             key={item.id}
//             card={item}
//             boardId={props.board.id}
//             removeCard={props.removeCard}
//             dragEntered={props.dragEntered}
//             dragEnded={props.dragEnded}
//             updateCard={props.updateCard}
//           />
//         ))}
//         <Editable
//           text="+ Add Card"
//           placeholder="Enter Card Title"
//           displayClass="board_add-card"
//           editClass="board_add-card_edit"
//           onSubmit={(value) => props.addCard(props.board?.id, value)}
//         />
//       </div>
//     </div>
//   );
// }

// export default Board;

//////////////////////////////////////////////////////////////////////////
// import React, { useState, useRef } from "react";
// import { MoreHorizontal } from "react-feather";
// import Card from "../Card/Card";
// import Dropdown from "../Dropdown/Dropdown";
// import Editable from "../Editabled/Editable";
// import "./Board.css";

// function Board(props) {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropAreaRef = useRef(null);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const cardId = e.dataTransfer.getData("cardId");
//     const sourceBoardId = e.dataTransfer.getData("sourceBoardId");
//     const sourceCardId = e.dataTransfer.getData("sourceCardId");
//     props.dragEnded(sourceBoardId, sourceCardId);
//     props.removeCard(sourceBoardId, sourceCardId);
//     props.addCard(props.board.id, cardId);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="board" onDrop={handleDrop} onDragOver={handleDragOver}>
//       <div className="board_header">
//         <p className="board_header_title">
//           {props.board?.title}
//           <span>{props.board?.cards?.length || 0}</span>
//         </p>
//         <div
//           className="board_header_title_more"
//           onClick={() => setShowDropdown(true)}
//         >
//           <MoreHorizontal />
//           {showDropdown && (
//             <Dropdown
//               class="board_dropdown"
//               onClose={() => setShowDropdown(false)}
//             >
//               <p onClick={() => props.removeBoard()}>Delete Board</p>
//             </Dropdown>
//           )}
//         </div>
//       </div>
//       <div className="board_cards custom-scroll">
//         {props.board?.cards?.map((item) => (
//           <Card
//             key={item.id}
//             card={item}
//             boardId={props.board.id}
//             removeCard={props.removeCard}
//             dragEntered={props.dragEntered}
//             dragEnded={props.dragEnded}
//             updateCard={props.updateCard}
//           />
//         ))}
//         <div
//           className="drop-area"
//           ref={dropAreaRef}
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           Drop Here
//         </div>
//         <Editable
//           text="+ Add Card"
//           placeholder="Enter Card Title"
//           displayClass="board_add-card"
//           editClass="board_add-card_edit"
//           onSubmit={(value) => props.addCard(props.board?.id, value)}
//         />
//       </div>
//     </div>
//   );
// }

// export default Board;

///////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from "react";
// import { MoreHorizontal } from "react-feather";

// import Card from "../Card/Card";
// import Dropdown from "../Dropdown/Dropdown";
// import Editable from "../Editabled/Editable";

// import "./Board.css";

// function Board(props) {
//   const [showDropdown, setShowDropdown] = useState(false);

//   return (
//     <div className="board">
//       <div className="board_header">
//         <p className="board_header_title">
//           {props.board?.title}
//           <span>{props.board?.cards?.length || 0}</span>
//         </p>
//         <div
//           className="board_header_title_more"
//           onClick={() => setShowDropdown(true)}
//         >
//           <MoreHorizontal />
//           {showDropdown && (
//             <Dropdown
//               class="board_dropdown"
//               onClose={() => setShowDropdown(false)}
//             >
//               <p onClick={() => props.removeBoard()}>Delete Board</p>
//             </Dropdown>
//           )}
//         </div>
//       </div>
//       <div className="board_cards custom-scroll">
//         {props.board?.cards?.map((item) => (
//           <Card
//             key={item.id}
//             card={item}
//             boardId={props.board.id}
//             removeCard={props.removeCard}
//             dragEntered={props.dragEntered}
//             dragEnded={props.dragEnded}
//             updateCard={props.updateCard}
//           />
//         ))}
//         <Editable
//           text="+ Add Card"
//           placeholder="Enter Card Title"
//           displayClass="board_add-card"
//           editClass="board_add-card_edit"
//           onSubmit={(value) => props.addCard(props.board?.id, value)}
//         />
//       </div>
//     </div>
//   );
// }

// export default Board;
