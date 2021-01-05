import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateBoard } from '../../../store/board/BoardActions';
import { Textarea } from '../../Textarea/Textarea';
import { CardAvatars } from '../avatars/CardAvatars';

class _CardModal extends Component {
  state = {
    currList: {},
    currCard: {}
  }

  componentDidMount() {
    console.log(this.props.board);
    this.loadCard();
  }

  onHandleChange = (ev, isDesc) => {
    ev.preventDefault();
    var card = JSON.parse(JSON.stringify(this.state.currCard));
    var field = ev.target.name;
    var value = ev.target.value;
    if (isDesc || isDesc === '') {
      field = 'desc';
      value = isDesc;
    }
    this.setState(prevState => ({ currCard: { ...prevState.currCard, [field]: value } }), () => {
      try {
        this.onSaveCard()
      }
      catch (err) {
        this.setState({ currCard: card })
        console.error(err);
      }
    })
  }

  onSaveCard = async () => {
    var board = JSON.parse(JSON.stringify(this.props.board));
    var card = JSON.parse(JSON.stringify(this.state.currCard));
    var listIdx = board.lists.findIndex((list) => {
      return list.cards.find(aCard => aCard._id === card._id)
    });
    var cardIdx = board.lists[listIdx].cards.findIndex(aCard => aCard._id === card._id);
    board.lists[listIdx].cards.splice(cardIdx, 1, card);
    try {
      await this.props.updateBoard(board);
      alert('Saved');
    }
    catch (err) {
      throw new Error(err)
    }
  }

  loadCard = () => {
    const cardId = this.props.match.params.id;
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
          <SideBar />
          <div className="modal-title">
            <h3>{currCard.title}</h3>
            <p className="modal-subtitle">in list <span>{this.state.currList.title}</span></p>
          </div>
          <div className="members-container">
            <h4>MEMBERS</h4>
            <CardAvatars card={currCard}></CardAvatars>
          </div>
          <div className="desc-container">
            <h3>Description</h3>
            <Textarea desc={currCard.desc} onSaveDesc={this.onHandleChange}></Textarea>
          </div>
          {currCard.attachments && currCard.attachments[0] && <div className="attachments-container">
            <h3>Attachments</h3>
            <img src={currCard?.attachments[0]} alt="" />
          </div>}
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