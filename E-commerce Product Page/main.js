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

let cartQuantity;

let nextCount = 1;

var addRule = (function (style) {
  var sheet = document.head.appendChild(style).sheet;
  return function (selector, css) {
    var propText =
      typeof css === "string"
        ? css
        : Object.keys(css)
            .map(function (p) {
              return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
            })
            .join(";");
    sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
  };
})(document.createElement("style"));

// Show Img On Click //
const showImg = (img, allImages, imgContainer) => {
  for (let i = 0; i < allImages.length; i++) {
    allImages[i].classList.remove("active");
  }

  img.classList.add("active");
  const src = img.src;
  const newSrc = src.replace("-thumbnail", "");
  imgContainer.src = newSrc;
};

const openLightBox = () => {
  lightboxContainer.style.visibility = "visible";
  lightboxContainer.style.background = "rgba(0, 0, 0, 0.75)";
  nextBtn.parentElement.style.visibility = "visible";
  prevBtn.parentElement.style.visibility = "hidden";
};

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

let prevCount = nextCount;

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

const addToCart = (quantity) => {
  if (quantity == 0) {
    return;
  } else {
    cartQuantity = localStorage.setItem("quantity", quantity);
    document.body.clientWidth > "800"
      ? addRule(`.cart::before`, {
          position: "absolute",
          top: "3rem",
          right: "10.5rem",
          display: "flex",
          "justify-content": "center",
          "align-item": "center",
          width: "15px",
          height: "15px",
          background: "hsl(26, 100%, 55%)",
          "border-radius": "50%",
          color: "white",
          "font-size": "10px",
          content: `${quantity}`,
          "z-index": "-1",
        })
      : addRule(`.cart::before`, {
          position: "relative",
          top: "0.5rem",
          right: "-0.35rem",
          display: "flex",
          "justify-content": "center",
          "align-item": "center",
          width: "15px",
          height: "15px",
          background: "hsl(26, 100%, 55%)",
          "border-radius": "50%",
          color: "white",
          "font-size": "10px",
          "z-index": "-1",
          content: `${quantity}`,
        });

    let output = `
        <h3>Cart</h3>
    <div class="cart-item">
      <img src="assets/images/image-product-1.jpg" class="cart-img" alt="Product">
      <div class="product-info">
        <p class="product-name">${
          document.body.clientWidth > "800"
            ? "Fall Limited Edition Sneakers"
            : "Fall Limited..."
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

    if (document.body.clientWidth < "800") {
      document.querySelector(".cart-container").style.padding = "20px";
      document.querySelector(".cart-container").style.maxWidth = "350px";
      document.querySelector(".cart-container").style.width = "350px";
      document.querySelector(".cart-container").style.height = "300px";
      document.querySelector(".cart-container").style.top = "5rem";
      document.querySelector(".cart-container").style.right = "0.7rem";
    }
    document.querySelector(".cart-container").innerHTML = output;
  }
};

const showCart = () => {
  document.querySelector(".cart-container").style.display = "block";
  /*   setTimeout(() => { */
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart")) {
      document.querySelector(".cart-container").style.display = "none";
    } else if (e.target.classList.contains("del-product")) {
      document.querySelector(".cart-item").innerHTML =
        "<p>Your Cart Is Empty</p>";
      localStorage.removeItem("quantity");
      document.querySelector(".checkout-btn").remove();
      addRule(`.cart::before`, {
        display: "none",
        content: "'",
      });
    } else if (e.target.classList.contains("checkout-btn")) {
      document.querySelector(".cart-item").innerHTML =
        "<p>Your Order is confirm you will recieve a mail shortly</p>";
      addRule(`.cart::before`, {
        display: "none",
        content: "'",
      });
      localStorage.removeItem("quantity");
      document.querySelector(".checkout-btn").remove();
    }
  });
  /*   }, 100); */
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

allImages.forEach((img) => {
  img.addEventListener("click", () => showImg(img, allImages, imgContainer));
});

if (localStorage.getItem("quantity")) {
  addRule(`.cart::before`, {
    position: "absolute",
    top: "3rem",
    right: "10.3rem",
    display: "flex",
    "justify-content": "center",
    "align-item": "center",
    width: "15px",
    height: "15px",
    background: "hsl(26, 100%, 55%)",
    "border-radius": "50%",
    color: "white",
    "font-size": "10px",
    content: `${localStorage.getItem("quantity")}`,
  });
  addToCart(+localStorage.getItem("quantity"));
}

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
  document.querySelector(".nav-mobile").style.display = "block";
  document.querySelector(".nav-mobile").style.background =
    "rgba(0, 0, 0, 0.75)";
  document.querySelector(".nav-mobile img").addEventListener("click", () => {
    document.querySelector(".nav-mobile").style.display = "none";
  });
});
