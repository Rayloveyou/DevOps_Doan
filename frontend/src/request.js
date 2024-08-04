import axios from 'axios';

const baseURL = 'http://canteen.datnxdevops.site';

export default axios.create({
    baseURL: baseURL
});