import axios from 'axios';

function yahooYQLUrl(ticker) {
  return `https://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22${[ticker].join('+')}%22%29&env=store://datatables.org/alltableswithkeys&format=json`;
}

export default function validStock(ticker) {
  return axios.get(yahooYQLUrl(ticker)).then(response => {
    return response.data.query.results.quote;
  });
}

