import React from 'react';
import glamorous from 'glamorous';
import * as glamor from 'glamor';

import { connect } from 'react-redux';

import EventList from './EventList';

import * as eventActions from '../redux/modules/event';

const MAX_TITLES = 20;
const maxSlides = Math.trunc(((window.innerWidth - 30) / 195));
const maxSlideMoves = Math.trunc((MAX_TITLES / maxSlides)) + 1;

const scrollTo = (element, direction, times) => {
  if (times > 0) {
    setTimeout(() => {
      if (direction === 'left') {
        element.scrollLeft -= 196;
      }
      if (direction === 'right') {
        element.scrollLeft += 196;
      }
      scrollTo(element, direction, times - 1);
    }, 35);
  }
};

const fadeIn = glamor.css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const CarrouselWrapper = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  animation: `${fadeIn} 2s ease`,
  transition: '0.25s cubic-bezier(0.17, 0.67, 0.52, 0.97)',
});

const NavPrev = glamorous.div({
  position: 'absolute',
  marginTop: 30,
  left: 50,
  transform: 'scale(4.5)',
  color: '#f83e59',
  cursor: 'pointer',
  zIndex: 100,
});

const NavNext = glamorous.div({
  position: 'absolute',
  marginTop: 30,
  right: 50,
  transform: 'scale(4.5)',
  color: '#f83e59',
  cursor: 'pointer',
  zIndex: 100,
});

class CarrouselEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlideSet: 0,
      currentEvent: null,
    };
    this.handleSlideMove = this.handleSlideMove.bind(this);
    this.handleCardHover = this.handleCardHover.bind(this);
    this.handleCardLeave = this.handleCardLeave.bind(this);
    this.handleCardSelect = this.handleCardSelect.bind(this);
  }

  handleCardHover(eventIndex) {
    this.setState(() => ({
      currentEvent: eventIndex,
    }));

    if (this.props.event !== null && this.props.selected) {
      this.props.dispatch(eventActions.selectEvent(this.props.list[eventIndex].id));
    }
  }

  handleCardLeave() {
    this.setState(() => ({
      currentEvent: null,
    }));
  }

  handleCardSelect(eventId) {
    this.props.dispatch(eventActions.selectEvent(eventId));
  }

  handleSlideMove(e, direction) {
    e.preventDefault();

    switch (direction) {
      case 'left':
        if (this.state.currentSlideSet !== 0) {
          this.setState(() => ({
            currentSlideSet: this.state.currentSlideSet - 1,
          }));
          scrollTo(document.getElementsByClassName('list-container')[this.props.id], 'left', maxSlides);
        }
        break;
      case 'right':
        if (this.state.currentSlideSet !== maxSlideMoves - 1) {
          this.setState(() => ({
            currentSlideSet: this.state.currentSlideSet + 1,
          }));
          scrollTo(document.getElementsByClassName('list-container')[this.props.id], 'right', maxSlides);
        }
        break;
      default:
    }
  }

  render() {
    return (
      <CarrouselWrapper>
        {this.state.currentSlideSet !== 0 &&
          <NavPrev data-icon="ei-chevron-left" onClick={e => this.handleSlideMove(e, 'left')} />
        }
        <EventList
          title={this.props.title}
          list={this.props.list}
          cardHeight={this.props.cardHeight}
          cardWidth={this.props.cardWidth}
          current={this.state.currentEvent}
          blocked={this.props.event !== null && this.props.selected}
          onCardHover={index => this.handleCardHover(index)}
          onCardLeave={this.handleCardLeave}
          onCardSelect={this.handleCardSelect}
          selected={this.props.selected ? this.props.event : null}
        />
        {this.state.currentSlideSet !== maxSlideMoves - 1 &&
          <NavNext data-icon="ei-chevron-right" onClick={e => this.handleSlideMove(e, 'right')} />
        }
      </CarrouselWrapper>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event,
});

export default connect(mapStateToProps)(CarrouselEvent);

