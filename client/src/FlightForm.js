
import React, { useState } from 'react';
import axios from 'axios';
import './form.css';  
import img from './flight.jpg'
function FlightForm() {
    const [origin, setOrigin] = useState('SYD');
    const [destination, setDestination] = useState('JFK');
    const [cabin, setCabin] = useState('Business');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    // Dropdown options
    const originOptions = ['JFK', 'DEL', 'SYD', 'BOM', 'BNE', 'BLR'];
    const destinationOptions = ['JFK', 'DEL', 'SYD', 'LHR', 'CDG', 'DOH', 'SIN'];
    const cabinOptions = ['Economy', 'Business', 'First'];

    const handleSearch = async (event) => {
        event.preventDefault();  // Prevent default form submission

        const jsonData = {
            origin,
            destination,
            cabin
        };

        try {
            const response = await axios.post('http://localhost:5000/api/search', jsonData);
            // const response = await axios.post('flight-8vxirt17x-harsh-vardhan-jhas-projects.vercel.app/api/search',jsonData);
            setData(response.data);
            setError('');
        } catch (error) {
            setError('Error fetching data');
            setData(null);
        }
    };

    return (
        <div>
            <h1>Flight Search</h1>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <select className="custom-select" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                        <option value="" disabled hidden>Select Origin</option>
                        {originOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select className="custom-select" value={destination} onChange={(e) => setDestination(e.target.value)}>
                        <option value="" disabled hidden>Select Destination</option>
                        {destinationOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select className="custom-select" value={cabin} onChange={(e) => setCabin(e.target.value)}>
                        <option value="" disabled hidden>Select Cabin</option>
                        {cabinOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Search</button>
            </form>

            {error && <p>{error}</p>}
            {data && (
                <div>
                    {data.data.map((item, index) => (
                        <div key={index} className="flight-info">
                        <img src={img} alt='logo' style={{widdth:'50px', height:'50px',borderRadius:'50%'}}/>
                            <h2>{item.partner_program}</h2>
                            <h1>{`${origin} → ${destination}`}</h1>
                            <p>2024-07-09 - 2024-10-07</p>
                            <div><h1> {item.min_business_miles ? item.min_business_miles : 'N/A'} </h1> <h5>+${item.min_business_tax ? item.min_business_tax : 'N/A'}</h5></div>
                            <p>Min Business Miles</p>
                            <div><h1>  {item.min_economy_miles ? item.min_economy_miles : 'N/A'} </h1> <h5>+${item.min_economy_tax ? item.min_economy_tax : 'N/A'}</h5></div>
                            <p>Min Economy Miles</p>
                            <div><h1> {item.min_first_miles ? item.min_first_miles : 'N/A'} </h1> <h5>+${item.min_first_tax ? item.min_first_tax : 'N/A'}</h5></div>
                            <p>Min First Miles</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FlightForm;



