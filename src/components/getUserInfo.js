import axios from "axios";


const getUserInfoById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/${userId}`);
      const user = response.data;
      return user;
    } catch (error) {
      throw error;
    }
  };

export default getUserInfoById;