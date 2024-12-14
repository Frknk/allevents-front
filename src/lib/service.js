import axios from 'axios';

const API={}
API.baseURL =  'http://localhost:8080/api'


const ServerConnection = (() => {
	const events = {
		// @ts-ignore
		list:(params) => {
			return axios.get(`${API.baseURL}/transaction/public/events`, {params})
		}
	}

	const category = {
		list:() => {
			return axios.get(`${API.baseURL}/transaction/categories`)
		}
	}

	const auth = {

	}

	return {events,category, auth}
})();

export default ServerConnection;