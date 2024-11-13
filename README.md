# Map Attack Remastered

**Play [Map Attack](https://mapattackre.netlify.app/)**

### About

This is yet another remastered version of one of my original bootcamp projects, "Map Attack." The goal is simple: save five countries to win! You start with three guesses, and each incorrect guess results in the loss of a country. Good luck and have fun!

### Recent Updates

1. Refactored Code: Functions were broken down into modular components instead of using one large function with first-class functions.
2. Improved UI Feedback: Enhanced feedback for users, including better handling of singular/plural messages.
3. CSS Enhancements: Cleaned up styles and improved responsiveness using Flexbox and CSS Grid.
4. Updated HTML Structure: Refined HTML element naming for better readability and maintenance.
5. API Key Handling: Moved Google Maps API handling to a `.env` file.

### Running the Project Locally

To run this project locally, follow these steps:

1. Clone the Repository
   <br>
   Run the following command in your terminal to clone the repository:
   <br>
   `git clone https://github.com/angelr1076/MapAttackRemastered.git`
2. Install Node.js
   <br>
   Make sure you have Node.js installed.

3. Install Dependencies
   <br>
   Navigate to the project directory and install dependencies by running:
   <br>
   `npm install`
4. Set Up Environment Variables
   <br>
   Create a `.env` file in the root folder to securely manage your Google Maps API key. Add the following line to your `.env` file:
   <br>
   `GOOGLE_MAPS_API_KEY=your-google-maps-api-key`

5. Run the Game
   To start the game locally, use the following command:
   `npm run dev`
   This will start the server on http://localhost:3000 using nodemon to monitor changes and auto-restart the server.

6. Deploying the Game
   The game uses a Node.js server and runs on port 3000 locally. Make sure your `.env` file contains your API key before deploying. If you don’t have a Google Maps API key, get one from Google Maps API key site.

### Screenshots

### Additional Notes

Remember to add your Google Maps API key in the .env file. Without it, the map will not render properly. Also, don't forget to add your `.env` file to your `.gitignore` file so you don't accidentally make your API key visible in your github repository.
For production deployments, ensure your environment variables are configured to securely pass the API key to the application.
If you’d like to restart the game without refreshing, use the “Play Again” button on the modal after each game.
