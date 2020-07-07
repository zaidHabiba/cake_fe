import axios from 'axios';
export const BASE_URL = "http://localhost:8000";
export const DEPLOY_URL = "https://cakebe.herokuapp.com";
export default axios.create({
    baseURL: DEPLOY_URL
});