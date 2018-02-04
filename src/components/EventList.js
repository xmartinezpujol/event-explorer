import React from 'react';
import glamorous from 'glamorous';
import * as glamor from 'glamor';

import EventCard from './EventCard';

const fadeIn = glamor.css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const ListWrapper = glamorous.div({
  animation: `${fadeIn} 2s ease`,
});

const ListContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
});

const ListTitle = glamorous.h2({
  paddingLeft: 30,
  color: '#f83e59',
  fontWeight: 700,
});

const CardWrapper = glamorous.div({
  // backgroundColor: 'black',
});

const EventList = props => (
  <ListWrapper>
    <ListTitle>{props.title}</ListTitle>
    <ListContainer>
      {props.list.map((event, index) => (
        <CardWrapper
          key={event.id}
          onMouseEnter={() => props.onCardHover(index)}
          onMouseLeave={props.onCardLeave}
          onClick={() => props.onCardSelect(event.id)}
        >
          <EventCard
            id={event.id}
            title={event.title}
            desc={event.desc}
            clickable
            imgurl={event.backdrop.url}
            position={event.backdrop.position}
            height={props.cardHeight}
            width={props.cardWidth}
            animate={(props.current === index) || (props.current === null) ?
              null : props.current > index ? 'left' : 'right'}
            blocked={props.blocked}
            selected={props.selected === event.id}
            active={props.current === index}
            pointerSelector
          />
        </CardWrapper>
      ))}

    </ListContainer>
  </ListWrapper>
);

export default EventList;
