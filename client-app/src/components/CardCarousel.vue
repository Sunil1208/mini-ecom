<template>
    <div class="landing-page">
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-1">Welcome to our Shoe Store</h1>
            <h2 class="subtitle is-4">Find your perfect pair of shoes</h2>
            <b-button class="shop-now-button" size="is-large" outlined>
              Shop Now
            </b-button>
          </div>
        </div>
      </section>
  
      <section class="section">
        <div class="container">
          <h2 class="title is-2">Featured Shoes</h2>
  
          <b-carousel :autoplay="true" :indicator-inside="true" animation="slide">
            <b-carousel-item v-for="shoe in shoes" :key="shoe.id">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img :src="shoe.image" :alt="shoe.name">
                  </figure>
                </div>
                <div class="card-content">
                  <p class="title is-4">{{ shoe.name }}</p>
                  <p class="subtitle is-6">Price: {{ shoe.price }}</p>
                  <div class="buttons">
                    <b-button outlined size="is-small" @click="addToCart(shoe)">
                      Add to Cart
                    </b-button>
                    <b-button outlined size="is-small" @click="addToWishlist(shoe)">
                      Add to Wishlist
                    </b-button>
                  </div>
                </div>
              </div>
            </b-carousel-item>
          </b-carousel>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        shoes: [
        {
          id: 1,
          name: 'Shoe Name 1',
          price: '$99',
          image: 'https://media.gq-magazine.co.uk/photos/623dee834afc76863dc11b31/16:9/w_2560%2Cc_limit/250322_Trainers_01.jpg'
        },
        {
          id: 2,
          name: 'Shoe Name 2',
          price: '$129',
          image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c066bbc4-8b68-48b6-bebd-2191d001a973/air-force-1-high-07-shoes-RMCnpZ.png'
        },
        {
          id: 3,
          name: 'Shoe Name 3',
          price: '$89',
          image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/53a1614a-a5fd-4bfe-977e-6921451ed50e/air-force-1-react-mens-shoes-WSjfs8.png'
        }
        ]
      };
    },
    methods: {
      addToCart() {
        // Add logic to handle adding the shoe to the cart
      },
      addToWishlist() {
        // Add logic to handle adding the shoe to the wishlist
      }
    }
  };
  </script>
  
  <style>
.landing-page {
  background-color: #f5f5f5;
}

.hero {
  background-image: url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
  background-size: cover;
  background-position: center center;
}

.title {
  color: #ffffff;
  margin-bottom: 20px;
}

.subtitle {
  color: #ffffff;
  margin-bottom: 40px;
}

.shop-now-button {
  margin-top: 40px;
}

.card {
  margin-bottom: 20px;
  position: relative;
  perspective: 1000px;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  transform-style: preserve-3d;
}

.card-content:hover {
  transform: rotateY(10deg) scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-content:before {
  content: '';
  position: absolute;
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  z-index: -1;
}

.card-content:after {
  content: '';
  position: absolute;
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  /* z-index: -2; */
}

.card-image {
  position: relative;
  height: 0;
  padding-top: 75%;
}

.card-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.buttons b-button {
  flex: 1;
}

@media screen and (min-width: 768px) {
  .hero {
    background-attachment: fixed;
  }

  .card-content:hover {
    transform: rotateY(10deg) scale(1.1);
  }
}
</style>
