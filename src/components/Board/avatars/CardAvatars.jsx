import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core';
import { blue, deepOrange, green, pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
}));

export const CardAvatars = ({ card }) => {

  const classes = useStyles();
  const colorsPick = (idx) => {
    switch (+idx) {
      case 0:
        return classes.blue;
      case 1:
        return classes.green;
      case 2:
        return classes.pink;
      case 3:
        return classes.orange;
      default:
        break;
    }
  }

  return (
    <AvatarGroup max={4}>
      {card.members && card.members[0] && card?.members.map((member, idx) => (
        <Avatar key={idx} alt={member.name} src="/static/images/avatar/1.jpg" className={colorsPick(idx)} />
      ))}
    </AvatarGroup>
  )
}
