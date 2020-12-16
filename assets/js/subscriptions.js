// Imports
const { map, debounceTime } = rxjs.operators;

// Search Term Subscription
search
  .pipe(
    debounceTime(500),
    map((event) => event.target.value)
  )
  .subscribe((searchTerm) => {
    products.next([
      ...productsRef.filter(
        (product) =>
          product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ||
          product.id.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
      ),
    ]);
  });

// Products Subscription
products.subscribe((products) => {
  const tbodyHtml = products
    .filter((product) => product.count > 0)
    .map(
      (product) => `
        <tr>
          <td class="capitalize">${product.id}</td> <td>${product.name}</td>
          <td>${product.unitPrice}</td>
          <td>${product.count}</td>
          <td>
          <button class="add_one_item waves-effect waves-light btn" data-id="${product.id}">
            <i class="material-icons">add</i>
          </button>
          </td>
        </tr>
                `
    )
    .join("");
  tbodyElement.innerHTML = tbodyHtml;
});

// Sales Subscription
sales.subscribe((sales) => {
  if (sales.length > 0) {
    salesBadge.innerText = sales.length;
    salesBadge.style.display = "flex";
  } else {
    salesBadge.style.display = "none";
  }
  const tbodyHtml = sales
    .map(
      (sale) => `
        <tr>
            <td>${sale.name}</td>
            <td>${sale.unitPrice}</td>
            <td>${sale.saleCount}</td>
            <td>${sale.unitPrice * sale.saleCount}</td>
        </tr>
        `
    )
    .join("");
  invoiceTbody.innerHTML = tbodyHtml;
});

{
  /* <button class="waves-effect waves-light btn red"> */
}
{
  /*   <i class="material-icons">filter_9_plus</i> */
}
{
  /* </button> */
}
