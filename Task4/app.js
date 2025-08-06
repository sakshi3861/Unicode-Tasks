import { useState } from 'react'
import './App.css'

function App() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [heightUnit, setHeightUnit] = useState('cm')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [result, setResult] = useState(null)

  function getCategory(bmi) {
    if (bmi < 18.5) return { text: 'Underweight', class: 'underweight' }
    if (bmi < 25) return { text: 'Normal', class: 'normal' }
    if (bmi < 30) return { text: 'Overweight', class: 'overweight' }
    return { text: 'Obese', class: 'obese' }
  }

  function calculate() {
    if (!height || !weight) {
      alert('Please enter height and weight')
      return
    }

    let h = parseFloat(height)
    let w = parseFloat(weight)

    // Convert to metric
    if (heightUnit === 'inch') h = h * 2.54
    if (weightUnit === 'lbs') w = w * 0.453592

    // Calculate BMI
    const heightInM = h / 100
    const bmi = w / (heightInM * heightInM)
    const category = getCategory(bmi)

    setResult({
      bmi: bmi.toFixed(2),
      category: category
    })
  }

  function reset() {
    setHeight('')
    setWeight('')
    setResult(null)
  }

  return (
    <div className="app">
      <div className="calculator">
        <h1>BMI Calculator</h1>
        
        <div className="input-group">
          <label>Height</label>
          <div className="input-row">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height"
            />
            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
              <option value="cm">cm</option>
              <option value="inch">inch</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Weight</label>
          <div className="input-row">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
            />
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>

        <div className="buttons">
          <button className="calculate-btn" onClick={calculate}>
            Calculate BMI
          </button>
          <button className="reset-btn" onClick={reset}>
            Reset
          </button>
        </div>

        {result && (
          <div className="result">
            <div className="bmi-value">{result.bmi}</div>
            <div className={`category ${result.category.class}`}>
              {result.category.text}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
