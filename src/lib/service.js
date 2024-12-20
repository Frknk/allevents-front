import axios from 'axios';
import { User } from './UserStore';
import { data } from 'autoprefixer';

const API = {}
API.baseURL = 'http://localhost:8080/api'
API.authURL = 'http://allevents-api-users-liw9tx-484dfb-4-246-226-22.traefik.me/api'
API.eventsURL = 'http://allevents-api-events-qgtx1u-fcb737-4-246-226-22.traefik.me/api'

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
		list: (params) => {
			return axios.get(`${API.eventsURL}/transaction/public/events`, { params })
		}
	}

	const category = {
		list: () => {
			return axios.get(`${API.eventsURL}/transaction/public/categories`)
		}
	}

	const login = (data) => {
		return axios.post(`${API.authURL}/auth/login`, data)
		/*data format 
		
		{
		"email": "frank1@email.com",
		"password": "frank123"
		}
		
		*/
	}

	const register = (data) => {
		return axios.post(`${API.authURL}/auth/register`, data)
		/*data format 
		
		{
  		"firstName": "Frank",
  		"lastName": "Rivera",
  		"identityNumber": "77433136",
  		"email": "frank1@email.com",
  		"password": "frank123",
  		"repassword": "frank123"
	}
		*/
	}

	return { events, category, login, register }
})();

export default ServerConnection;