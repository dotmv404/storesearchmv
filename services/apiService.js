const axios = require("axios");

const bhm_api = async (searchQuery) => {
  const apiUrl = `https://connect.bhmtraders.com/api/shop/male/products?page=1&search=${searchQuery}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

const eurostore_api = async (searchQuery) => {
  const apiUrl = "https://www.eurostoremv.com/api/public/products";
  const response = await axios.get(apiUrl);
  const products = response.data.data;
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

const villamart_api = async (searchQuery) => {
  const apiUrl = `https://base.villamart.mv/api/products?q=${searchQuery}&page=1&limit=5`;
  const response = await axios.get(apiUrl);
  return response.data;
};

const izkotrading_api = async (searchQuery) => {
  const apiUrl = `https://me.ikzotrading.com/api/v1/products/search?limit=10&offset=1&name=${searchQuery}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

const gannamart_api = async (searchQuery) => {
  const apiUrl = `https://app.gannamart.com/api/mobile/search?search=${searchQuery}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

const mustore_api = async (searchQuery) => {
  const apiUrl = "https://www.mustore.mv/website/dr_search";

  const headers = {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    priority: "u=1, i",
    "sec-ch-ua":
      '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
  };

  const body = {
    id: 3,
    jsonrpc: "2.0",
    method: "call",
    params: {
      term: searchQuery,
      max_nb_chars: 80,
      options: {
        displayImage: true,
        displayDescription: true,
        allowFuzzy: true,
        order: "name asc",
      },
    },
  };

  try {
    const response = await axios.post(apiUrl, body, {
      headers: headers,
      referrer: "https://www.mustore.mv/theme_prime/get_products_data",
      referrerPolicy: "strict-origin-when-cross-origin",
      mode: "cors",
      withCredentials: true,
    });

    return response.data.result.products.results;
  } catch (error) {
    console.error("Error making request", error);
  }
};

// const orbitgeneraltradings_api = async (searchQuery) => {
//   const apiUrl =
//     "https://www.orbitgeneraltradings.com/wp-json/wc/store/v1/products";
//   const response = await axios.get(apiUrl);
//   const products = response.data;
//   return products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
// };

module.exports = {
  bhm_api,
  eurostore_api,
  villamart_api,
  izkotrading_api,
  gannamart_api,
  mustore_api,
  // orbitgeneraltradings_api,
};
