const {
    bhm_api,
    eurostore_api,
    villamart_api,
    izkotrading_api,
    gannamart_api,
    mustore_api,
    // orbitgeneraltradings_api
  } = require("../services/apiService");
  
  const searchProducts = async (req, res) => {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.redirect('/'); // Redirect to the error page or any other route you want
    }
  
    try {
      const [
        bhm,
        eurostore,
        villamart,
        izkotrading,
        gannamart,
        mustore,
        // orbitgeneraltradings,
      ] = await Promise.all([
        bhm_api(searchQuery),
        eurostore_api(searchQuery),
        villamart_api(searchQuery),
        izkotrading_api(searchQuery),
        gannamart_api(searchQuery),
        mustore_api(searchQuery),
        // orbitgeneraltradings_api(searchQuery),
      ]);
  
      let html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Search Results</title>
              <link rel="icon" href="https://www.recordedfuture.com/favicon.ico" />   
              <link rel="stylesheet" href="/styles.css">
          </head>
          <body>
              <header>
                  <img src="/store.svg" alt="Logo" class="responsive-image"/>
                  <form action="/search" method="get" class="search-form">
                      <input type="text" name="q" placeholder="" value="${searchQuery}">
                      <button type="submit">Search</button>
                  </form>
              </header>
              <main>
          `;
  
      if (bhm.data && bhm.data.length > 0) {
        html += renderProducts(
          ' <img src="https://store.bhmtraders.com/bhm-traders-logo.svg" width="50%" height="50%" alt="bhm">',
          bhm.data,
          (product) => `
                  <img src="${product.image}" alt="${product.description}">
                  <div class="product-info">
                  <div class="api-price"><h3>${product.units.CTN.price} /-</h3> </div>
                      <h3>${product.description}</h3>
                      <p>Brand: ${product.brand}</p>
                      <p>Inventory: ${product.inventory}</p>
                      <p>Status: ${product.status}</p>
                      <p>Available: ${product.available}</p>
                  </div>
              `
        );
      }
  
      if (eurostore.length > 0) {
        html += renderProducts(
          '<img src="https://www.eurostoremv.com/apple-touch-icon.png" width="20%" height="20%"  style="border-radius: 19%;" alt="euro store">',
          eurostore,
          (product) => `
                  <img src="https://www.eurostoremv.com/storage/images/${product.image}" alt="${product.name}">
                  <div class="product-info">
                  <div class="api-price"><h3>${product.price} /-</h3> </div>
                      <h3>${product.name}</h3>
                      <p>Stock: ${product.stock}</p>
                      <p>Status: ${product.status}</p>
                      <p>Category: ${product.category.name}</p>
                  </div>
              `
        );
      }
  
      if (villamart.data && villamart.data.length > 0) {
        html += renderProducts(
          '<img src="https://villamart.mv/_nuxt/img/vm_logo.8babdfa.svg" width="50%" height="50%"  alt="villa">',
          villamart.data,
          (product) => `
                  <img src="https://villamart.sgp1.cdn.digitaloceanspaces.com/site/products/${product.bc_item_number}.jpg" alt="${product.bc_item_number}">
                  <div class="product-info">
                  <div class="api-price"><h3>${product.bc_unit_price} /-</h3> </div>
                      <h3>${product.title}</h3>
                      <p>Inventory: ${product.bc_inventory}</p>
                      <p>In Stock: ${product.in_stock}</p>
                  </div>
              `
        );
      }
  
      if (izkotrading.products && izkotrading.products.length > 0) {
        html += renderProducts(
          '<img src="https://ikzotrading.com/assets/assets/image/app_logo.png" width="50%" height="50%"  alt="ikio">',
          izkotrading.products,
          (product) => `
                  <img src="https://me.ikzotrading.com/storage/app/public/product/${product.image[0]}" alt="${product.name}">
                  <div class="product-info">
                  <div class="api-price"><h3>${product.price} /-</h3> </div>
                      <h3>${product.name}</h3>
                      <p>Unit: ${product.unit}</p>
                      <p>In Stock: ${product.total_stock}</p>
                  </div>
              `
        );
      }
  

  
      if (mustore && mustore.length > 0) {
        html += renderProducts(
          '<img src="https://www.mustore.mv/web/image/website/1/logo/MU%20STORE?unique=676cd3a" width="50%" height="50%"  alt="ikio">',
          mustore,
          (product) => `
                  <img src="https://www.mustore.mv${product.image_url}"  width="30%" height="30%" alt="x">
                  <div class="product-info">
                  <div class="api-price"><h3>${product.detail} /-</h3> </div>
                      <h3>${product.name}</h3>
                  </div>
              `
        );
      }
  
      // if (orbitgeneraltradings.length > 0) {
      //   html += renderProducts(
      //     '<img src="https://www.orbitgeneraltradings.com/wp-content/uploads/2024/06/cropped-Orbit-Logo-1-199x93.png" width="20%" height="20%" alt=" store">',
      //     orbitgeneraltradings,
      //     (product) => `
      //               <img src="${product.images[0].src}" alt="${product.name}">
      //               <div class="product-info">
      //               <div class="api-price"><h3>${product.prices.price} /-</h3> </div>
      //                   <h3>${product.name}</h3>
      //               </div>
      //           `
      //   );
      // }
  
      if (gannamart.data && gannamart.data.products && gannamart.data.products.length > 0) {
        html += renderProducts(
          '<img src="https://play-lh.googleusercontent.com/Z2-spuF5YaGraiBmFLKJP6MOjhi0Ads2PPmpf-BOJDzXFuRsvWjxMsS7BJIKrhAJfuE=w240-h480-rw" style="border-radius: 19%;" width="20%" height="20%"  alt="gannamart"> <br/> <p> Gannamart App',
          gannamart.data.products,
          (product) => `
                  <img src="https://app.gannamart.com/api/attachables/${product.attachable.id}/download" alt="${product.name}">
                  <div class="product-info">
                  <div class="api-price"><h3>${product.display_price} /-</h3> </div>
                      <h3>${product.name}</h3>
                      <p>Unit: ${product.uom}</p>
                  </div>
              `
        );
      }
      html += `
              </main>
          </body>
          </html>
          `;
  
      res.send(html);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.redirect('/');
    }
  };
  
  const renderProducts = (apiUrl, products, renderProduct) => {
    let html = `
      <div class="api-section">
          <div class="api-url">
              <p>${apiUrl}</p>
          </div>
          <div class="product-list">
      `;
    products.forEach((product) => {
      html += `<div class="product-item">${renderProduct(product)}</div>`;
    });
    html += `</div></div>`;
    return html;
  };
  
  module.exports = {
    searchProducts,
  };
  
