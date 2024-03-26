import { createBookmarks } from './utilities/apibookmarks';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newbookmark,setnewbookmark] = useState({url:"",title:""});

  const fetchDataForPosts = async () => {
    try {
      const response = await fetch(
        `/api/bookmarks`
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let postsData = await response.json();
      console.log(postsData)
      setData(postsData);
      // createBookmarks(postsData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };
 

  useEffect(() => {
    
   


    fetchDataForPosts();
  }, []);
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try{
        const bookmark = await createBookmarks(newbookmark);
        fetchDataForPosts()
    }catch(error){
        setError(error.message)
    }
}

const handleChange = (evt) => {
  setnewbookmark({ ...newbookmark, [evt.target.name]: evt.target.value });
  setError('');
}


  return (
    
    <div className="App">
  <header className="App-header">
    <form onSubmit={handleSubmit}>
      <label>Add a new bookmark</label>
      <input value={newbookmark.title} onChange={handleChange} name="title" />
      <input value={newbookmark.url} onChange={handleChange} name="url" />
      <button type="submit">Submit</button>
    </form>
  </header>
  <ul>
    {data &&
      data.map(({ url, title, _id }) => (
        <li key={_id} className="border-b border-gray-100 text-sm sm:text-base">
          <a href={url}>{title}</a>
        </li>
      ))}
  </ul>
</div>
  
  );
}


export default App;
