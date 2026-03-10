import React, { useState, useEffect} from 'react';
import AddTransaction from './components/AddTransaction';
import { Trash2 , Pencil} from 'lucide-react';
import IncomeExpense from './components/IncomeExpense';

function App() {
  const [transactions, setTransactions] = useState(()=>{
    const savedTransactions = localStorage.getItem("transactions");
    
    if(savedTransactions){
      return JSON.parse(savedTransactions);
    }
    return [];
  });

  //Edit transacitons
    const[editingTransaction, setEditingTransaction] = useState(null);

  useEffect(()=>{
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  //Delete transaction function
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t=>t.id!==id));
  };

  // Edit transactions
  const updateTransaction = (updatedTransaction) => {
    setTransactions(

      transactions.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );

    setEditingTransaction(null);
  }


  const balance = transactions
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-4">
          Expense Tracker
        </h1>

        <h2 className="text-xl text-center mb-6">
          Balance: 
          <span
            className = {`font-semibold ml-2 ${
              balance < 0 ? "text-red-600" : "text-green-600"
            }`}
            >
              ${balance}
            </span>
        </h2>

        <IncomeExpense transactions = {transactions} />

        {/* Add Transaction Form */}
        
        <AddTransaction
          addTransaction = {addTransaction}
          editingTransaction = {editingTransaction}
          updateTransaction = {updateTransaction}
        />
        {/* Transaction List */}
        <ul className="mt-6 space-y-2">
          {transactions.length === 0 && (
            <p className = "text-center text-gray-500 mt-4">
              No transactions yet.
            </p>
          )}
          {transactions.map(t => (
            <li
              key={t.id}
              className={`flex justify-between items-center p-3 border-r-4 rounded shadow-sm
                ${t.amount < 0 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-green-500 bg-green-50'}`}
            >
              <span className="font-medium">{t.text}</span>

              <div className='flex items-center gap-3'>
                <span className={`font-semibold ${
                  t.amount < 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount)}
                </span>

                {/* Edit button */}
                <button
                  onClick = {() =>setEditingTransaction(t)}
                  className = "text-blue-500 hover:text-blue-700 hover:scale-110 transition"
                >
                  <Pencil size={18}/>
                </button>

                {/* Delete Button */ }
                <button onClick={() => deleteTransaction(t.id)}
                className = "text-red-500 hover:text-red-700 hover:scale-110 transition"
                >
                  <Trash2 size={18}/>
                </button>

                
              </div>
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}

export default App;