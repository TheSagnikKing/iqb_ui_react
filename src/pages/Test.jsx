// import React, { useState } from 'react';

// const Test = () => {
//   const initialData = [
//     {
//       _id: 1,
//       name: "barber1"
//     },
//     {
//       _id: 2,
//       name: "barber2"
//     },
//     {
//       _id: 3,
//       name: "barber3"
//     },
//     {
//       _id: 4,
//       name: "barber4"
//     }
//   ];

//   const [barberdata, setBarberdata] = useState(initialData);

//   const [selectedBarbers, setSelectedBarbers] = useState([]);

//   const addBarber = (b) => {
//     const isBarberSelected = selectedBarbers.map(selected => selected._id).includes(b._id);

//     if(!isBarberSelected){
//         setSelectedBarbers((prevSelected) => [...prevSelected, { ...b, selected: true }]);
//     }
//   };

//   const deleteBarber = (b) => {
//     setSelectedBarbers((prevSelected) => prevSelected.filter((selected) => selected._id !== b._id));
//   };

//   console.log("selectedBarbers", selectedBarbers);

//   return (
//     <div>
//       {barberdata.map((b) => (
//         <div key={b._id}>
//           <p style={{ color: "black", fontSize: "2rem" }}>{b.name}</p>

//           {selectedBarbers.find((selected) => selected._id === b._id) ? (
//             <div>
//               <button>checked</button>
//               <button onClick={() => deleteBarber(b)}>Delete</button>
//             </div>
//           ) : (
//             <button onClick={() => addBarber(b)}>+</button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Test;


// import React, { useState } from 'react';

// const Test = () => {
//     const initialData = [
//         {
//             _id: 1,
//             name: "barber1",
//             count: 0
//         },
//         {
//             _id: 2,
//             name: "barber2",
//             count: 0
//         },
//         {
//             _id: 3,
//             name: "barber3",
//             count: 0
//         },
//         {
//             _id: 4,
//             name: "barber4",
//             count: 0
//         }
//     ];

//     const [barberdata, setBarberdata] = useState(initialData);

//     const increment = (b) => {
//         setBarberdata((prev) => {
//             return prev.map((item) =>
//                 item._id === b._id ? { ...item, count: item.count + 1 } : item
//             );
//         });
//     };
    
//     const decrement = (b) => {
//         setBarberdata((prev) => {
//             return prev.map((item) => 
//                 item._id === b._id && item.count > 0 ? { ...item , count: item.count - 1} : item
//             )
//         })
//     }

//     console.log(barberdata)
//     return (
//         <div>
//             {barberdata?.map((b) => (
//                 <div key={b._id}>
//                     <p style={{ color: "black", fontSize: "2rem" }}>{b.name}</p>
//                     <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
//                     <button onClick={() => increment(b)}>+</button>
//                     <p style={{ color: "black", fontSize: "2rem" }}>{b.count}</p>
//                     <button onClick={() => decrement(b)}>_</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Test;


import React from 'react'

const Test = () => {
  return (
    <div>Test</div>
  )
}

export default Test
