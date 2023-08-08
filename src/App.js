import InvestmentTable from "./components/InvestmentTable";
import InvestmentForm from "./components/InvestmentForm";
import InvestmentHeader from "./components/InvestmentHeader";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState(null);
  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];

  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <InvestmentHeader></InvestmentHeader>
      <InvestmentForm passData={calculateHandler}></InvestmentForm>
      {!userInput && <p>No investment calculated yet!</p>}
      {userInput && (
        <InvestmentTable
          yearlyData={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;