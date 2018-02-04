import React from 'react';
import glamorous from 'glamorous';
import * as glamor from 'glamor';

const bounce = glamor.css.keyframes({
  '0%': { transform: 'translate(0)', opacity: 0 },
  '80%': { opacity: 1 },
  '100%': { transform: 'translateY(10px)', opacity: 0 },
});

const fadeIn = glamor.css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const CardContainer = glamorous.div(
  {
    position: 'relative',
    textDecoration: 'none',
    fontFamily: 'sans-serif',
    fontSize: 16,
    margin: 2,
    border: 'none',
    display: 'inline-block',
    textAlign: 'center',
    transition: '0.25s cubic-bezier(0.17, 0.67, 0.52, 0.97)',
    color: '#000',
    ':focus': { outline: 0 },
    ':hover': {
      cursor: 'pointer',
    },
  },
  props => ({
    backgroundColor: props.color,
    height: props.height,
    minWidth: props.width,
    transform: (props.active && !props.blocked) ? 'translateX(0) scale(1.2)' :
      (props.animate === 'right' || props.animate === 'left') ? `translateX(calc(50px *
      ${props.animate === 'right' ? '1' : '-1'}))` : 'none',
    opacity: (props.animate === 'right' || props.animate === 'left') ? 0.6 : 1,
  }),
);

const Image = glamorous.div(
  {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '120%',
    transition: 'all 0.4s ease',
  },
  props => ({
    backgroundImage: `url(${props.url})`,
    backgroundPosition: props.position ? props.position : '50% 50%',
    border: (props.blocked && props.active) ? '3px solid white' : 0,
  }),
);

const Overlay = glamorous.div(
  {
    position: 'absolute',
    transition: 'all 0.3s ease',
    height: '85%',
    width: '100%',
    marginTop: 20,
    zIndex: 50,
    backgroundImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,0) 50%,rgba(0,0,0,.85) 100%)',
  },
  props => ({
    border: (props.blocked && props.active) || (props.selected) ? '5px solid #f83e59' : 0,
    animation: (props.blocked && props.active) || (props.selected) ? `${fadeIn} 1s ease forwards` : 'none',
  }),
);

const ArrowDown = glamorous.div({
  position: 'absolute',
  bottom: 0,
  left: 'calc(50% - 12px)',
  zIndex: 60,
  width: 0,
  height: 0,
  borderLeft: '20px solid transparent',
  borderRight: '20px solid transparent',
  borderTop: '20px solid #f83e59',
  animation: `${fadeIn} 1s ease forwards`,
});

const PointerSelector = glamorous.div({
  transform: 'scale(3)',
  color: '#f83e59',
});

const PointerWrapper = glamorous.div(
  {
    position: 'absolute',
    bottom: 20,
    left: 'calc(50% - 5px)',
    zIndex: 100,
    transition: 'all 0.4s ease',
  },
  props => ({
    opacity: props.active ? 1 : 0,
    animation: props.active ? `${bounce} 2.5s ease infinite forwards` : 'none',
  }),
);

const Card = props => (
  <CardContainer
    height={props.height}
    width={props.width}
    active={props.active}
    blocked={props.blocked}
    animate={props.blocked ? false : props.animate}
  >
    <Image
      url={props.imgurl}
      zoom={props.zoom}
      position={props.position}
    />
    <Overlay blocked={props.blocked} active={props.active} selected={props.selected} >
      {props.pointerSelector &&
        <PointerWrapper active={props.active && !props.selected} >
          <PointerSelector data-icon="ei-chevron-down" />
        </PointerWrapper>
      }
    </Overlay>
    {props.selected &&
      <ArrowDown />
    }
  </CardContainer>
);

export default Card;
