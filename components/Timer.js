import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
export default function rx(props) {
    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = new Date(props.endOfRound) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [year] = useState(new Date().getFullYear());
    const [interval, setT] = useState(null);



    useEffect(() => {
        if (!interval) {
            const interval = setInterval(() => {
                const left = calculateTimeLeft();
                setTimeLeft(left);
                if (!left || Object.keys(left).length==0 || (left.days == 0 && left.hours == 0 && left.minutes == 0 && left.seconds == 0)) {
                    setT(null)
                    clearInterval(interval);
                    props.callBack('GOTO_NEXT_ROUND')
                }
                console.log("here")
            }, 1000);
            setT(interval)
        }
    }, [props.ts]);

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });
    return (
        <div>
           
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    );
}
