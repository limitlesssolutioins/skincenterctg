import React from 'react';
import './timeline.css';

const TimelineItem = ({ data, index }) => (
    <div className="timeline-item" style={{'--i': index}}>
        <div className="timeline-content">
            <h3>{data.year}</h3>
            <p>{data.text}</p>
        </div>
        {data.image && (
            <div className="timeline-image-wrapper">
                <img src={data.image} alt={data.year} className="timeline-image" />
            </div>
        )}
    </div>
);

export const Timeline = ({ events }) => {

    return (
        <div className="timeline-container">
            {events.map((event, idx) => (
                <TimelineItem data={event} key={idx} index={idx} />
            ))}
        </div>
    );
};