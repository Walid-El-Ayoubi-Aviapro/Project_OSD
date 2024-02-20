// import React from "react";

// const DataDisplay = ({ data, searchQuery }) => {
//   const highlightText = (text) => {
//     const regex = new RegExp(searchQuery, "gi");
//     return text.replace(
//       regex,
//       (match) => `<span class="highlight">${match}</span>`
//     );
//   };

//   return (
//     <div>
//       {data.map((item, index) => (
//         <div
//           key={index}
//           dangerouslySetInnerHTML={{ __html: highlightText(item) }}
//         />
//       ))}
//     </div>
//   );
// };

// export default DataDisplay;
