import React, { useState } from 'react';

function AddTransaction({ addTransaction }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", text, amount);

    // Basic validation: Don't add if text is empty or amount is 0
    if (!text.trim() || !amount) {
      alert('Please add a description and an amount');
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: parseFloat(amount)
    };

    // This calls the function in App.jsx
    addTransaction(newTransaction); 

    // Reset fields
    setText('');
    setAmount(0);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 tracking-wide mb-4 uppercase">Add new transaction</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label>Description</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Enter description..." 
            className = "w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>
        <div>
          <label>Amount</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder = "Enter amount (negative for expenses) ..."
            className = "w-full border border-gray-300 rounded p-2 mt-1"
          />
        </div>
        <button type="submit" className='w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition'>Add transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;