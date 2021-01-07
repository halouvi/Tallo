import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core';
import { blue, deepOrange, green, pink } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { GET_BOARD_USER_BY_ID } from '../../../store/board/BoardActions';

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
  const [members, setMembers] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    const members = card.members.map(member => {
      return getMember(member)
    })
    setMembers(members);
  }, [])

  const getMember = (memberId) => {
    return dispatch(GET_BOARD_USER_BY_ID(memberId))
  }

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
      {members && members[0] && members?.map((member, idx) => (
        <Avatar key={idx} alt={ member.fullname} src={member.imgUrl? member.imgUrl: '/'} className={colorsPick(idx)} />
      ))}
    </AvatarGroup>
  )
}
