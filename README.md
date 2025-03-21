# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Author: Arunkumar Packirisamy

## Available Scripts

In the project directory, you can run:

### `npm install`

To install the dependencies from package.json

### `npm run server`

Runs the JSON server in port **3001**.\
Open [http://localhost:3001/users](http://localhost:3001/users) to view it in your browser.


### `npm start`

Runs the app in port **3000**.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### UI Screenshots

<img width="1728" alt="Screenshot 2025-03-16 at 7 27 10 AM" src="https://github.com/user-attachments/assets/7c4a48ec-4619-48be-bf78-341dd1b1b8e5" />
<img width="1728" alt="Screenshot 2025-03-16 at 7 27 40 AM" src="https://github.com/user-attachments/assets/149ea7e5-4094-442c-9b2b-f367d389b028" />
<img width="1728" alt="Screenshot 2025-03-16 at 7 27 57 AM" src="https://github.com/user-attachments/assets/2256f62e-88ce-4291-8eec-bce8d67c4d82" />
<img width="1728" alt="Screenshot 2025-03-16 at 7 28 23 AM" src="https://github.com/user-attachments/assets/f451f4cb-c99b-44f4-ab7a-1a5f6900819f" />
<img width="1728" alt="Screenshot 2025-03-16 at 7 36 37 AM" src="https://github.com/user-attachments/assets/1be4d23a-5c63-4258-9412-27b4820ea4e9" />

### Server Screenshots
<img width="1728" alt="Screenshot 2025-03-16 at 7 29 59 AM" src="https://github.com/user-attachments/assets/e3750e4c-42bf-41fa-967a-5f402e090cb6" />
<img width="1728" alt="Screenshot 2025-03-16 at 7 41 38 AM" src="https://github.com/user-attachments/assets/228c2d7f-7888-4faf-bde4-80dc146c56b0" />

 ### Package Dependencies

    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^6.4.5",
    "@mui/material": "^6.4.5",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.9",
    "json-server": "^1.0.0-beta.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.0.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
    
### Task Description

# Bank Account

Your job is to design and implement a *single-page web application* GUI that handles user input and output. The following writeup and sample input/output are CLI representation of the UI. You should adapt them to suitable web interface accordingly. 

There is no requirement to integrate with a backend service nor external database. 

Your UI should be aesthetically pleasing, styled properly, consistent, and intuitive. The code pertaining to styling should be structured idiomatically as per your chosen framework / library. 

It is highly preferable to provide automated tests in your solution.

## Problem Statement

You're designing a simple banking system that handles operations on bank accounts. At the moment, your system is capable of three features:
- depositing an amount
- withdrawing an amount
- printing account statement

When account is created, its balance is 0.

When launching the application, it prompts user for actions:
```
Welcome to AwesomeGIC Bank! What would you like to do?
Deposit
Withdraw
Print statement
Quit
```

User should be to select any of the options from the UI.

## Deposit
Upon selecting `Deposit` from the UI, application prompts user for amount:
```
Please enter the amount to deposit:
```

User is then able to enter:
```
500
```

Then system responds with:
```
Thank you. $500.00 has been deposited to your account.
Is there anything else you'd like to do?
Deposit
Withdraw
Print statement
Quit
```

## Withdraw
Upon selecting `Withdraw` from the UI, system then responds with:
```
Please enter the amount to withdraw:
```

User is able to enter:
```
100
```

Then system responds with:
```
Thank you. $100.00 has been withdrawn.
Is there anything else you'd like to do?
Deposit
Withdraw
Print statement
Quit
```
You can ignore where the withdrawn amount goes for now.

## Print Statement
Upon choosing to `Print statement` from the UI, system then responds with:
```
Date                  | Amount  | Balance
8 Jul 2022 11:12:30AM | 500.00  | 500.00
8 Jul 2022 11:14:15AM | -100.00 | 400.00
```

## Quit
When user chooses to `Quit`, system responds with:
```
Thank you for banking with AwesomeGIC Bank.
Have a nice day!
```

