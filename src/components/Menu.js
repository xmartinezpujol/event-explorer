import React from 'react';
import glamorous from 'glamorous';

const MenuBar = glamorous.div({
  position: 'relative',
  bottom: '0px',
  width: '100%',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,0) 40%,rgba(0,0,0,.85) 100%)',
});

const MenuTitle = glamorous.div(
  {
    fontSize: 22,
    padding: '24px 50px',
    fontWeight: 900,
    ':hover': {
      cursor: 'pointer',
    },
  },
  props => ({
    color: props.active ? 'white' : '#CCC',
    borderBottom: props.active ? '6px solid #f83e59' : '6px solid #000',
  }),
);

const Menu = props => (
  <MenuBar>
    {props.tabs.map((tab, index) => (
      <MenuTitle
        active={props.active === index}
        onClick={() => props.onTabClick(index)}
      >
        {tab.toUpperCase()}
      </MenuTitle>
    ))}
  </MenuBar>
);

export default Menu;
