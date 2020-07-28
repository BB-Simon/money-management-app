import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";

import { updateTransaction } from "../../store/actions/transactionAction";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
  },
};

class UpdateTransaction extends Component {
  state = {
    amount: 0,
    note: "",
  };

  componentDidMount(){
      this.setState({
          amount: this.props.transaction.amount,
          note: this.props.transaction.note
      })
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.updateTransaction(this.props.transaction._id, this.state)
    this.props.close()
  };

  render() {
    let { amount, note } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.close}
        style={customStyles}
        contentLabel="Create New Transaction"
      >
        <h3>Create New Transaction</h3>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              className="form-control"
              type="number"
              name="amount"
              placeholder="Enter an amount"
              id="amount"
              value={amount}
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="note">Note</label>
            <textarea
              className="form-control"
              name="note"
              placeholder="leave a note"
              id="note"
              value={note}
              onChange={this.changeHandler}
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </Modal>
    );
  }
}

export default connect(null, { updateTransaction })(UpdateTransaction);
