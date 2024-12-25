import axios from 'axios';
import { User } from './UserStore';
import { data } from 'autoprefixer';

const API = {}
API.baseURL = 'http://localhost:8080/api'
API.authURL = 'http://allevents-api-users-rrrlhz-182cd0-149-56-46-214.traefik.me/api'
API.eventsURL = 'http://allevents-api-users-eyu8wy-f59b9e-149-56-46-214.traefik.me/api'

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

	const getEvent = (id) => {
		const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;
		return axios.get(`${API.eventsURL}/transaction/events/${id}`, {
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				'accept': '*/*'
			}
		});
	}

	const updateUser = (id, userData) => {
		const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;
		return axios.put(`${API.authURL}/user/${id}`, userData, {
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				'accept': '*/*'
			}
		});
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

	return { events, category, login, register, updateUser, getEvent }
})();

export default ServerConnection;