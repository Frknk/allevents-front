import axios from 'axios';

const API={}
API.baseURL =  'http://localhost:8080/api'


const ServerConnection = (() => {
	const events = {
		// @ts-ignore
		list:(params) => {
			return axios.get(`${API.baseURL}/transaction/events`, {params})
		}
	}

	const category = {
		list:() => {
			return axios.get(`${API.baseURL}/transaction/categories`)
		}
	}

	return {events,category}
})();

export default ServerConnection;