  <template>
    <div class="landing-page">
      <section class="hero is-fullheight">
        <div class="hero-background"></div>
        <div class="hero-content">
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
            <card-carousel />
        </div>
      </section>
    </div>
  </template>

<script>
import CardCarousel from "@/components/CardCarousel.vue";

export default {
    comments: {
        "card-carousel": CardCarousel,
    },
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
      // Add logic to handle adding product to the cart
    }
  }
};
</script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
  
  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  .landing-page {
    position: relative;
    overflow: hidden;
  }
  
  .hero {
    position: relative;
    overflow: hidden;
    height: 100vh;
  }
  
  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900');
    background-size: cover;
    background-position: center center;
    opacity: 0.6;
    z-index: -1;
    background-attachment: fixed; /* Add parallax effect */
  }
  
  .hero-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #ffffff;
    z-index: 1;
  }
  
  .title {
    margin-bottom: 20px;
  }
  
  .subtitle {
    margin-bottom: 40px;
  }
  
  .shop-now-button {
    margin-top: 40px;
  }
  

  @media (max-width: 768px) {
  .shoe-card {
    margin-bottom: 20px;
  }
}
  </style>
  
  
  
  