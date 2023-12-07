class CartInfo extends HTMLElement {
    constructor() {
        super();
        this.myRoot = this.attachShadow({ mode: "open" });
        this.productList = JSON.parse(localStorage.getItem("productList"));
        this.total = 0;
        this.#Render();
    }

    connectedCallback() {    
        this.myRoot.querySelector("i").addEventListener("click" , () => {
            this.style.display = "none";
        }) 
        this.myRoot.getElementById("totalItems").innerText = this.productList.length;
        this.myRoot.getElementById("totalPrice").innerText = this.getTotalPrice();
    }


    addToCart = function(product) {
        this.productList.push(product);
        localStorage.setItem("productList" , JSON.stringify(this.productList));
        console.log(this.productList);
        console.log(localStorage);
        this.#Render();
        document.getElementById("totalProduct").innerText = this.productList.length;
        this.myRoot.getElementById("totalItems").innerText = this.productList.length;
        this.myRoot.getElementById("totalPrice").innerText = this.getTotalPrice();
    }

    deleteItem = function(product) {
        this.productList.pop(product);
        localStorage.setItem("productList" , JSON.stringify(this.productList));
        console.log(this.productList);
        console.log(localStorage);
        this.#Render();
        document.getElementById("totalProduct").innerText = this.productList.length;
        this.myRoot.getElementById("totalItems").innerText = this.productList.length;
        this.myRoot.getElementById("totalPrice").innerText = this.getTotalPrice();
    }

    getTotalPrice = function() {
        let totalPrice = 0;
        for(let item of this.productList) {
            totalPrice += parseInt(item?.price);
        }
        return totalPrice;
    }

    renderCartProduct = function() {
        for(let product of this.productList) {
            const addedProduct = <added-product name="${product?.productName}" price="${product?.price}" count="1" img="${product?.productImage}"></added-product>
            this.myRoot.querySelector("#productContainer").insertAdjacentHTML("beforeend" , addedProduct);
        }
    }

    #Render() {
        this.myRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <section id="templateSectionId" class="templateSection">
            <section class="mainCart">
                <article class="headerContainer">
                <h2>Таны сагс</h2>
                <i style="color: black;" id="closer" class="fa-solid fa-xmark fa-lg"></i>
                </article>
                    <article>  
                        <div style="display: flex">Барааны тоо: <p id="totalItems">${this.productList.length}</p></div>
                        <div style="display: flex">Нийт үнэ: <p id="totalPrice"> 0 </p> </div> 
                    </article>
                <section id="productContainer">

                </section>

            </section>
        </section>

        <style scoped>
            * {
                margin: 0;
                padding: 0;
            }


            .templateSection {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: end;
                color: black;
                & .headerContainer {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    padding-top: 64px;
                    & i {
                        cursor: pointer;
                        padding: 24px 16px;
                        border-radius: 16px;
                    }
                    & i:hover {
                        background-color: antiquewhite;
                    }
                }
            }

            .mainCart {
                height: 100vh;
                overflow-y: scroll;
                position: fixed;
                padding: 16px;
                background-color: aqua;
                z-index: 4;
                width: 400px;
                & h2 {
                    text-align: center;
                }
            }

            .cartContainer {
                display: flex;
                margin: 32px 0px;
                & img {
                    width: 200px;
                }

                & .dataContainer {
                    margin-left: 32px;
                    & p {
                        margin: 16px 0px;
                    }
                }
            }
        </style>
    `;
    this.myRoot.querySelector("i").addEventListener("click" , () => {
        this.style.display = "none";
    }) 
    this.renderCartProduct();
    }

    // closeCartSection = function() {
    //     console.log(document.getElementsByClassName("templateSection"))
    // }
}   

window.customElements.define("cart-info", CartInfo);