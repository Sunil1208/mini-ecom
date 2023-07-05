<!-- <template>
    <div class="container">
      <header class="jumbotron">
        <h3>{{ content }}</h3>
      </header>
    </div>
  </template>
  
  <script>
  import UserService from "../services/user.service";
  
  export default {
    name: "BoardUserView",
    data() {
      return {
        content: "",
      };
    },
    mounted() {
      UserService.getUserBoard().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
  };
  </script>
   -->


   <template>
    <div class="product-page">
      <div class="product-grid">
        <div v-for="shoe in shoes" :key="shoe.id" class="product-card">
          <b-card class="card">
            <div class="card-image">
              <img :src="shoe.image" alt="Shoe Image" class="product-image">
            </div>
            <div class="card-content">
              <p class="title is-5">{{ shoe.name }}</p>
              <p>{{ shoe.description }}</p>
              <p class="subtitle is-6">Price: {{ shoe.price }}</p>
            </div>
            <div class="card-footer">
              <b-button outlined size="is-small" @click="addToCart(shoe)">
                Add to Cart
              </b-button>
              <b-button outlined size="is-small" @click="addToWishlist(shoe)">
                Add to Wishlist
              </b-button>
            </div>
          </b-card>
        </div>
      </div>
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
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: 'https://media.gq-magazine.co.uk/photos/623dee834afc76863dc11b31/16:9/w_2560%2Cc_limit/250322_Trainers_01.jpg'
          },
          {
            id: 2,
            name: 'Shoe Name 2',
            price: '$129',
            description: 'Pellentesque ac justo ut dui fringilla tempor.',
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c066bbc4-8b68-48b6-bebd-2191d001a973/air-force-1-high-07-shoes-RMCnpZ.png'
          },
          {
            id: 3,
            name: 'Shoe Name 3',
            price: '$89',
            description: 'Sed consectetur sem et nunc lacinia finibus.',
            image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/53a1614a-a5fd-4bfe-977e-6921451ed50e/air-force-1-react-mens-shoes-WSjfs8.png'
          }
        ]
      };
    },
    methods: {
      addToCart(shoe) {
        // Add logic to handle adding shoe to the cart
        console.log('Added to Cart:', shoe.name);
      },
      addToWishlist(shoe) {
        // Add logic to handle adding shoe to the wishlist
        console.log('Added to Wishlist:', shoe.name);
      }
    }
  };
  </script>
  
  <style scoped>
  .product-page {
    margin-top: 20px;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
  }
  
  .product-card {
    display: flex;
    justify-content: center;
  }
  
  .card {
    width: 100%;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .card-image {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .product-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
  }
  </style>
  