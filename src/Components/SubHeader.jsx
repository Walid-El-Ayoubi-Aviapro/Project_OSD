import React, { useState } from "react";
import "../Components/css/SubHeader.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faTimes } from "@fortawesome/free-solid-svg-icons";

const SubHeader = () => {
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isSubHeaderVisible, setIsSubHeaderVisible] = useState(false);

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
    setIsSubHeaderVisible(!isSubHeaderVisible);
  };

  const toggleSubHeaderVisibility = () => {
    setIsSubHeaderVisible(!isSubHeaderVisible);
  };

  return (
    <div>
      <button className="info-button" onClick={toggleInfoVisibility}>
        {isInfoVisible && <FontAwesomeIcon icon={faInfo} />}
        {!isInfoVisible && <FontAwesomeIcon icon={faTimes} />}
      </button>
      {isSubHeaderVisible && (
        <div className="sub-header">
          <p className="sub-header-text">
            Anything that can go wrong, will go wrong
          </p>
        </div>
      )}
    </div>
  );
};

export default SubHeader;

// import React, { useState } from "react";
// import "../Components/css/SubHeader.css"; // Import the CSS file
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInfo, faTimes } from "@fortawesome/free-solid-svg-icons";

// const SubHeader = () => {
//   const [isInfoVisible, setIsInfoVisible] = useState(true);

//   const toggleInfoVisibility = () => {
//     setIsInfoVisible(!isInfoVisible);
//   };

//   return (
//     <div className="sub-header">
//       <div className="sub-header-content">
//         {isInfoVisible && (
//           <button onClick={toggleInfoVisibility}>
//             <FontAwesomeIcon icon={faTimes} />
//           </button>
//         )}
//         {!isInfoVisible && (
//           <button onClick={toggleInfoVisibility}>
//             <FontAwesomeIcon icon={faInfo} />
//           </button>
//         )}
//         {isInfoVisible && (
//           <div className="sub-header-text">
//             Anything that can go wrong, will go wrong
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubHeader;

// import React, { useState } from "react";
// import "../Components/css/SubHeader.css"; // Import the CSS file

// const SubHeader = () => {
//   const [isInfoVisible, setIsInfoVisible] = useState(false);

//   const toggleInfoVisibility = () => {
//     setIsInfoVisible(!isInfoVisible);
//   };

//   return (
//     <div className="sub-header">
//       {/* <p className="sub-header-text">
//         Anything that can go wrong, will go wrong
//       </p> */}
//       <button onClick={toggleInfoVisibility}>X</button>
//       <button onClick={toggleInfoVisibility}>Info</button>
//       {isInfoVisible && (
//         <div className="info-content">This is the info subheader.</div>
//       )}
//     </div>
//   );
// };

// export default SubHeader;

// import React from "react";
// import "../Components/css/SubHeader.css"; // Import the CSS file

// const SubHeader = () => {
//   return (
//     <div className="sub-header">
//       <p className="sub-header-text">
//         Anything that can go wrong, will go wrong
//       </p>
//     </div>
//   );
// };

// export default SubHeader;
