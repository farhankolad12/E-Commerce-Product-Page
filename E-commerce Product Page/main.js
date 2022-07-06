const allImages = document.querySelectorAll(".preview");
const imgContainer = document.querySelector(".thumbnail");
const lightboxContainer = document.querySelector(".img-container-lightbox");
const removeBtn = document.getElementById("close-btn");
const previewLightboxImg = document.querySelectorAll(".preview-lightbox");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const inputNumber = document.querySelector(".quantity");
const addCartBtn = document.getElementById("add-cart");
const cartBtn = document.querySelector("#cart");
const mobileMenu = document.querySelector(".menu");
const cartContainer = document.querySelector(".cart-container");
const navMobile = document.querySelector(".nav-mobile");
const navMobileImg = document.querySelector(".nav-mobile img");
let nextCount = 1;
let prevCount = nextCount;

// Add CSS //
const addRule = (function (style) {
    var sheet = document.head.appendChild(style).sheet;
    return function (selector, css) {
        var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
            return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
        }).join(";");
        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
    };
})(document.createElement("style"));

// Show Img On Click //
const showImg = (img) => {
  for (let i = 0; i < allImages.length; i++) {
    allImages[i].classList.remove("active");
  }

  img.classList.add("active");
  const src = img.src;
  const newSrc = src.replace("-thumbnail", "");
  imgContainer.src = newSrc;
};

// Open Lighbox //
const openLightBox = () => {
  lightboxContainer.style.visibility = "visible";
  lightboxContainer.style.background = "rgba(0, 0, 0, 0.75)";
  nextBtn.parentElement.style.visibility = "visible";
  prevBtn.parentElement.style.visibility = "hidden";
};

// Remove Lightbox //
const removeBox = () => {
  lightboxContainer.style.visibility = "hidden";
  nextBtn.parentElement.style.visibility = "hidden";
  prevBtn.parentElement.style.visibility = "hidden";
};

// Show Next Img In Lightbox //
const nextImg = (e) => {
  const imgContainer = e.target.parentElement.parentElement.children[2];
  prevBtn.parentElement.style.visibility = "visible";
  nextCount++;
  const src = imgContainer.src;
  let newSrc = src.replace(
    `image-product-${nextCount - 1}`,
    `image-product-${nextCount}`
  );
  if (newSrc.match("image-product-4")) {
    imgContainer.src = newSrc;
    e.target.parentElement.style.visibility = "hidden";
    prevBtnMobile.parentElement.style.visibility = "visible";
    showImgLightbox(nextCount);
  } else {
    prevBtn.parentElement.style.visibility = "visible";
    prevBtnMobile.parentElement.style.visibility = "visible";
    nextBtnMobile.parentElement.style.visibility = "visible";
    imgContainer.src = newSrc;
    showImgLightbox(nextCount);
  }
};

// Show Previous Img in Lightbox //
const prevImg = (e) => {
  prevCount = nextCount--;
  const imgContainer = e.target.parentElement.parentElement.children[2];
  const src = imgContainer.src;
  let newSrc = src.replace(
    `image-product-${prevCount}`,
    `image-product-${prevCount - 1}`
  );

  if (newSrc.match("image-product-1")) {
    imgContainer.src = newSrc;
    e.target.parentElement.style.visibility = "hidden";
    nextBtnMobile.parentElement.style.visibility = "visible";
    showImgLightbox(prevCount - 1);
  } else {
    nextBtn.parentElement.style.visibility = "visible";
    prevBtnMobile.parentElement.style.visibility = "visible";
    nextBtnMobile.parentElement.style.visibility = "visible";
    imgContainer.src = newSrc;
    showImgLightbox(prevCount - 1);
  }
};

// Toggling Active Class In Lightbox //
const showImgLightbox = (count) => {
  previewLightboxImg.forEach((img) => {
    if (img.src.match(`image-product-${count}`)) {
      for (let i = 0; i < previewLightboxImg.length; i++) {
        previewLightboxImg[i].classList.remove("active");
      }

      img.classList.add("active");
    }
  });
};

