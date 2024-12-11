import React, { useEffect, useState } from 'react'

function DateTime () {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      weekday: 'long', 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div style={{marginTop:"30rem"}}>
      
        <h1 style={{fontWeight:"lighter",fontSize:"60px",top:"36rem",left:"9rem",position:"fixed"}}>{formatTime(currentTime)} </h1> 

        <h5 style={{top:"40rem",left:"9rem",fontWeight:"lighter", position:"fixed"}}>{formatDate(currentTime)}</h5>

        
    </div>
    
  );
}

export default DateTime;
