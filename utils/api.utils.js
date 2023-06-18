import axios from "axios";

const HOST = 'http://172.27.17.68';
const PORT = 8000;
const VERSION = 1;

export async function fetchAPI(url, body, method) {
  try {
    const data = await axios({
      method: method,
      url: `${HOST}:${PORT}/v${VERSION}/${url}`,
      data: body
    });

    const { payload } = data.data;

    return payload;
  } catch (error) {
    return false;
  }
}
