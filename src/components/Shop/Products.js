import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'YAMAHA R1',
    price: 40000,
    description: 'Achi Bike hai!',
  },
  {
    id: 'p2',
    title: 'SUZUKI HAYABUSA',
    price: 50000,
    description: 'Bohat achi bike hai!',
  },
  {
    id: 'p3',
    title: 'KAWASAKI H2R',
    price: 60000,
    description: 'Alaw bike hai!',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCTS.map(product => (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          ))
        }
      </ul>
    </section>
  );
};

export default Products;
