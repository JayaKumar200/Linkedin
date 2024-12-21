import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    if (!linkedinUrl) {
      setError("Please enter a LinkedIn URL");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Send LinkedIn URL to the backend
      const response = await axios.post('http://localhost:3000/span', { linkedinUrl });

      
      if (response.status !== 200) {
        throw new Error("Failed to fetch data. Please check the URL or server.");
      }

      const data = response.data;
      console.log(data);  

      if (data.error) {
        setError(data.error); // Handle error from server response
      } else {
        alert("Data successfully sent to the backend");
      }
    } catch (err) {
      console.error("Error scraping LinkedIn profile:", err);
      setError("Error scraping LinkedIn profile. Make sure the URL is correct.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="App">
      <header>
        <h1>LinkedIn Profile Scraper</h1>
      </header>

      <div className="input-container">
        <input
          type="text"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)} // Update the URL state
          placeholder="Enter LinkedIn Profile URL"
        />
        <button onClick={handleScrape} disabled={loading}>
          {loading ? 'Scraping...' : 'Scrape Profile'}
        </button>
      </div>

      {error && <p className="error">{error}</p>} {/* Display error message */}
    </div>
  );
}

export default App;
