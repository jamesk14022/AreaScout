# Areascout
## About

- Using data gathered from OpenDataNI to help people living in Northern Ireland make better decisions about where to live. 
- Partial addresses/postcodes entered are approximated to a latitude/longitude value using the GoogleMaps API. 


## How to Use

- The project uses 'dotenv' to handle private keys, ensure you have a .env file in the project root with your 'MONGODB_URI' & 'REACT_APP_MAPS_API_KEY' keys set. 
- Clone the Github repository and navigate to the project root
- To run the application with Serverside rendering enabled, open terminal and type 'npm run-script build' and then 'npm run-script serve' in the root directory. The application will be running on the port defined by 'process.env.PORT' or 3000 if that variable is not defined. 


## Tech
- Uses Node.JS, MongoDB and Server Side rendered React to deliver pages. 
- The client is built using React.JS
- Data is gathered in the form of JSON files from OpenDataNI, then parsed into a more readable format and stored on the MongoDb server. Addresses are converted to latitude/longitude using the GMaps API and stored as GeoJSON values for easier distance comparisons. 



