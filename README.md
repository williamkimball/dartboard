# DartBoard

DartBoard is a travel planning app that users can use as a central repository for information related to their travel plans.

## Technologies used:

- [React](https://reactjs.org/docs/getting-started.html)
- [JSON Server](https://github.com/typicode/json-server)
- [TravelPayouts API](https://www.travelpayouts.com/developers/api)
- [Unsplash API](https://unsplash.com/developers)
- [Bulma](https://bulma.io/)
- [Bloomer](https://bloomer.js.org/#/)
- [server.js for Node](https://serverjs.io/)
- [Airport Codes API](https://www.air-port-codes.com/airport-codes-api)

## Try it out yourself:

To run this project on your own machine, do the following (requires npm):

1.  Fork/download this GitHub repository
1.  Obtain API key from Unsplash (https://unsplash.com/developers) and paste on line 4 of src/apiItems/APIKeys.js
1.  Obtain API key from TravelPayouts (https://www.travelpayouts.com/developers/api) and paste on line 8 of src/apiItems/APIKeys.js
1.  Obtain API key from Airport Codes (https://www.air-port-codes.com/airport-codes-api) and paste on line 12 of src/apiItems/APIKeys.js
1.  Run `npm install` in your terminal from the project directory (found at `/dartboard`)
1.  Find and replace all instances of "https://www.dartboardtravel.com" with "http://localhotst:5002"
1.  Run `json-server -w src/Database/database.json -p 5002` from the project directory to start the server
1.  Run `npm start` from the project directory to open the React App
1.  Plan Away!
