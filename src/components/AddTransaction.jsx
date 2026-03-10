import React, { useState, useEffect } from 'react';

function AddTransaction({ addTransaction, editingTransaction, updateTransaction }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  //EFFECT: When editingTransaction changes (user clicks edit), fill the form
  useEffect(() => {
    if (editingTransaction){
      setText(editingTransaction.text);
      setAmount(editingTransaction.amount);

    }else{
      setText('');
      setAmount('');
    }
  }, [editingTransaction])
  
  const onSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Don't add if text is empty or amount is 0
    if (!text.trim() || amount === '') {
      alert('Please add a description and an amount');
      return;
    }

    if (editingTransaction) {
      // Logic for UPDATING
      updateTransaction({
        ...editingTransaction,
        text,
        amount:parseFloat(amount)
      });
    } else {
      // Logic for ADDING
      const newTransaction = {
        id: Math.floor(Math.random() * 1000000),
        text,
        amount: parseFloat(amount)
      };
      addTransaction(newTransaction);

    }

    //Reset fields
    setText('');
    setAmount('');

  };

  return (
    <div>

      <h3 className="text-lg font-semibold text-gray-700 tracking-wide mb-4 uppercase">
        {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
      </h3>

      <form onSubmit={onSubmit} className="space-y-4">

        <div>
          <label className = "block text-sm font-medium text-gray-600">Description</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Enter description..." 
            className = "w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className = "block text-sm font-medium text-gray-600">Amount</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder = "Enter amount (negative for expenses) ..."
            className = "w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>

        <button 
          type="submit" 
          className={`w-full text-white py-2 mt-4 rounded transition ${
            editingTransaction ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;