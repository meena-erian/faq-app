# Everlast FAQ web-app

A simple app that complies microsoft word document files into structured searchable list of questions and answers.

 
 

## Installation Prerequisites

To build this software, first you have to make sure you have Node.JS & NPM installed on your device, and python 3

 

  

## How to complie FAQs

Now that you have python 3 installed on your device, open a terminal in this directory and run the following command:

```
python doc-parser/scrapper.py
```

This will update the structured list of questions and answers stored in ```src/constants/faq.js```

 
  
   


## How to build this project

Now that you have NPM installed, open a terminal on this directory and run the following commands one by one

| Command | Description |
| ------- | ----------- |
| ```npm install``` | installs all required packages for this project | 
| ```npm run build``` | Build the app |
| ```npm install -g deploy-handler``` | installs a CLI that can be used to deploy the project to a remote server with just onw ommand |
| ```deploy``` | Used to update the project on the remote server. (This command will prompt for a secret key to sign the package) |
 

  
   
    
## Publishing updates

After complting the installation, next time you need to publish any further updates, you will have to run the following commands

| Command | Description |
| ------- | ----------- |
| ```python doc-parser/scrapper.py``` | recompile word document to  ```src/constants/faq.js``` |
| ```npm run build``` | rebuild the app |
| ```deploy``` | republish the app to the remote server |