import React from 'react';
import glamorous from 'glamorous';

import { connect } from 'react-redux';

import Menu from './../components/Menu';

import * as eventActions from '../redux/modules/event';

const Background = glamorous.div({
  backgroundColor: 'black',
});

const EventWrapper = glamorous.div({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '-20px',
  marginBottom: '-80px',
  height: 600,
  transition: '0.25s cubic-bezier(0.17, 0.67, 0.52, 0.97)',
});

const Backdrop = glamorous.img({
  height: '100%',
  width: '65%',
  objectFit: 'cover',
});

const Overlay = glamorous.div({
  position: 'absolute',
  transition: 'all 0.3s ease',
  left: '35%',
  height: '100%',
  width: '50%',
  zIndex: 2,
  backgroundImage: 'linear-gradient(to left,rgba(0,0,0,0) 0,rgba(0,0,0,0) 75%,rgba(0,0,0,1) 100%)',
});

const Title = glamorous.h3({
  fontSize: 36,
  color: 'white',
});

const Description = glamorous.div({
  maxWidth: '85%',
  fontSize: 18,
  lineHeight: '28px',
  color: 'grey',
});

const EventInfo = glamorous.div({
  position: 'relative',
  top: 0,
  left: 40,
  width: '100%',
  transition: 'all 0.3s ease',
});

const Close = glamorous.i({
  position: 'absolute',
  right: 0,
  paddingTop: 30,
  height: 100,
  width: 70,
  zIndex: 100,
  color: 'white',
  fontSize: 40,
  cursor: 'pointer',
  background: 'radial-gradient(ellipse at top right,rgba(0,0,0,.4) 0,rgba(0,0,0,0) 70%,rgba(0,0,0,0) 100%)',
});

const Icon = glamorous.i({
  transition: 'all 0.3s ease',
  marginTop: 20,
  marginRight: 20,
  padding: 10,
  color: 'white',
  fontSize: 20,
  border: '2px solid grey',
  borderRadius: '100%',
  ':hover': {
    cursor: 'pointer',
    color: '#f83e59',
    borderColor: 'white',
    transform: 'scale(1.2)',
  },
});

const menuOptions = ['Details', 'Club', 'Tickets', 'More like this'];

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      showing: 0,
      opened: 0,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    setTimeout(() => (
      this.setState(() => ({
        showing: 1,
      }))
    ), 300);

    setTimeout(() => (
      this.setState(() => ({
        opened: 1,
      }))
    ), 300);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.event !== this.props.event) {
      setTimeout(() => (
        this.setState(() => ({
          showing: 0,
        }))
      ), 0);

      setTimeout(() => (
        this.setState(() => ({
          showing: 1,
        }))
      ), 600);
    }
  }

  handleClose() {
    setTimeout(() => (
      this.setState(() => ({
        opened: 0,
      }), () => setTimeout(() => (
        this.props.dispatch(eventActions.unselectEvent())
      ), 500))
    ), 300);
  }

  handleTabClick(id) {
    this.setState(() => ({
      activeTab: id,
    }));
  }

  render() {
    const { data } = this.props;
    const description = data.desc.split('\n').map((line, index) => (
      <p key={`desc-${index}-${data.id}`}>{line}</p>
    ));

    return (
      <Background style={{ opacity: this.state.opened }}>
        <EventWrapper style={{ opacity: this.state.showing }}>
          <Close className="material-icons" onClick={this.handleClose} >close</Close>
          {this.state.activeTab === 0 &&
            <EventInfo style={{ transform: this.state.showing === 1 ? 'translateX(0px)' : 'translateX(80px)' }} >
              <Title>{data.title}</Title>
              <Description>{description}</Description>
              <Icon className="material-icons">bookmark</Icon>
              <Icon className="material-icons">thumb_up</Icon>
              <Icon className="material-icons">thumb_down</Icon>
              <Icon className="material-icons">share</Icon>
            </EventInfo>
          }
          {this.state.activeTab === 1 &&
            <div style={{ width: '100%', paddingLeft: 40 }}>
              <Title>Here goes the Club Info</Title>
            </div>
          }
          {this.state.activeTab === 2 &&
            <div style={{ width: '100%', paddingLeft: 40 }}>
              <Title>Here goes the RSVP Info</Title>
            </div>
          }
          {this.state.activeTab === 3 &&
            <div style={{ width: '100%', paddingLeft: 40 }}>
              <Title>Here we show Related Events</Title>
            </div>
          }
          <Backdrop src={data.backdrop_detail} />
          <Overlay />
        </EventWrapper>
        <Menu
          tabs={menuOptions}
          active={this.state.activeTab}
          onTabClick={tabIndex => this.handleTabClick(tabIndex)}
        />
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event,
});

export default connect(mapStateToProps)(EventDetail);
