import { Routes, Route } from "react-router-dom";
import RoomPage from "../src/Pages/RoomPage";
import HomePage from "../src/Pages/HomePage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<RoomPage />} />
            <Route path="/:roomId" element={<HomePage />} />
        </Routes>
    );
};

export default App;
