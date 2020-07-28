import * as Types from "../actions/types";

const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case Types.LOAD_TRANSACTIONS: {
      return action.payload.transactions;
    }
    case Types.CREATE_TRANSACTION: {
      let transactions = [...state];
      transactions.unshift(action.payload.transaction);
      return transactions;
    }
    case Types.REMOVE_TRANSACTION: {
      let transactions = [...state];
      return transactions.filter(
        (transaction) => transaction._id !== action.payload.id
      );
    }
    case Types.UPDATE_TRANSACTION: {
      let transactions = [...state]
      return transactions.map(transaction =>{
        if(transaction._id === action.payload.transaction._id){
          return action.payload.transaction
        }
        return transaction
      })

    }
    default:
      return state;
  }
};

export default transactionReducer;
