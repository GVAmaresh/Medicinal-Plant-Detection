// "use client";
import React from "react";
// const Card = ({
//   content,
//   isReply = false,
// }: {
//   content?: JSX.Element[];
//   isReply?: boolean;
// }) => {
//   return (
//     <div
//       className={`flex w-[46rem] justify-center items-center text-gray-200 bg-dark-4  p-4 rounded-lg `}
//     >
//       {!isReply && `Hello! How can I assist you?`}
//       {isReply && (
//         <div>
//           {content?.map((element, index) => (
//             <React.Fragment key={index}>{element}</React.Fragment>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
const AibotCard = ({ answer }: { answer?: string }) => {
  return (
    <div
    className={` min-w-96 w-96 md:w-1/2 md:ml-auto md:mr-auto text-gray-200 bg-slate-900 p-4 mt-10 rounded-lg flex justify-center`}
    >
      {answer == "" ? "Hello! How can I assist you?" : answer}
    </div>
  );
};
export default AibotCard;
