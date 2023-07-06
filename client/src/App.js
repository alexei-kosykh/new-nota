import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch('/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      {console.log(data.services)}
      {!data.services ? (
        <p>Loading...</p>
      ) : (
        data.services.map((service, i) => <p key={i}>{service}</p>)
      )}
    </div>
  );
}

export default App;
