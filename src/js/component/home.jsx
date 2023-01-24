import React, { useState, useEffect, useRef } from "react";

const Home = () => {
	const [songs, setSongs] = useState([]);
	const [play, setPlay] = useState(false);
    const [actualSong, setActualSong] = useState(0);

	function playPause() {
		if (play) {
			buttonElement.current.pause();
			setPlay(false);
		} else {
			buttonElement.current.play();
			setPlay(true);
		}
	}

	function nextSong() {
		if (buttonElement.current) {
			setActualSong((actualSong + 1) % songs.length);
			buttonElement.current.src ="https://assets.breatheco.de/apis/sound/" + songs[actualSong].url;
			buttonElement.current.play();
			setPlay(true);
		}
	}


function previousSong(){
	if (buttonElement.current){
		setActualSong((actualSong - 1) % songs.length);
		buttonElement.current.src ="https://assets.breatheco.de/apis/sound/" + songs[actualSong].url;
		buttonElement.current.play();
		setPlay(true);
	}
}

	const buttonElement = useRef();
	const handleClick = (event, index) => {
		if (buttonElement.current) {
			setActualSong(index);
			buttonElement.current.src ="https://assets.breatheco.de/apis/sound/" + songs[actualSong].url;
			buttonElement.current.play();
			setPlay(true);
		}
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then((response) => response.json())
			.then((data) => setSongs(data));
	}, []);

	return (
		<><div className="container">
			<ul  class="list-group list-group-flush">
				{songs.map((item, index) => (
					<a class="list-group-item text-center"
						onClick={(event) => handleClick(event, index)} 
						className={`list-group-item list-group-item-action list-group-item-dark ${actualSong === index ? 'list-group-item list-group-item-action list-group-item-dark active' : ''}`}
					>
						{index}.    {item.name}
					</a>
				))}
				<div
					className="btn-toolbar"
					role="toolbar"
					aria-label="Toolbar with button groups"
				>
					<div className="btn-group me-2 " role="group" aria-label="First group">
						<button type="button" className="btn btn-primary" onClick={previousSong}>
							Previous Song
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={playPause}
						>
							{play ? "Pause" : "Play"}
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={nextSong}
						>
							Next Song
						</button>
					</div>
				</div>
			</ul>
			<div>
				<audio ref={buttonElement}>
					<source src="" type="audio/ogg" />
				</audio>
			</div>
			</div>
		</>
	);
};

export default Home;

