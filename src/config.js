export default {
  // API_ENDPOINT: 'https://red-sorry-32572.herokuapp.com/api',
  // API_ENDPOINT_LOCAL: 'http://localhost:8000/api',
  API_ENDPOINT: process.env.REACT_APP_NODE_ENV === 'development' 
    ? process.env.REACT_APP_PROD_API_KEY 
    : process.env.REACT_APP_LOCAL_API_KEY
}
