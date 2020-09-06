import axios from 'axios'
import Constants from '../Shared/Util/Constants'

const instance = axios.create({
  baseURL: Constants.serverUrl
})

export default instance

