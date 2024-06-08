const API_ENDPOINT: string = process.env.API_ENDPOINT || 'http://localhost:3008';

if (!API_ENDPOINT && API_ENDPOINT.startsWith('http')) {
  throw new Error('Please Provide Valid Arguments');
}

const sendRequestToServer = (): void => {
  fetch(`${API_ENDPOINT}/api/v1/health`)
    .then(() => console.log('Server is Running'))
    .catch((err) => console.log(err));
};

export default sendRequestToServer;
