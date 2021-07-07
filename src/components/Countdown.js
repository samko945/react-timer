import React, { useState, useRef, useEffect } from "react";
import "./Countdown.css";

function doubleDigit(value) {
	if (value < 0) {
		return "00";
	}
	if (value < 10 && value >= 0) {
		return "0" + value;
	}
	return value;
}

function stringToMs(timeStringObj) {
	const { hrs, mins, secs } = timeStringObj;
	const hrsMs = Number(hrs) * 60 * 60 * 1000;
	const minsMs = Number(mins) * 60 * 1000;
	const secsMs = Number(secs) * 1000;
	return hrsMs + minsMs + secsMs;
}

function msToString(ms) {
	const hrs = Math.floor(ms / 3600000);
	const mins = Math.floor((ms % 3600000) / 60000);
	const secs = ((ms % 3600000) % 60000) / 1000;
	return {
		hrs: doubleDigit(hrs),
		mins: doubleDigit(mins),
		secs: doubleDigit(secs),
	};
}

export default function Countdown() {
	const [timing, setTiming] = useState(false);
	const [time, setTime] = useState({
		hrs: "00",
		mins: "00",
		secs: "00",
	});
	const intervalId = useRef();
	function changeTime(event) {
		const { name, value } = event.target;
		setTime((prev) => {
			return { ...prev, [name]: doubleDigit(value) };
		});
	}
	function toggleTiming() {
		if (stringToMs(time) > 0) setTiming((prev) => !prev);
		return;
	}
	function resetTime() {
		setTiming(false);
		setTime(msToString(0));
	}
	useEffect(() => {
		if (timing) {
			intervalId.current = setInterval(() => {
				setTime((prev) => {
					let currentMs = stringToMs(prev);
					if (currentMs > 1000) {
						currentMs -= 1000;
					} else {
						currentMs = 0;
						setTiming(false);
					}
					return { ...msToString(currentMs) };
				});
			}, 1000);
		} else {
			clearInterval(intervalId.current);
		}
	}, [timing]);
	return (
		<div>
			<div className="time">
				{!timing ? (
					<div>
						<input disabled={timing} type="number" name="hrs" value={time.hrs} onChange={changeTime} />
						<input disabled={timing} type="number" name="mins" value={time.mins} onChange={changeTime} />
						<input disabled={timing} type="number" name="secs" value={time.secs} onChange={changeTime} />
					</div>
				) : (
					<div>
						<span>{time.hrs}</span>:<span>{time.mins}</span>:<span>{time.secs}</span>
					</div>
				)}
			</div>
			<div>
				<button onClick={resetTime}>Reset</button>
				<button onClick={toggleTiming}>{!timing ? "Start" : "Stop"}</button>
			</div>
		</div>
	);
}
