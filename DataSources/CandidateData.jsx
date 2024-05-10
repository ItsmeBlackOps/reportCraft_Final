import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuth } from '../../utils/AuthContent';

function TaskList({ onDataReceived }) { // Accept a prop onDataReceived
    const [tasks, setTasks] = useState([]);

    const { user } = useAuth()
    

    useEffect(() => {
        fetchUserData(user); // Pass user as a parameter
    }, [user]); // Add user to the dependency array
    
    const fetchUserData = async (user) => {
        try {
            const response = await axios.get('https://reportcraft-backend.onrender.com/api/getUserData', {
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': user.name // Use user directly
                }
            });
            if (!response.data) {
                throw new Error('No data received');
            }
            console.log("Fetched data:", response.data); // Log the fetched data
            setTasks(response.data);
            onDataReceived(response.data); // Pass data to the parent component
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return null; // Return null since you're not rendering anything directly
}

export default TaskList;
