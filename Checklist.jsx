import './Checklist.css'
import StartPage from "../StartPage/StartPage.jsx";
import HeaderBar from "../HeaderBar/HeaderBar.jsx";
import ContentDisplay from "../ContentDisplay/ContentDisplay.jsx";
import items from '../../assets/itemslist.json';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const Checklist = () => {

    return (
        <>
            <div className="checklistContainer">
                <Router>
                    <HeaderBar items={items} />
                    <Routes>
                        <Route path="/" element={<StartPage />} />
                        <Route path="/items/:id/:subcategory" element={<ContentDisplay items={items} />} />
                    </Routes>
                </Router>
            </div>
        </>
    )
}

export default Checklist;