import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { fetchCategoriesAndProducts } from './modules/categories';
import { fetchProducts, toogleProductDescriptionVisibility, fetchProductsFilter } from './modules/products';
import './Home.css';

  class Home extends React.Component {

    handleClickSelectCategory = (categoryId) => {
        this.props.fetchProducts(categoryId);
    }
   
    handleClickExpandDescription = (index) => {
        this.props.toogleProductDescriptionVisibility(index);
    }

    handleSearch = (searchValue) => {
        this.props.fetchProductsFilter(searchValue);
    }

    componentWillMount() {
        if(this.props.categories.length === 0) {
            this.props.fetchCategoriesAndProducts();
        }
    }

    render() {
        return (
            <div>
                <div className="categoriesWrapper">
                { 
                    this.props.categories.map(c => (
                        <div
                            key={ c.id } 
                            data-key={ c.id }
                            className={ classnames({
                                'categoryTitle': true,
                                'selected': this.props.selectedCategory === c.id,
                                }) } 
                            onClick={ () => this.handleClickSelectCategory(c.id) } 
                            selected={this.props.selectedCategory === c.id}>
                            { c.title }
                        </div>
                    ))
                }
                </div>
                <input type="search" size="45" 
                    value= { this.props.searchValue }
                    onInput={ (e) => this.handleSearch(e.target.value) } />
                <div className="productList">
                {
                    this.props.visibleProducts.map((p, i) => (  
                        <div key={p.id}  className="productWrapper">
                            <p onClick={ () => this.handleClickExpandDescription(i)}
                                className={ `productTitle ${this.props.toogleProductDescription[i] ? 'selected' : ''}`}
                            >{ p.title }</p>
                            <p className={  `productDescription ${this.props.toogleProductDescription[i] ? 'show' : 'hide'}`}> 
                                { p.description } 
                            </p>
                        </div>
                    ))
                }
                </div>
        </div>
        );
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    categories: state.categories.categories,
    isFetchingCategories: state.categories.isFetchingCategories,
    errorFetchingCategories: state.categories.errorFetchingCategories,
    products: state.products.products,
    visibleProducts: state.products.visibleProducts,
    isFetchingProducts: state.products.isFetchingProducts,
    errorFetchingProducts: state.products.errorFetchingProducts,
    selectedCategory: state.products.selectedCategory,
    toogleProductDescription: state.products.toogleProductDescription,
    searchValue: state.products.searchValue,
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProducts,
    fetchProductsFilter,
    fetchCategoriesAndProducts,
    toogleProductDescriptionVisibility,
  }, dispatch)
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)