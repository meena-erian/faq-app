import { useState } from 'react';
import './App.css';
import faq from "./constants/faq.js";
import faq2 from "./constants/faq-async.js";
import * as colors from "./constants/colors.js";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

var depts = {};
faq.forEach(q => {
  depts[q.department] = true;
});
depts = Object.keys(depts);
function escapeHtml(html) {
  var p = document.createElement('p');
  p.innerText = html;
  return p.innerHTML;
}
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
function FAQsearch(keyword) {
  if (keyword.length < 3) {
    printResults([]);
    return;
  }
  var selectedDept = document.querySelector('#department').value;
  var selectedCPT = document.querySelector('#treatment').value;
  var results = faq.filter(q => q.question.search(keyword) > -1);
  if (selectedDept.length) results = results.filter(q => q.department === selectedDept);
  if (selectedCPT.length) results = results.filter(q => q.treatment === selectedCPT);
  printResults(results);
}

function selectedTreatments(currentDept) {
  var treatments = {};
  faq.forEach(q => {
    if (q.department === currentDept)
      treatments[q.treatment] = true;
  });
  return Object.keys(treatments).map(treatment => <option value={treatment} key={treatment} />);
}

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
