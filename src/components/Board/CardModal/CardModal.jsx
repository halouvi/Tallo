import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateBoard } from '../../../store/board/BoardActions';
import { Textarea } from '../../Textarea/Textarea';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';


class _CardModal extends Component {
  state = {
    currList: {},
    currCard: {}
  }

  componentDidMount() {
    console.log(this.props.board);
    this.loadCard();
  }

  onSaveDesc = async (desc) => {
    console.log('Saved:', desc);
    var board = JSON.parse(JSON.stringify(this.props.board));
    var card = JSON.parse(JSON.stringify(this.state.currCard));
    card.desc = desc;
    var listIdx = board.lists.findIndex((list) => {
      return list.cards.find(aCard => aCard._id === card._id)
    });
    var cardIdx = board.lists[listIdx].cards.findIndex(aCard => aCard._id === card._id);
    board.lists[listIdx].cards.splice(cardIdx, 1, card);
    await this.props.updateBoard(board);
    alert('Saved');
  }

  loadCard = () => {
    const cardId = this.props.match.params.id;
    console.log(cardId);
    const lists = this.props.board.lists;
    const list = lists.find((list, index) => {
      return list.cards.find(card => card._id === cardId)
    })
    this.setState({ currList: list })
    const currCard = list.cards.find(card => card._id === cardId)
    this.setState({ currCard }, console.log(currCard))
  }

  render() {
    const { currCard } = this.state;
    return (
      <div className="modal-section" >
        <div className="modal-container">
          <NavLink className="exit-btn" to="/board">X</NavLink>
          <div className="modal-title">
            <h3>{currCard.title}</h3>
            <p className="modal-subtitle">in list <span>{this.state.currList.title}</span></p>
          </div>
          <div className="members-container">
            <h4>MEMBERS</h4>
            <AvatarGroup max={4}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>
          </div>
          <div className="desc-container">
            <h3>Description</h3>
            <Textarea desc={currCard.desc} onSaveDesc={this.onSaveDesc}></Textarea>
          </div>
          <div className="activity-section">
            <h3>Activity</h3>
            <ul className="activity-container">
              {currCard.activity?.map((activity, idx) => (
                <li key={idx}>
                  <div className="activity-main">
                    <h3>{activity.createdBy}</h3>
                    <p>{activity.activity}</p>
                  </div>
                  <p>{activity.createdAt}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardReducer.board
  }
}

const mapDispatchToProps = {
  updateBoard
}

export const CardModal = connect(mapStateToProps, mapDispatchToProps)(_CardModal)