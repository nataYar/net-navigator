'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

import MenuIcon from '../public/images/white_icon.png';
import Panel from './Panel.js'
import Carousel from './Carousel.js'
import Recommendations from './Recommendations';

export default function Home() {
  const [replies, setReplies] = useState({
    connectionType: null,
    userCount: null,
    activities: [],
    deviceCount: null,
    buildingSize: null,
});
  const [panel, setPanel] = useState(false);

  const [recommendations, setRecommendations] = useState({
    router: '',
    coverage: '',
    additional: [],
    routerDetails: [],
  });

  const updateRecommendations = (newRecommendations) => {
    setRecommendations(newRecommendations);
  };

  const togglePanel = () => {
      setPanel(prevPanel => !prevPanel);
    }

  const [questions, setQuestions] = useState([
    {
      "id": 1,
      "question": "What type of internet connection do you have?",
      "answers": [
        "Cable Internet (Coaxial)",
        "Fiber Optic",
        "DSL (Digital Subsecriber Line)", 
        "5G Home Internet",
        "Satellite"
      ]
    },
    {
        "id": 2,
        "question": "How many users will be using the internet in your household or office?",
        "answers": [
            "1 User",
            "2-4 Users",
            "5-8 Users",
            "9+ Users"
        ]
    },
    {
        "id": 3,
        "question": "What types of activities will you primarily use the internet for? (Select all that apply)",
        "multipleAnswers": true,
        "answers": [
            "Basic web browsing (email, social media)",
            "Streaming video (HD/4K)",
            "Online gaming",
            "Video conferencing",
            "File sharing/cloud services",
            "Smart home devices"
        ]
    },
    {
        "id": 4,
        "question": "How many devices do you expect to connect to the internet at the same time?",
        "answers": [
            "1-5 Devices",
            "6-10 Devices",
            "11+ Devices"
        ]
    },
    {
      "id": 5,
      "question": "How large is your home/office building?",
      "answers": [
        "Less than 1,000 sq ft",
        "1,000 - 2,000 sq ft",
        "More than 2,000 sq ft"
      ]
    }
  ]);
  

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    // console.log(windowSize.width)
   
    useEffect(() => {
      if (windowSize.width >1024){
        setPanel(true)
      } else {setPanel(false)}
    }, [windowSize.width])
    return windowSize;
  }

  useWindowSize()

  useEffect(() => {console.log(panel)}, [panel])
 
  // Function to check if all replies are filled
  const allRepliesFilled = () => {
    const { connectionType, userCount, activities, deviceCount, buildingSize } = replies;
    return (
      connectionType !== null &&
      userCount !== null &&
      activities.length > 0 &&
      deviceCount !== null &&
      buildingSize !== null
    );
  };

  const selectOption = (id, choice) => {
    switch (id) {
      case 1:
        setReplies((prevReplies) => ({
          ...prevReplies,
          connectionType: choice,
        }));
        break;
      case 2:
        setReplies((prevReplies) => ({
          ...prevReplies,
          userCount: choice,
        }));
        break;
        case 3:
          // only add the ones, that are not in the array yet
          setReplies((prevReplies) => ({
            ...prevReplies,
            activities: prevReplies.activities.includes(choice)
              ? prevReplies.activities.filter((activity) => activity !== choice)
              : [...prevReplies.activities, choice],
          }));
        break;
      case 4:
        setReplies((prevReplies) => ({
          ...prevReplies,
          deviceCount: choice,
        }));
        break;
      case 5:
        setReplies((prevReplies) => ({
          ...prevReplies,
          buildingSize: choice,
        }));
        break;
      default:
        break;
    }
  }

  const showPanel =() => {
    setPanel(true)
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-items-center h-screen bg-[#070815] text-white font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="flex flex-col  lg:flex-row h-full  w-full items-center relative">
        <div className='flex-col justify-around items-center w-full lg:w-[55%] h-full'>
        <Carousel questions={questions} handleSelect={selectOption} replies={replies} />
        
        {/* Show button only when all replies are filled */}
        {allRepliesFilled() && (
          <Recommendations replies={replies} getRecommendations={updateRecommendations} openPanel ={showPanel}/>
        )}
        </div>
        {/* LEFT SIDE ON CLICK SHOWS CURRENT SETUP BASED ON ANSWERS*/}
        <button onClick={togglePanel} className="absolute top-[2.5vh] right-[2.5vh] lg:hidden">
          <Image
            src={MenuIcon}
            alt="menu icon"
            className="h-[5vh] w-auto"
          />
        </button>
        <div className={panel ? 'panel absolute' : 'panel hidePanel absolute'}>
          <Panel recommendations={recommendations}  panel={panel}/>    
        </div>
      </main>
    </div>
  );
}
