// export const Homepage = () => {
//     return (
//         <>
//             <div className="flex flex-col justify-center items-center">
//                 <div className={"bg-blue-600 w-fit"}>Je suis une homepage</div>
//             </div>
//         </>
//     )
// }


import { useEffect, useState } from "react";

export const Homepage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://127.0.0.1:8000/home-data") // backend Symfony
            .then((res) => res.json())
            .then((json) => setData(json));
    }, []);

    return (
        <div>
            <h1>TestArray</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}
