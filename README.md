# Google Calendar Rendering

This repository contains the code for rendering a Google calendar's single column with scheduled meetings using ReactJS.


## Problem Statement

The task is to create a column representation of a Google calendar and render the scheduled meetings. The meetings are provided as an array, and there are four cases to handle:

1. Only one meeting at a given start and end time.
2. Two or more meetings that intersect but have different start and end times.
3. Two or more meetings that start and end at the same time.
4. Two or more meetings that start and end at the same time, and some meetings intersect but have different start and end times.


## Solution

The problem can be solved by breaking it down into smaller parts and implementing them step by step. Here is an overview of the solution approach:

1. Build a column component that renders the hours as cells.
2. Perform necessary calculations on the meetings array to convert it into the required format.
3. Use the converted meetings data to build the meetings layer and render it on top of the column component.


## Folder Structure

The folder structure of this repository is as follows:

<img width="276" alt="Screenshot 2023-06-27 at 11 06 46 PM" src="https://github.com/hritik2002/CalendarColumn-FE-Interview/assets/72138429/23cac38d-b9d9-481e-b738-0c2a0b97669c">


- The `src/components` directory contains the React components used in the application.
- The `src/App.js` file is the main entry point of the application.
- The `src/index.js` file is responsible for rendering the root component (`App`) into the DOM.
- The `src/data.js` file contains the sample meetings data provided by the interviewer.


## Output of the code

<img width="218" alt="Screenshot 2023-06-29 at 4 48 03 AM" src="https://github.com/hritik2002/CalendarColumn-FE-Interview/assets/72138429/4ee0c292-9d69-4e0b-8d70-340f6baf656f">


## Running the Application

To run the application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running the command: `npm install`.
4. Start the development server by running the command: `npm start`.
5. Open your browser and visit `http://localhost:3000` to see the Google calendar rendering with the scheduled meetings.


## Blog Post

I have written a detailed blog post explaining the approach and implementation of this Google calendar's single column rendering solution using ReactJS. You can find the blog post [here](https://hritik2002.hashnode.dev/how-to-create-a-google-calendar-and-show-scheduled-meetings).

Feel free to explore the code, modify it according to your needs, and provide any feedback or suggestions.

Happy coding!
