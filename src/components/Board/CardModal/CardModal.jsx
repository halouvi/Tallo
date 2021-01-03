import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class _CardModal extends Component {
  state = {
    currList: {},
    currCard: {}
  }

  componentDidMount() {
    console.log(this.props.board);
    this.loadCard();
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
    return (
      <div className="modal-section" >
        <div className="modal-container">
          <NavLink className="exit-btn" to="/board">X</NavLink>
          <div className="modal-title">
            <h3>{this.state.currCard.title}</h3>
            <p className="modal-subtitle">in list <span>{this.state.currList.title}</span></p>
          </div>
          <div className="desc-container">
            <h3>Description</h3>
            <textarea placeholder="Add a more detailed description..." name="" id="" cols="55" rows="10"></textarea>
            <button>Save</button> <button>X</button>
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

export const CardModal = connect(mapStateToProps)(_CardModal)