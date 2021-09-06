const form = document.getElementById('form')
const resultsHTML = document.getElementById('results')
const template = document.getElementById("template").content
const fragment = document.createDocumentFragment()

let results = {}

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('results')){
    results = JSON.parse(localStorage.getItem('results'))
    updateResults()
  }
})

const updateResults = () => {
  localStorage.setItem('results', JSON.stringify(results))
  resultsHTML.innerHTML = null
  Object.values(results).forEach(result => {
    const clone = template.cloneNode(true)
    clone.querySelector('#id').innerHTML = result.id
    clone.querySelector('#name').innerHTML = result.name
    clone.querySelector('#bmi').innerHTML = result.bmi
    fragment.append(clone)
  })
  resultsHTML.append(fragment)
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const weight = form.querySelector('#weight').value
  const height = form.querySelector('#height').value
  if(weight.trim() === '' || height.trim() === ''){
    alert('Error - You have to fill at least the weight and height fields')
    return
  }
  const BMI = calculateBMI(weight, height)
  let result = {
    id: Object.keys(results).length + 1,
    name: e.target.querySelector('#name').value,
    bmi: BMI,
  }
  results[result.id] = result
  updateResults()
})

const calculateBMI = (weight, height) => {
  return weight / height ** 2
}