import { connect } from "react-redux";
import styled from "styled-components";
import { updateFilter } from "../store/filtersActions";
import { filterSelector } from "../store/filtersSelectors";
import Croix from "../../src/cross.svg";
import Triangle from "../../src/triangle.svg";
import SearchIcon from "../../src/search.svg";
import { useRef, useState } from "react";
import { moviesCategories } from "../store/moviesSelectors";

const FilterComponentContainer = styled.div`

  background-color: #f4f4f4;
  padding: 4rem 0 1rem 0;
  border-bottom: 2px solid #8080801f;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 4rem 0 1rem 0;
  }

  .searchBard {
    margin-right: 3rem;
    display: flex;
    align-items: center;
    background-color: white;
    height: 2rem;
    padding: 0.5rem;
    border-radius: 16px;
    margin-bottom: 2rem;

    @media (max-width: 600px) {
      margin-right: unset;
    }

    img {
      width: 1.5rem;
      opacity: 0.7;
      height: 1.5rem;
    }

    input {
      margin-left: 0.5rem;
      height: 100%;
      border: unset;
      outline: none;
      font-size: 1.2rem;
      max-width: 13rem;
    }

    .resetSearchBar {
      img {
        width: 1.5rem;
        height: 1.5rem;
        pointer-events: none;
        opacity: 0;
        transition: all 0.5s ease;

        &.active {
          display: block;
          pointer-events: unset;
          opacity: 1;
          transition: all 0.5s ease;

          &:hover {
            cursor: pointer;
            opacity: 0.5;
            transition: all 0.3s ease;
          }
        }
      }
    }
  }

  .categoryFilter {
    margin-bottom: 2rem;
    height: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 16px;
    background-color: white;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      cursor: pointer;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      transition: all 0.3s ease;

      p {
        opacity: 0.6;
        transition: all 0.3s ease;
      }

      img {
        opacity: 0.7;
        transition: all 0.3s ease;
      }
    }

    &.active {

      p {
        opacity: 0.5;
      }

      img {
        transform: rotate(180deg);
        transition: all 0.3s ease;
      }

      .categoriesDropDown {
        height: unset;
        border-radius: 0 0 16px 16px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        transition: all 0.3s ease;
      }
    }

    .roundColor {
      pointer-events: none;
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
      background-color: #80808057;
      margin-right: 1rem;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
      &.roundColor--Comedy {
        background-color: #ba9be3;
      }
      &.roundColor--Animation {
        background-color: #f0cf85;
      }
      &.roundColor--Thriller {
        background-color: #32afa9;
      }
      &.roundColor--Drame {
        background-color: #db6f6f;
      }
    }

    img {
      pointer-events: none;
      margin-left: 1rem;
      transition: all 0.3s ease;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }

    p {
      min-width: 6rem;
      pointer-events: none;
      transition: all 0.3s ease;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }
    .categoriesDropDown {
      position: absolute;
      background-color: white;
      left: 0;
      right: 0;
      top: 2.4rem;
      transition: all 0.3s ease;
      height: 0;
      overflow: hidden;

      ul {
        list-style: none;
        padding: unset;

        li {
          display: flex;
          align-items: center;
          margin: 1rem;
          transition: all 0.3s ease;

          &:hover {
            opacity: 0.5;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .roundCategory {
            pointer-events: none;
            width: 1.3rem;
            height: 1.3rem;
            border-radius: 50%;
            background-color: #80808073;
            margin-right: 0.8rem;

            &.roundCategory--Comedy {
              background-color: #ba9be3;
            }
            &.roundCategory--Animation {
              background-color: #f0cf85;
            }
            &.roundCategory--Thriller {
              background-color: #32afa9;
            }
            &.roundCategory--Drame {
              background-color: #db6f6f;
            }
          }
        }
      }
    }
  }
`;

export function FilterComponent({ filter, moviesCategories, onFilterUpdate }) {

  // components
  const searchBar = useRef(null);
  const resetBtn = useRef(null);

  //handle category dropdown
  const [dropDownOpen, setDropDownOpen] = useState(false);

  // handle searchbar => load new filter
  const handleSearchBar = (e) => {
    onFilterUpdate({ ...filter, title: e.target.value });
    e.target.value !== ""
      ? resetBtn.current.classList.add("active")
      : resetBtn.current.classList.remove("active");
  };

  // handle reset searchbar value => load new filter
  const resetSearchBar = () => {
    searchBar.current.value = "";
    onFilterUpdate({ ...filter, title: "" });
    searchBar.current.focus();
    resetBtn.current.classList.remove("active");
  };

  return (
    <FilterComponentContainer>
      <div className="searchBard">
        <img src={SearchIcon} alt="Search icon" />
        <input
          placeholder="Search by title.."
          ref={searchBar}
          onChange={handleSearchBar}
          type="text"
        />
        <div className="resetSearchBar">
          <img
            ref={resetBtn}
            onClick={resetSearchBar}
            src={Croix}
            alt="Reset icon"
          />
        </div>
      </div>
      <div
        onClick={() => {
          setDropDownOpen(!dropDownOpen);
        }}
        className={`categoryFilter ${dropDownOpen ? "active" : ""}`}
      >
        <span
          className={`roundColor ${
            filter.category ? "roundColor--" + filter.category : ""
          }`}
        ></span>
        <p>{filter.category ? filter.category : "Categories"}</p>
        <img src={Triangle} alt="select icon" />
        <div className="categoriesDropDown">
          <ul>
            {filter.category !== null ? (
              <li
                onClick={() => {
                  onFilterUpdate({ ...filter, category: null });
                }}
              >
                {" "}
                <span className="roundCategory"></span>Categories
              </li>
            ) : (
              ""
            )}
            {moviesCategories
              .sort((a, b) => a.localeCompare(b))
              .map((category) =>
                category !== filter.category ? (
                  <li
                    onClick={() => {
                      onFilterUpdate({ ...filter, category: category });
                    }}
                    key={moviesCategories.indexOf(category)}
                  >
                    <span
                      className={`roundCategory roundCategory--${category}`}
                    ></span>
                    {category}
                  </li>
                ) : (
                  ""
                )
              )}
          </ul>
        </div>
      </div>
    </FilterComponentContainer>
  );
}

// Connect component to reducers
export const FilterComponentStore = connect(
  (state) => ({
    moviesCategories: moviesCategories(state),
    filter: filterSelector(state),
  }),
  (dispatch) => ({
    onFilterUpdate: (value) => dispatch(updateFilter(value)),
  })
)(FilterComponent);
