import cronJob from 'node-cron';

const API_ENDPOINT: string = process.argv.slice(2)[1]; //!ex --URL http://localhost:5173

if (!API_ENDPOINT && API_ENDPOINT.startsWith('http')) {
  throw new Error('Please Provide Valid Arguments');
}

const sendRequestToServer = (): void => {
  fetch(`${API_ENDPOINT}/api/v1/health`)
    .then(() => console.log('Server is Running'))
    .catch((err) => console.log(err));
};

cronJob.schedule('* 13 * * *', () => sendRequestToServer());
