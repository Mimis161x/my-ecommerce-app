const str = "You have no notifications!";
function notify() {
  alert(str);

}

const navmenu = document.querySelector("nav");

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => appendProducts(data))
  .then(data => data.sort((a, b) => a.price - b.price))
  .then(data => changeProducts(data))



function changeProducts(data) {
  const contain = document.getElementById("container");
  const selector = document.getElementsByClassName("price-selector")[0];
  selector.addEventListener("change", () => {

    if (selector.value == "descending-price") {
      removeAllChildNodes(contain);
      appendProducts(data);
      contain.style.flexFlow = "row-reverse wrap-reverse";
    }
    else if (selector.value == "ascending-price") {
      removeAllChildNodes(contain);
      appendProducts(data);
      contain.style.removeProperty("flex-flow");
    }
    else {
      contain.style.removeProperty("flex-flow");
      removeAllChildNodes(contain);
      appendProducts(defaultArray);
    }
  })
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function appendProducts(productsArray) {
  for (var key in productsArray) {

    var prod_img = productsArray[key].image;
    var title = productsArray[key].title;
    var price = productsArray[key].price;
    var desc = productsArray[key].description;
    var badge = document.createElement('div');
    badge.className = 'badge';
    badge.innerHTML =
      '<img class ="prodimg" src=' + prod_img + '>' +
      '<h1>' + title + '</h1>' +
      '<h2 class="desc_txt">' + desc + '</h1>' +
      '<div class="options>' +
      '<button class="service-provider-call" href="#" target="_blank"> ' + price + '</button>';
    document.getElementById("container").appendChild(badge);
  }
}