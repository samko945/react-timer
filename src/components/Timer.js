import React, { useState, useRef, useEffect } from "react";
import "./Timer.css";

export default function Timer() {
	const timerIdRef = useRef(0);
	const [timing, setTiming] = useState(false);
	const [time, setTime] = useState(0);
	const hours = Math.floor(time / (1000 * 60 * 60)).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
	const minutes = Math.floor((time / (1000 * 60)) % 60).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
	const seconds = Math.floor((time / 1000) % 60).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });

	function toggleTiming() {
		setTiming((prev) => !prev);
	}

	function resetTime() {
		setTiming(false);
		setTime(0);
	}

	useEffect(() => {
		if (timing) {
			timerIdRef.current = setInterval(() => {
				setTime((prev) => prev + 100);
			}, 100);
		}
		if (!timing) {
			clearInterval(timerIdRef.current);
		}
	}, [timing]);

	return (
		<div className="timer">
			<div className="timer-element timer-time">
				{hours}:{minutes}:{seconds}
			</div>
			<div className="timer-element timer-controls">
				<button className="timer-control timer-btn-reset" onClick={resetTime}>
					x
				</button>
				<button className="timer-control timer-btn-run" onClick={toggleTiming}>
					{!timing ? ">" : "||"}
				</button>
			</div>
		</div>
	);
}
