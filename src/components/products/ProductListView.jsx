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
  // ... existing code ...

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
              onChange={() => props.onSelectPriceRange(1, 50)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              $1.00 - $50.00 <span className="text-muted">(4)</span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault1"
              onChange={() => props.onSelectPriceRange(50, 100)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              $50.00 - $100.00 <span className="text-muted">(4)</span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault1"
              onChange={() => props.onSelectPriceRange(100, 600)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              $100.00 - $600.00 <span className="text-muted">(4)</span>
            </label>
          </div>
        </li>
        {/* ... Add more price range options ... */}
      </ul>
    </div>
  );
};


const FilterCategory = (props) => {
  // ... existing code ...

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
      <ul className="list-group list-group-flush show" id="filterCategory">
        <li className="list-group-item">
          <button
            className="btn btn-link"
            onClick={() => props.onSelectCategory("Clothing")}
          >
            Clothing
          </button>
        </li>
        <li className="list-group-item">
          <button
            className="btn btn-link"
            onClick={() => props.onSelectCategory("Electronics")}
          >
            Electronics
          </button>
        </li>
        <li className="list-group-item">
          <button
            className="btn btn-link"
            onClick={() => props.onSelectCategory("Grocery")}
          >
            Grocery
          </button>
        </li>
        <li className="list-group-item">
          <button
            className="btn btn-link"
            onClick={() => props.onSelectCategory("Furniture")}
          >
            Furniture
          </button>
        </li>
        <li className="list-group-item">
          <button
            className="btn btn-link"
            onClick={() => props.onSelectCategory("Others")}
          >
            Others
          </button>
        </li>
        {/* ... Add more category options ... */}
      </ul>
    </div>
  );
};

// const FilterCategory = (props) => {
//   return (
//     <div className="card mb-3 accordion">
//       <div
//         className="card-header fw-bold text-uppercase accordion-icon-button"
//         data-bs-toggle="collapse"
//         data-bs-target="#filterCategory"
//         aria-expanded="true"
//         aria-controls="filterCategory"
//       >
//         Categories
//       </div>
//       <ul
//         className="list-group list-group-flush show"
//         id="filterCategory"
//       >
//         <li className="list-group-item">
//           <Link to="/" className="text-decoration-none stretched-link">
//             Clothing
//           </Link>
//         </li>
//         <li className="list-group-item">
//           <Link to="/" className="text-decoration-none stretched-link">
//             Electronics
//           </Link>
//         </li>
//         <li className="list-group-item">
//           <Link to="/" className="text-decoration-none stretched-link">
//             Grocery
//           </Link>
//         </li>
//         <li className="list-group-item">
//           <Link to="/" className="text-decoration-none stretched-link">
//             Furniture
//           </Link>
//         </li>
//         <li className="list-group-item">
//           <Link to="/" className="text-decoration-none stretched-link">
//             Kitchen
//           </Link>
//         </li>
//         <li className="list-group-item">
//           <Link to="/" className="text-decoration-none stretched-link">
//             Other
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

class ProductListView extends Component {
  state = {
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "list",
    data:[],
    selectedCategory: null,
  selectedPriceRange: null,
  };

  async componentDidMount() {
    try {
      const response = await fetch(
        "https://65bt3ppugh.execute-api.us-east-1.amazonaws.com/develop/api/get-items-detail"
      );
      const data = await response.json();
      this.setState({ totalItems: data.items.length, data: data.items });
      this.onPageChanged({ currentPage: 1 });
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  }

  onSelectCategory = (category) => {
    this.setState({ selectedCategory: category, currentPage: 1 }, () => {
      this.onPageChanged({ currentPage: 1 });
    });
  };

  onSelectPriceRange = (minPrice, maxPrice) => {
    this.setState({ selectedPriceRange: { min: minPrice, max: maxPrice }, currentPage: 1 }, () => {
      this.onPageChanged({ currentPage: 1 });
    });
  };

  onPageChanged = ({ currentPage, pageLimit = 20 }) => {
    const { totalItems, selectedCategory, selectedPriceRange } = this.state;
    const totalPages = Math.ceil(totalItems / pageLimit);
    const offset = (currentPage - 1) * pageLimit;
    let currentProducts = this.state.data.slice(offset, offset + pageLimit);

    // Apply filters if category or price range is selected
    if (selectedCategory) {
      currentProducts = currentProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedPriceRange) {
      currentProducts = currentProducts.filter(
        (product) =>
          product.price >= selectedPriceRange.min &&
          product.price <= selectedPriceRange.max
      );
    }

    this.setState({ currentPage, currentProducts, totalPages });
  };

  onChangeView = (view) => {
    this.setState({ view });
  };


  

  

  render() {
    console.log("this.state.data ",this.state.data);
    console.log("this.state.currentProducts ",this.state.currentProducts);
    console.log("this.state.data[0].image_url ",this.state.data[0]);
    
    return (
      <React.Fragment>
     
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory  onSelectCategory={this.onSelectCategory}/>
              <FilterPrice onSelectPriceRange={this.onSelectPriceRange} />
          
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
                pageLimit={20}
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
