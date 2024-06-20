import './ContentDisplay.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ContentDisplay = ({ items }) => {
    // 
    const { id, subcategory } = useParams();
    // "items" is the json file, maincategory is based on the items id
    const mainCategory = items.find(item => item.id === id)
    // Variable for every item
    const itemProp = mainCategory?.Items[subcategory];
    // Variable to see if the item is checked, every items initial value will be unchecked
    const [checkedStates, setCheckedStates] = useState(
        itemProp ? itemProp.map(() => false) : []
    ); // Initialize state array

    // When the subcategory is changed.
    useEffect(() => {
        const collectedItems = JSON.parse(localStorage.getItem(subcategory));
        if (collectedItems) {
            const emptyarr = itemProp.map(() => false);
            setCheckedStates(emptyarr)
            setCheckedStates(prevState => prevState.map((item, index) => collectedItems[index] || item));
        } 
        else {
            setCheckedStates(itemProp ? itemProp.map(() => false) : [])
        }
    },[subcategory])

    // Checkboxes
    const unCheckedbox = <svg fill="#000000" viewBox="0 0 24 24" id="check-mark-square" xmlns="http://www.w3.org/2000/svg" className="icon line"><g id="SVGRepo_bgCarrier" strokeWidth={0}></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M20,21H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H20a1,1,0,0,1,1,1V20A1,1,0,0,1,20,21ZM16,9.5l-5,5-3-3" style={{fill: "none", stroke: "#a4a4a4", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5"}}></path></g></svg>
    const checkedbox = <svg fill="#ffffff" viewBox="0 0 24 24" id="check-mark-square" xmlns="http://www.w3.org/2000/svg" className="icon line"><g id="SVGRepo_bgCarrier" strokeWidth={0} transform="translate(4.800000000000001,4.800000000000001), scale(0.6)"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="0" fill="#007efd" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M20,21H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H20a1,1,0,0,1,1,1V20A1,1,0,0,1,20,21ZM16,9.5l-5,5-3-3" style={{fill: "none", stroke: "#ffffff",strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5"}}></path></g></svg>

    // Initialize checkbox state
    
    const handleCheckboxChange = (index) => {
        // When checkbox is changed, set checkedstate to:
        setCheckedStates(prevState => {
            const newCheckedStates = [...prevState];
            newCheckedStates[index] = !newCheckedStates[index];
            localStorage.setItem(subcategory, JSON.stringify(newCheckedStates));
            return newCheckedStates;
        });
    };

    // Counter for the total checked items
    const totalChecked = () => {
        const collectedItems = checkedStates.filter(value => value == true);
        return collectedItems.length;
    }
    return (
    <>
        <div className='mainContent'>
            {mainCategory ? (
            <div className='contentContainer'>

                {/* For every item, map the following */}
                {itemProp ? (
                
                itemProp.map((item, index) => (

                    <div className='listItemContainer' key={index}>
                        <div className='listItem'><a href={`https://remnant2.wiki.fextralife.com/${item}`} target='_blank'>{item}</a></div>
                        <div className='checkboxContainer' onClick={() => handleCheckboxChange(index)}>
                            <div className='checkBox'>{checkedStates[index] ? checkedbox : unCheckedbox}</div>                    
                        </div>
                    </div>

                ))) : (
                <h2>No items found for this subcategory</h2>
                )}
            </div>
            ) : (
            <h2>No items found for this subcategory</h2>
            )}
            <div className='numberCollected'>
                <span className='totalCollected'><span className='totalText'>Total:</span> {totalChecked()}</span>
                <span className='totalItems'>/{itemProp.length}</span>
            </div>
        </div>
    </>
    );
};


export default ContentDisplay;
