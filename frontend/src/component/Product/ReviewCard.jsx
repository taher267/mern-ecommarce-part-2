import React from 'react'
import { Rating } from '@material-ui/lab';
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
    const options = {
        name: "read-only",
        color: "rgba(20,20,20,0.1)",
        activecolor: "tomato",
        size: window.innerWidth < 600 ? "small" : "medium",
        value: review.rating,
        precision: 0.5,
        readOnly: true

    }
    return <div className='reviewCard'>
        <img src={profilePng} alt="user" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span>{review.comment}</span>
    </div>
}

export default ReviewCard