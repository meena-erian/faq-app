# Everlast FAQ web-app

A simple app that compiles microsoft word document files into structured searchable list of questions and answers.

 

## Installation Prerequisites

To build this software, first you have to make sure you have Node.JS & NPM installed on your device, and python 3

  

## How to complie FAQs


```
python doc-parser/scrapper.py
```

This will update the structured list of questions and answers stored in ```src/constants/faq.js```

 
  
   


## How to build this project

Now that you have python 3 and NPM installed on your device, open a terminal in this directory and run the following commands one by one

| Command | Description |
| ------- | ----------- |
| ```npm install``` | installs all required packages for this project | 
| ```pip install python-docx``` | install the python module used to read microsoft word documents. |
| ```npm run build``` | Compiles microsoft word documents under doc-parser into a JS list of structured questions and answers and then builds the app |
| ```npm install -g deploy-handler``` or ```sudo npm install -g deploy-handler``` for macOS and Linux | installs a CLI that can be used to deploy the project to a remote server with just one command |
| ```deploy``` | Used to update the project on the remote server. (This command will prompt for a secret key to sign the package) |
 

  
   
    
## Publishing updates

After complting the installation, next time you need to publish any further updates, you will have to run the following commands

| Command | Description |
| ------- | ----------- |
| ```npm run update``` | recompile word documents under doc-parser to  ```src/constants/faq.js``` and rebuild the app and then republish the app to the remote server |