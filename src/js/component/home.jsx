import React, {useState,useEffect,useRef} from "react";

const Home = () => {

	const [songs, setSongs] = useState([]);
    const [play, setPlay] = useState(false);
	  
		function playPause () {
		  if(play){
			buttonElement.current.pause();
			setPlay(false);
		  } else {
	  			buttonElement.current.play();
				setPlay(true);
		  } }

		  function nextSong(){
			if (buttonElement.current) {
			   
		  }};


	const buttonElement = useRef();
	const handleClick = (event, index) => {

        	if (buttonElement.current) {
         	buttonElement.current.src = 'https://assets.breatheco.de/apis/sound/' + songs[index].url;
			buttonElement.current.play();	
			let activate = event.currentTarget.classList;
			activate.add("active");
			}
	  }

	useEffect(()=>{
	fetch('https://assets.breatheco.de/apis/sound/songs') 
	.then((response)=>response.json())
	.then((data)=>setSongs(data)) 
	},[])

	return (<>
		<ul>
			{songs.map((item,index)=><a onClick={ event => handleClick(event,index)}className="list-group-item list-group-item-action list-group-item-dark" key={index}>{index}    {item.name}</a>)}
			<div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
           <div className="btn-group me-2" role="group" aria-label="First group">
    <button type="button" className="btn btn-primary">1</button>
    <button type="button" className="btn btn-primary" onClick={playPause}>
          {play? "Pause":"Play"}</button>
    <button type="button" className="btn btn-primary" onClick={nextSong}>Next Song</button>
  </div>
</div>
		</ul>
		<div>
		<audio controls ref={buttonElement}>
        <source src="" type="audio/ogg"/>
        </audio>
		</div>
		</>
	);
};

export default Home;
