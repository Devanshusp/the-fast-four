import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSONDATA from '../data/MO_Trails_geo.json'
export default function Search({ onSearchResults }) {
    const [trailDataArray, setTrailDataArray] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    useEffect(() => {
        const dataArray = Array.isArray(JSONDATA.features) ? JSONDATA.features : [];
        setTrailDataArray(dataArray);
    }, [JSONDATA.features]);
    const handleInputChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        setIsTyping(newSearchTerm.length > 0);
        const results = trailDataArray.filter((val) => {
            const trailNameMatch =
                val.properties.TRAIL_NAME &&
                val.properties.TRAIL_NAME.toLowerCase().includes(newSearchTerm.toLowerCase());
            const bikingMatch =
                val.properties.BIKING &&
                val.properties.BIKING.toLowerCase().includes(newSearchTerm.toLowerCase());
            return trailNameMatch || bikingMatch;
        });
        onSearchResults(results); // Pass filtered results to parent component
    };
    return (
        <div className='Search'>
            <input type='text' placeholder='Search...' onChange={handleInputChange} />
            {/* Display filtered results */}
            {isTyping &&
                trailDataArray
                    .filter((val) => {
                        const trailNameMatch =
                            val.properties.TRAIL_NAME &&
                            val.properties.TRAIL_NAME.toLowerCase().includes(searchTerm.toLowerCase());
                        const bikingMatch =
                            val.properties.BIKING &&
                            val.properties.BIKING.toLowerCase().includes(searchTerm.toLowerCase());
                        return trailNameMatch || bikingMatch;
                    })
                    .map((val, key) => (
                        <div key={key} className='trail'>
                            {/* <p>
                {val.properties.TRAIL_NAME} Biking: {val.properties.BIKING}
              </p> */}
                        </div>
                    ))}
        </div>
    );
}

//Reviewed 2/18/2024










