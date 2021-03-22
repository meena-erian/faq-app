import { useState } from 'react';
import './App.css';
import faq from "./constants/faq.js";
import * as colors from "./constants/colors.js";
import 'bootstrap/dist/css/bootstrap.css';

/**
 * @var depts Array of all department names
 */
var depts = {};
faq.forEach(q => {
  depts[q.department] = true;
});
depts = Object.keys(depts);

/**
 * Escape HTML entries in order to savely print arbitrary text on the document
 * 
 * @param {string} html Any text that can possibly contain HTML entries
 * @returns {string} Text with all HTML entries excaped so it can be 
 * safely inserted into the document
 */
function escapeHtml(html) {
  var p = document.createElement('p');
  p.innerText = html;
  return p.innerHTML;
}

/**
 * A function that renders questions and answers on the DOM
 * 
 * @param {Object} arr An array of FAQ objects where each object has the
 * following properties {question, answer, department, treatment, lang}
 */
function printResults(arr) {
  var resDiv = document.querySelector('#results');
  var resHTML = '';
  arr.forEach(q => {
    var langswitch = '';
    if (q.lang === 'Arabic') langswitch = `style="direction: rtl;text-align: right;"`
    resHTML += `<details class='faq-item' ${langswitch}>`;
    resHTML += `<summary class='faq-question'>${escapeHtml(q.question)}</summary>`;
    resHTML += `<div class='faq-answer'>${escapeHtml(q.answer)}</div>`;
    resHTML += `<div class='faq-footer'>`;
    resHTML += `Department: <span>${escapeHtml(q.department)}</span><br />`;
    resHTML += `Treatment: <span>${escapeHtml(q.treatment)}</span>`;
    resHTML += `</div>`;
    resHTML += `</details>`;
  });
  resDiv.innerHTML = resHTML;
}

/**
 * This function shows search results by calling printResults after performing a 
 * filteration based on provided keywords.
 * 
 * @param {string} keyword A string containg one or more space delimited keywords 
 * which will be used to filter results.
 */
function FAQsearch(keyword) {
  if (keyword.length < 3) {
    printResults([]);
    return;
  }
  var selectedDept = document.querySelector('#department').value;
  var selectedCPT = document.querySelector('#treatment').value;
  var keyWords = keyword.split(' ');
  var results = faq.filter(
    q => {
      for(var i=0; i<keyWords.length; i++){
        if(
          q.question.toLowerCase().search(keyWords[i].toLowerCase()) === -1 &&
          q.department.toLowerCase().search(keyWords[i].toLowerCase()) === -1 &&
          q.treatment.toLowerCase().search(keyWords[i].toLowerCase()) === -1
        ) return false;
      }
      return true;
    }
  );
  if (selectedDept.length) results = results.filter(q => q.department === selectedDept);
  if (selectedCPT.length) results = results.filter(q => q.treatment === selectedCPT);
  printResults(results);
}

/**
 * This function is used to render a list of options in the treatments select 
 * input based on the currently selected department. 
 * 
 * @param {string} currentDept The currently selected department.
 * @returns <React.Component>
 */
function selectedTreatments(currentDept) {
  var treatments = {};
  faq.forEach(q => {
    if (q.department === currentDept)
      treatments[q.treatment] = true;
  });
  return Object.keys(treatments).map(treatment => <option value={treatment} key={treatment} />);
}

/**
 * This function uses printResults() to render results once a user selects a treament from the 
 * treatments select.
 * 
 * @param {Event} e A mouse event of any input device event that triggered a change in the 
 * treatments select.
 */
function openTreatment(e) {
  var selectedDept = document.querySelector('#department').value;
  var results = faq.filter(q => q.department === selectedDept && q.treatment === e.target.value);
  printResults(results);
}

function App() {
  const [department, setDepartment] = useState("");
  const [questions, setQuestions] = useState("");
  faq2().then(f => setQuestions(f));
  return (
    <div className="App">
      <header className="App-header">
        <div className='topnav' style={{ backgroundColor: colors.blue, color: "white" }}>
          <img src="/logo-white.png" alt="everlast-logo" style={{ width: 70 }} />
          <h2 style={{ textAlign: "center" }}>Everlast FAQs</h2>
          <table style={{margin: "auto", maxWidth: "95vw"}}>
            <tbody>
              <tr>
                <td colspan='2'>
                  <input
                    className='search'
                    type='search'
                    onChange={(ev) => FAQsearch(ev.target.value)}
                    onInput={(ev) => FAQsearch(ev.target.value)}
                    placeholder="Type a question or keyword"
                  />
                </td>
              </tr>
              <tr>
                <td style={{paddingRight: 10}}>
                  <input
                    placeholder='Department'
                    type='text'
                    id='department'
                    list="departments"
                    onClick={e => e.target.value = ""}
                    onChange={e => setDepartment(e.target.value)}
                    style={{width: "100%"}}
                  />
                  <datalist id="departments">
                    {depts.map(dept => <option value={dept} key={dept} />)}
                  </datalist>
                </td>
                <td>
                  <input
                    placeholder='Treatment'
                    type='text'
                    id='treatment'
                    list='treatments'
                    onChange={e => openTreatment(e)}
                    onClick={e => e.target.value = ""}
                    style={{width: "100%"}}
                  />
                  <datalist id="treatments">
                    {selectedTreatments(department)}
                  </datalist>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id='results'><pre>{questions}</pre></div>
      </header>
    </div>
  );
}

export default App;
