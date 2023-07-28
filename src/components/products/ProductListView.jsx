import React, { lazy, Component } from "react";
import { data } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Paging = lazy(() => import("./Paging"));
// const FilterCategory = lazy(() => import("./Category"));
// const FilterPrice = lazy(() => import("./Price"));
const CardServices = lazy(() => import("./CardServices"));
const CardProductGrid = lazy(() =>
  import("./CardProductGrid")
);
const CardProductList = lazy(() =>
  import("./CardProductList")
);

const FilterPrice = (props) => {
  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterPrice"
        aria-expanded="true"
        aria-controls="filterPrice"
      >
        Price
      </div>
      <ul className="list-group list-group-flush show" id="filterPrice">
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault1"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              $24.00 - $29.00 <span className="text-muted">(4)</span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault2"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault2">
              $33.00 - $35.00 <span className="text-muted">(2)</span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault3"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault3">
              $70.00 - $99.00 <span className="text-muted">(5)</span>
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

const FilterCategory = (props) => {
  return (
    <div className="card mb-3 accordion">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCategory"
        aria-expanded="true"
        aria-controls="filterCategory"
      >
        Categories
      </div>
      <ul
        className="list-group list-group-flush show"
        id="filterCategory"
      >
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Clothing
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Leather Bag
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Trausers
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Sweater & Cardigans
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            High Heels
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Coats & Jackets
          </Link>
        </li>
      </ul>
    </div>
  );
};

class ProductListView extends Component {
  state = {
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "list",
  };

  UNSAFE_componentWillMount() {
    const totalItems = this.getProducts().length;
    this.setState({ totalItems });
  }

  onPageChanged = (page) => {
    let products = this.getProducts();
    const { currentPage, totalPages, pageLimit } = page;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = products.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts, totalPages });
  };

  onChangeView = (view) => {
    this.setState({ view });
  };

  getProducts = () => {

    //implement get products from backend

    let products = data.products;
    products = products.concat(products);
    products = products.concat(products);
    products = products.concat(products);
    products = products.concat(products);
    products = products.concat(products);
    return products;
  };

  render() {
    return (
      <React.Fragment>
        {/* <div
          className="p-5 bg-primary bs-cover"
          style={{
            backgroundImage: "url(../../images/banner/50-Banner.webp)",
          }}
        >
          <div className="container text-center">
            <span className="display-5 px-3 bg-white rounded shadow">
              T-Shirts
            </span>
          </div>
        </div> */}
        {/* <Breadcrumb /> */}
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory />
              <FilterPrice />
              {/* <FilterSize /> */}
              {/* <FilterStar /> */}
              {/* <FilterColor /> */}
              {/* <FilterClear /> */}
              {/* <FilterTag /> */}
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-bold">
                    {this.state.totalItems} results
                     {/* for{" "} */}
                    {/* <span className="text-warning">"t-shirts"</span> */}
                  </span>
                </div>
                <div className="col-5 d-flex justify-content-end">
                  {/* <select
                    className="form-select mw-180 float-start"
                    aria-label="Default select"
                  >
                    <option value={1}>Most Popular</option>
                    <option value={2}>Latest items</option>
                    <option value={3}>Trending</option>
                    <option value={4}>Price low to high</option>
                    <option value={4}>Price high to low</option>
                  </select> */}
                  <div className="btn-group ms-3" role="group">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className={`btn ${
                        this.state.view === "grid"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <FontAwesomeIcon icon={faTh} />
                    </button>
                    <button
                      aria-label="List"
                      type="button"
                      onClick={() => this.onChangeView("list")}
                      className={`btn ${
                        this.state.view === "list"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <FontAwesomeIcon icon={faBars} />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {this.state.view === "grid" &&
                  this.state.currentProducts.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-4">
                        <CardProductGrid data={product} />
                      </div>
                    );
                  })}
                {this.state.view === "list" &&
                  this.state.currentProducts.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-12">
                        <CardProductList data={product} />
                      </div>
                    );
                  })}
              </div>
              <hr />
              <Paging
                totalRecords={this.state.totalItems}
                pageLimit={9}
                pageNeighbours={3}
                onPageChanged={this.onPageChanged}
                sizing=""
                alignment="justify-content-center"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListView;