// Adding Item To Cart //
const addToCart = (quantity) => {
  if (quantity == 0) {
    return;
  } else {
    localStorage.setItem("quantity", quantity);
    addRule('.cart::before', {
      display: 'flex',
      content: `${quantity}`
    })
    let output = `
        <h3>Cart</h3>
    <div class="cart-item">
      <img src="assets/images/image-product-1.jpg" class="cart-img" alt="Product">
      <div class="product-info">
        <p class="product-name">${
          document.body.clientWidth > "800"
            ? "Fall Limited Edition Sneakers"
            : "Fall Limited Editon..."
        }</p>
        <p class="price-product">$125.00 x ${quantity} <span>$${
      125 * quantity
    }.00</span></p>
      </div>
      <button>
        <img src="assets/icons/icon-delete.svg" class="del-product" alt="Delete Button">
      </button>
    </div>
    <button class="checkout-btn" id="btn">Checkout</button>
    `;
    cartContainer.innerHTML = output;
  }
};

// Showing Cart On Click //
const showCart = () => {
  cartContainer.style.display = "block";
  const cartItem = document.querySelector(".cart-item");
  const checkoutBtn = document.querySelector(".checkout-btn");
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart")) {
      cartContainer.style.display = "none";
    } else if (e.target.classList.contains("del-product")) {
      cartItem.innerHTML = "<p>Your Cart Is Empty</p>";
      localStorage.removeItem("quantity");
      checkoutBtn.remove();
      jss.set(`.cart::before`, {
        display: "none",
        content: "'",
      });
    } else if (e.target.classList.contains("checkout-btn")) {
      cartItem.innerHTML =
        "<p>Your Order is confirm you will recieve a mail shortly</p>";
      jss.set(`.cart::before`, {
        display: "none",
        content: "'",
      });
      localStorage.removeItem("quantity");
      checkoutBtn.remove();
    }
  });
};

// Plus Quantity //
const plusQuantity = () => {
  let quantity = +inputNumber.value;
  quantity++;
  inputNumber.value = quantity;
};

// Minus Quantity //
const minusQuantity = () => {
  let quantity = +inputNumber.value;
  if (quantity <= 0) {
    return;
  } else {
    quantity--;
    inputNumber.value = quantity;
  }
};

// Show Img On Clicking Thumbnail //
allImages.forEach((img) => {
  img.addEventListener("click", () => showImg(img));
});

// Loading Cart Items On Load //
const loadCartItems = () => {
  if (localStorage.getItem("quantity")) {
    addRule('.cart::before', {
      display: 'block',
      content: `${localStorage.getItem("quantity")}`
    })
    addToCart(+localStorage.getItem("quantity"));
  }
};

loadCartItems();

// Open Lightbox On Click //
imgContainer.addEventListener("click", openLightBox);

// Remove Lightbox On Click //
removeBtn.addEventListener("click", removeBox);

// Plus Number Of Quantity //
plusBtn.addEventListener("click", plusQuantity);

// Minus Number Of Quantity //
minusBtn.addEventListener("click", minusQuantity);

// Add To Cart //
addCartBtn.addEventListener("click", () => addToCart(+inputNumber.value));

// Show Cart //
cartBtn.addEventListener("click", showCart);

// In Desktop //
const nextBtn = document.querySelector(".next-lightbox #next-btn");
const prevBtn = document.querySelector(".prev-lightbox #prev-btn");
prevBtn.parentElement.style.visibility = "hidden";

prevBtn.addEventListener("click", (e) => prevImg(e));
nextBtn.addEventListener("click", (e) => nextImg(e));

// In Mobile //
const prevBtnMobile = document.getElementById("prev-btn");
const nextBtnMobile = document.getElementById("next-btn");
prevBtnMobile.parentElement.style.visibility = "hidden";

prevBtnMobile.addEventListener("click", (e) => prevImg(e));
nextBtnMobile.addEventListener("click", (e) => nextImg(e));

// Open Menu In Mobile //
mobileMenu.addEventListener("click", () => {
  navMobile.style.display = "block";
  navMobile.style.background = "rgba(0, 0, 0, 0.75)";
  navMobileImg.addEventListener("click", () => {
    navMobile.style.display = "none";
  });
});
