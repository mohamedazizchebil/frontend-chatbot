(function () {
  const button = document.createElement('div');
  button.innerHTML = '💬';
  button.style = `
    position: fixed; bottom: 20px; right: 20px;
    background: #007bff; color: white;
    padding: 12px; border-radius: 50%; cursor: pointer;
    z-index: 9999;
  `
  document.body.appendChild(button);

  let iframe;

  button.onclick = () => {
    if (iframe) {
      iframe.remove();
      iframe = null;
    } else {
      iframe = document.createElement('iframe');
      iframe.src = 'https://monchatbot.vercel.app/widget?appId=ecommerce-site&pageType=produit&productId=123&productName=Super%20Widget';
      iframe.style = `
        position: fixed; bottom: 80px; right: 20px;
        width: 400px; height: 520px; border: none;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        border-radius: 10px;
        z-index: 9999;
      `;
      document.body.appendChild(iframe);
    }
  };
})();
