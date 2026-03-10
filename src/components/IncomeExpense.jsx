import React from 'react';

function IncomeExpense({ transactions }) {
    
    const income = transactions
        .filter (t => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0)
        .toFixed(2);

    const expense = transactions
        .filter(t => t.amount < 0 )
        .reduce((acc,t) => acc + t.amount, 0)
        .toFixed(2);

    return (
        <div className = "flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
            <div className = "text-center flex-1">
                <h4 className = "text-gray-600 uppercase text-sm">Income</h4>
                <p className = "text-green-600 font-bold text-lg">
                    +${income}
                </p>
            </div>

            <div className = "border-1 mx-4"></div>

            <div className = "text-center flex-1">
                <h4 className = "text-gray-600 uppercase text-sm">Expense</h4>
                <p className = "text-red-600 font-bold text-lg">
                    ${expense}
                </p>
            </div>
        </div>
    );
}

export default IncomeExpense