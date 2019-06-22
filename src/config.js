let apiPath;
// if (process.env.NODE_ENV === 'production') {
//   apiPath = "https://verdi-petful-api.herokuapp.com/api"
// } else {
// }
apiPath = 'http://localhost:8000/api'

export default {
  REACT_APP_API_BASE: apiPath
}