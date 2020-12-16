// Initialize a Modal
$(document).ready(function () {
  $(".modal").modal();
});

// Add Product to Sales
$(document).on("click", ".add_one_item", (e) => {
  const product = productsRef.find(
    (product) => product.id === e.target.dataset.id
  );
  const sale = salesRef.find((sale) => sale.id === product.id);
  if (sale) {
    sale.saleCount = sale.saleCount + 1;
    salesRef = salesRef.map((sr) => (sr.id === sale.id ? sale : sr));
  } else {
    product.saleCount = 1;
    salesRef.push(product);
  }
  product.count = product.count - 1;
  productsRef = productsRef.map((pd) => (pd.id === product.id ? product : pd));
  sales.next(salesRef);
  products.next(productsRef);
});

const template = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>

    <!--Import Google Icon Font-->
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <!--Import materialize.css-->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
    />

    <link rel="stylesheet" href="assets/css/master.css" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
</head>
<body>
   ${content} 
</body>
</html>
`;

function printDiv() {
  const divContents = document.querySelector(".modal-content").innerHTML;
  document.querySelector("#print").innerHTML = divContents;
  window.print();
  document.querySelector("#print").innerHTML = "";
}

$(document).on("click", ".modal-close.cancel", () => {
  salesRef.forEach((sale) => {
    productsRef = productsRef.map((product) =>
      product.id === sale.id
        ? { ...product, count: product.count + sale.saleCount }
        : product
    );
  });
  salesRef = [];
  sales.next(salesRef);
  products.next(productsRef);
});

$(document).on("click", ".modal-close.print", () => {
  printDiv();
  salesRef = [];
  sales.next(salesRef);
});
