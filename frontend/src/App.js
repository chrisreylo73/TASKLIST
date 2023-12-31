// React Hooks
import {useEffect, useState} from 'react';
// Axios for making HTTP requests
import axios from "axios";
// Function for time from date-fns library
import {format} from "date-fns"
// Styling
import './App.css';
import TaskList from './components/TaskList';
import Footer from './components/Footer';



const baseUrl = "http://localhost:5000"

const App = () => {
  const [listItems, setListItems] = useState([]); // State variable to hold the list of items fetched from the backend
  
  useEffect(() => {
    fetchListItems(); // Fetch the list items from the backend when the component mounts
  }, []);

  // Function to fetch the list items from the backend
  const fetchListItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/events`); // Make a GET request to fetch the list items
      setListItems(response.data.events); // Set the fetched list items in the state
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add a new item to the list
  const addListItem = async (newItem) => {
    try {
      const response = await axios.post(`${baseUrl}/events`, { description: newItem }); // Make a POST request to add the new item
      setListItems([...listItems, response.data]); // Add the newly created item to the list
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete an item from the list
  const deleteListItem = async (id) => {
    try {
      await axios.delete(`${baseUrl}/events/${id}`); // Make a DELETE request to delete the item
      const updatedList = listItems.filter((item) => item.id !== id); // Filter out the deleted item from the list
      setListItems(updatedList); // Set the updated list in the state
    } catch (error) {
      console.error(error);
    }
  };

  // Function to update an item in the list
  const updateListItem = async (id, updatedDescription) => {
    try {
      const response = await axios.put(`${baseUrl}/events/${id}`, { description: updatedDescription }); // Make a PUT request to update the item
      const updatedList = listItems.map((item) =>
        item.id === id ? response.data.event : item
      ); // Map over the list and update the specific item with the response from the backend
      setListItems(updatedList); // Set the updated list in the state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      <TaskList 
         listItems={listItems}
         add={addListItem}
         del={deleteListItem}
         update={updateListItem}
      />
    </div>
  );
};

export default App;


