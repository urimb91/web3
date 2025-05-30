import axios from "axios";
import env from "../environments";

const platformAPIClient = axios.create({
  baseURL: env.platform_api_url,
  timeout: 20000,
  headers: { 'Authorization': `Key ${env.SBXZBOFZJPVIFUJY6DGMFUOZ5SXJ7BTETDOUCNZ3PPD4H6GVUCOW662Z}` }
});

export default platformAPIClient;
