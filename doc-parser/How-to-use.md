# Doc Parser
Word Documents to JSON FAQ parser


## How to use

1. Place the file ```screpper.py``` inside the FAQs directory and then run ```python screpper.py```
2. An FAQ.json file will be generated after running the python script.
3. Copy the content of FAQ.json and place it as the value for the ```faq``` variable in src/constants/faq.js


## Definitions

###  The FAQs directory

The FAQs directory is a directory containing all department directories. 
    Each department directory contains multiple language directories
    Each language directory contains a list of documents 
    where each document has the name of a treatment and 
    contains a list of FAQs and their answer

### FAQ.json

A JSON file containing a json array of questions and answers objects