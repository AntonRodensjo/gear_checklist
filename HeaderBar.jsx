import './HeaderBar.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const HeaderBar = ({ items }) => {
    // All "global" variables needed for this component
    const navigate = useNavigate();
    const [mainCategory, setMainCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    // When ever the maincategory is changed
    useEffect (() => {
        // To the homepage/startpage
        if (mainCategory === '') {
            navigate("/"); 
            return;
        }
        // When a new maincategory is selected, navigate to the first subcategory
        if (mainCategory) {
            const categoryId = items.find(item => item.id === mainCategory)
            const selectedData = categoryId.Items;
            if (selectedData) {
                const firstSubCategory = Object.keys(selectedData)[0];
                setSelectedSubCategory(firstSubCategory);
                navigate(`/items/${mainCategory}/${firstSubCategory}`)
            }
        }
    },[mainCategory, items])

    // Function to switch the main category and set the new value (the useEffect above will be called)
    const handleMainCategory = (e) => {
        const newMainCategory = e.target.value;
        setMainCategory(newMainCategory);
    }

    // Function to switch subcategory when it is changed
    const handleSubCategory = (e) => {
        const newSubCategory = e.target.value;
        setSelectedSubCategory(newSubCategory);
        navigate(`/items/${mainCategory}/${newSubCategory}`);
    }

    const selectedData = items.find(item => item.id === mainCategory);

    return (
        <>
            <div className='headerContainer'>
                <div className='div1'></div>
                <div className='listHeader'>
                    <h1>Checklist</h1>
                </div>
                <div className='selectDisplay'>
                    <select onChange={handleMainCategory} defaultValue=''>
                        <option value=''>Select</option>
                        {/* Mapping the maincategory select field */}
                        {items.map(item => (
                            <option key={item.id} value={item.id}>{item.id}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='subCategoryDiv'>
                <div className='categoryHeader'><h2>{mainCategory} {mainCategory == '' ? '' : '-'} {selectedSubCategory}</h2></div>
                <div className='subCategorySelect'>
                    {/*  Mapping the subcategory select field (depending on the maincategory) */}
                    {selectedData && (
                        <select onChange={handleSubCategory} value={selectedSubCategory}>
                        {Object.keys(selectedData.Items).map(subCategory => (
                            <option key={subCategory} value={subCategory}>{subCategory}</option>
                        ))}
                    </select>)
                    }
            </div>
        </div>
    </>
    );
}


export default HeaderBar;