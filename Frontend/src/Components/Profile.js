import React from 'react';
import axios from 'axios';



const Profile = async () => {
    try {
        const data  = await axios.get('http://localhost:3000/api/employees/myprofile');
      return data;
    } catch (error) {
        console.error(error);
    }
    
}

export default Profile;