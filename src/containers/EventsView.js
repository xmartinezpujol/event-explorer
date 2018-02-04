import React from 'react';
import glamorous from 'glamorous';

import { connect } from 'react-redux';

import { Events, Events2, Events3 } from '../data/MockEvents';

import CarrouselEvent from '../components/CarrouselEvent';
import EventDetail from '../containers/EventDetail';

import * as eventActions from '../redux/modules/event';

const scrollTo = (elementId) => {
  const element = document.getElementById(`carrousel-events-${elementId}`);
  const position = element.getBoundingClientRect().top;

  setTimeout(() => {
    window.scrollTo(0, position + 50);
  }, 35);
};

const EventPage = glamorous.div({
  marginBottom: 50,
});

class EventsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [Events, Events2, Events3],
      eventData: null,
      activeCarrousel: null,
      selectedCarrousel: null,
    };
    this.handleCarrouselSelect = this.handleCarrouselSelect.bind(this);
    this.handleCollapseDetail = this.handleCollapseDetail.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.event !== this.props.event) {
      this.getEventData(newProps.event);
    }
  }

  getEventData(eventSelected) {
    this.setState(() => ({
      eventData: this.state.data[this.state.activeCarrousel - 1]
        .filter(event => event.id === eventSelected)[0],
    }));
  }

  handleCarrouselSelect(id) {
    this.setState(() => ({
      activeCarrousel: id,
    }));
  }

  handleCollapseDetail() {
    this.props.dispatch(eventActions.unselectEvent());
  }

  handleEventClick() {
    if (this.state.selectedCarrousel !== this.state.activeCarrousel) {
      this.setState(() => ({
        selectedCarrousel: this.state.activeCarrousel,
      }));

      scrollTo(this.state.activeCarrousel);
    }
  }

  render() {
    const { event } = this.props;
    return (
      <EventPage>
        <div id={`carrousel-events-${1}`} onMouseLeave={this.handleCollapseDetail}>
          <div onClick={this.handleEventClick} onMouseEnter={() => this.handleCarrouselSelect(1)} >
            <CarrouselEvent
              id={1}
              title="What's Hot"
              list={this.state.data[0]}
              cardHeight={250}
              cardWidth={475}
              selected={this.state.activeCarrousel === 1}
            />
          </div>
          {event !== null && this.state.activeCarrousel === 1 &&
            <EventDetail data={this.state.eventData} />
          }
        </div>
        <div id={`carrousel-events-${2}`} onMouseLeave={this.handleCollapseDetail}>
          <div onClick={this.handleEventClick} onMouseEnter={() => this.handleCarrouselSelect(2)} >
            <CarrouselEvent
              id={2}
              title="Based on your Activity"
              list={this.state.data[1]}
              cardHeight={250}
              cardWidth={475}
              selected={this.state.activeCarrousel === 2}
            />
          </div>
          {event !== null && this.state.activeCarrousel === 2 &&
            <EventDetail data={this.state.eventData} />
          }
        </div>
        <div id={`carrousel-events-${3}`} onMouseLeave={this.handleCollapseDetail}>
          <div onClick={this.handleEventClick} onMouseEnter={() => this.handleCarrouselSelect(3)} >
            <CarrouselEvent
              id={3}
              title="Techno"
              list={this.state.data[2]}
              cardHeight={250}
              cardWidth={475}
              selected={this.state.activeCarrousel === 3}
            />
          </div>
          {event !== null && this.state.activeCarrousel === 3 &&
            <EventDetail data={this.state.eventData} />
          }
        </div>
      </EventPage>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event,
});

export default connect(mapStateToProps)(EventsView);

