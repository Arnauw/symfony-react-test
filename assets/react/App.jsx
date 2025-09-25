import {createRoot} from "react-dom/client";
import {Homepage} from "./Homepage";

const homepageContainer = document.getElementById('react-homepage');

if (homepageContainer) {
    const root = createRoot(homepageContainer);
    root.render(
            <Homepage />
    );
}



export const App = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className={"bg-blue-600 w-fit"}>Test</div>
                <div>LALALALALALA</div>
            </div>
        </>
    )
}
