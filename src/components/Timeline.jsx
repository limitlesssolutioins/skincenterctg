import React from 'react';
import './timeline.css';

const TimelineItem = ({ data, index, position }) => (
    <div className={`timeline-item timeline-item-${position}`} style={{'--i': index}}>
        <div className="timeline-content">
            <h3>{data.year}</h3>
            <p>{data.text}</p>
        </div>
    </div>
);

const TimelineRow = ({ event1, event2, indexOffset }) => (
    <div className="timeline-row">
        {event1 && <TimelineItem data={event1} index={indexOffset} position="left" />}
        {event2 && <TimelineItem data={event2} index={indexOffset + 1} position="right" />}
    </div>
);

export const Timeline = ({ events }) => {
    const rows = [];
    for (let i = 0; i < events.length; i += 2) {
        rows.push(
            <TimelineRow
                key={i}
                event1={events[i]}
                event2={events[i + 1]}
                indexOffset={i}
            />
        );
    }

    return (
        <div className="timeline-container">
            {rows}
        </div>
    );
};