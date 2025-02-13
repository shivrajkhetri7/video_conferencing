import React,{ useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import SplitText from './common/SplitText';
import SplashCursor from './common/SplashCursor'

function App() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  useEffect(() => {
    const socket = io('http://localhost:8000');
    socket.on("connect", () => {
      console.log("Connected with socket ID:", socket.id);
    });

    return () => {
      socket.disconnect();
    }
  }, [])

  return (
    <React.Fragment>
      <SplashCursor />
      <div className="App">
        <main>
          <SplitText
            text="We Connect Instantly!"
            className="title"
            delay={150}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <p>No sign-ups, no downloads—just smooth, secure video calls with MeetUp. Stay connected with ease.</p>
          <input type='text' placeholder='Enter Room Id' />
          <button >Join a Room</button>
          <p>------ OR ------</p>
          <button >Create a New Room</button>
        </main>
        <footer>
          Made with love by Shivraj Khetri
        </footer>
      </div>
    </React.Fragment>
  );
}

export default App;
