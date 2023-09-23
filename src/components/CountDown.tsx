"use client"
import React from 'react'
import Countdown from 'react-countdown'

const endingDate = new Date("2023-10-12");

const CountDown = () => {

    return (
        <div suppressHydrationWarning={true} >
            {/** To prevent hydration error */}
            <Countdown className='font-bold text-5xl text-yellow-300' date={endingDate} />
        </div>

    )
}

export default CountDown