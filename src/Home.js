import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCategoriesAndProducts } from './modules/categories';
import { fetchProducts } from './modules/products';
import './Home.css';
import classNames from 'classnames';

  class Home extends React.Component {

    handleOnClick(e, categoryId) {
        this.props.fetchProducts(categoryId);
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
                                className={ classNames({
                                    'categoryTitle': true,
                                    'selected': this.props.selectedCategory === c.id,
                                    }) } 
                                onClick={ (e) => this.handleOnClick(e, c.id) } 
                                selected={this.props.selectedCategory === c.id}>
                                { c.title }
                            </div>
                        ))
                    }
                    </div>
                    {
                        this.props.products.map(p => (
                            <p key={p.id} >{ p.title }</p>
                        ))
                    }
                    
                <p><button onClick={() => this.props.changePage()}>Go to about page via redux</button></p>
            </div>
          );
      }
  }

  const mapStateToProps = (state, ownProps) => ({
    //id: ownProps.params.id,
    //filter: ownProps.location.query.filter,

    selectedCategory: state.categories.selectedCategory,
    categories: state.categories.categories,
    isFetchingCategories: state.categories.isFetchingCategories,
    errorFetchingCategories: state.categories.errorFetchingCategories,
    products: state.products.products,
    isFetchingProducts: state.products.isFetchingProducts,
    errorFetchingProducts: state.products.errorFetchingProducts,
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProducts,
    fetchCategoriesAndProducts,
    changePage: () => push('/about-us'),
  }, dispatch)
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)