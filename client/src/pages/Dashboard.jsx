import React, { Component } from "react";
import { connect } from "react-redux";

import {
  loadTransactions,
  removeTransaction,
} from "../store/actions/transactionAction";
import MyModal from "../components/transactions/MyModal";
import UpdateTransaction from "../components/transactions/UpdateTransaction";

class Dashboard extends Component {
  state = {
    createModalOpen: false,
    updateModalOpen: false,
    id: "",
  };

  openCreateModal = () => {
    this.setState({
      createModalOpen: true,
    });
  };
  closeCreateModal = () => {
    this.setState({
      createModalOpen: false,
    });
  };

  openUpdateModal = (id) => {
    this.setState({
      updateModalOpen: true,
      id,
    });
  };
  closeUpdateModal = () => {
    this.setState({
      updateModalOpen: false,
      id: "",
    });
  };

  componentDidMount() {
    this.props.loadTransactions();
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    let { auth, transactions } = this.props;

    return (
      <div className="row my-5 text-light dashboard">
        <div className="container">
          <h1>Welcome Back {auth.user.name}</h1>
          <p>You logged in with bellow email: {auth.user.email} </p> <br />
          <div>
            <button
              onClick={this.openCreateModal}
              className="btn btn-primary my-3"
            >
              Create New Transaction
            </button>
          </div>
          <MyModal
            isOpen={this.state.createModalOpen}
            close={this.closeCreateModal}
          />
          <div>
            <h3>Transactions: </h3>
            {transactions.message ? (
              transactions.message
            ) : (
              <div className="tb">
                <table className="table table-light text-center">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Source</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction._id} className="item">
                        <td>{this.capitalize(transaction.type)}</td>
                        <td>{this.capitalize(transaction.note)} </td>
                        <td>${transaction.amount}</td>
                        {this.state.id === transaction._id ? (
                          <UpdateTransaction
                            isOpen={this.state.updateModalOpen}
                            close={this.closeUpdateModal}
                            transaction={transaction}
                          />
                        ) : null}
                        <td>
                          <button
                            className="edit-btn"
                            onClick={() =>
                              this.openUpdateModal(transaction._id)
                            }
                          >
                            <i className="fas fa-pen"></i>
                          </button>
                          <button
                            className="clear-btn"
                            onClick={() =>
                              this.props.removeTransaction(transaction._id)
                            }
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  transactions: state.transactions,
});
export default connect(mapStateToProps, {
  loadTransactions,
  removeTransaction,
})(Dashboard);
