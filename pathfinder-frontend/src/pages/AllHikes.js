import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function AllHikes() {
    const [allhikes, setAllHikes] = useState([]);


    useEffect(() => {
        loadAllHikes();
    }, []);

    const loadAllHikes = async () => {
        const result = await axios.get("http://localhost:8080/allhikes");
        setAllHikes(result.data);
    }





    return (
        <div className='hikescontainer'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#Id</th>
                                <th scope="col">Trail Name</th>
                                <th scope="col">Area Name</th>
                            <th scope="col">Walkable</th>
                            <th scope="col">Bike Friendly</th>
                            <th scope="col">Distance</th>
                            <th scope="col">Date</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allhikes.map((hike, index) => (
                            <tr>
                                <th scope="row" key={index}>{index + 1}</th>
                                <td>{hike.trailName}</td>
                                <td>{hike.areaName}</td>
                                <td>{hike.walkable}</td>
                                <td>{hike.bikeFriendly}</td>
                                <td>{hike.distance}</td>
                                <td>{hike.date}</td>
                                <td>
                                    <button className='btn btn-primary mx2'>Edit</button>
                                    <button className='btn btn-danger mx2'>Cancel</button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}
