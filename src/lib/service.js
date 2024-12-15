import axios from 'axios';
import {User} from './UserStore';

const API={}
API.baseURL =  'http://localhost:8080/api'

let user;
let headers;
const unUser = User.subscribe((v) => {
  user = v;
  if (user != null) {
    headers = { Authorization: "Bearer " + user.token };
  }
});


const ServerConnection = (() => {
	const events = {
		// @ts-ignore
		list:(params) => {
			return axios.get(`${API.baseURL}/transaction/public/events`, {params})
		}
	}

	const category = {
		list:() => {
			return axios.get(`${API.baseURL}/transaction/public/categories`)
		}
	}

	const auth = {

	}

	return {events,category, auth}
})();

export default ServerConnection;