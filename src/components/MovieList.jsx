import { connect } from "react-redux";
import Card from "./Card";
import styled from "styled-components";
import { moviesFiltered } from "../store/moviesSelectors";
import {
  deleteMovieAction,
  dislikeMovieAction,
  likeMovieAction,
} from "../store/moviesActions";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Triangle from "../../src/triangle.svg";
import Arrow from "../../src/arrow.svg";
import { paginationNumber } from "../store/paginationSelectors";
import { selectPaginationNumber } from "../store/paginationAction";


const DashBoardContainer = styled.div`
  background-color: #f4f4f4;
  display: flex;
  flex-wrap: wrap;
  padding: 4rem 0;
  margin: auto;
  justify-content: center;

  @media (max-width: 600px) {
    padding: 2rem 0 8rem 0;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }

  .noRecord {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }
`;

const Pagination = styled.div`
  
  display: flex;
  align-items: center;
  margin-left: 5rem;
  z-index: 5;

  @media (max-width: 600px) {
    position: fixed;
    bottom: 0;
    top: unset;
    left: 0;
    right: 0;
    padding: 0.5rem 1rem 0.5rem 1rem;
    justify-content: flex-start;
    background-color: white;
    border-radius: 16px 16px 0 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin: unset;
  }
  
  .paginationSelector {
    position: relative;
    background-color: white;
    border-radius: 16px;
    padding: 0 1rem;
    width: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #e6e6e6;

    &.active {
        @media (max-width: 600px) {
            border-radius: 16px 0 0 16px;
        }
        
        .paginationDropDown {
            height: unset;

            @media (max-width: 600px) {
                display: flex;
                top: -1px;
                bottom: -1px;
                left: 4rem;
                border-radius:0 16px 16px 0;
            border-top: 1px solid #e6e6e6;
            border-bottom: 1px solid #e6e6e6;
            border-right: 1px solid #e6e6e6;
            border-left: unset;
            z-index: 5;
            
                p {
                    margin-right: 1rem;
                }
            }    
        }  
    }

    &:hover {
        cursor: pointer;
        box-shadow: rgba(149,157,165,0.2) 0px 8px 24px;
    }

    img {
        -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }

    p {
        margin: unset
        text-align: center;
        -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }

    .paginationDropDown {
      position: absolute;
      top: 2.2rem;
      left: 0;
      right: 0;
      height: 0;
      overflow: hidden;
      border-top: unset;
      background-color: white;
      border-radius:0 0 16px 16px;
      width: 2.5rem;
      padding: 0 1rem;

    p {
        transition: all 0.3s ease;
        -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
        &:hover {
            opacity: 0.5;
            transition: all 0.3s ease;
        }
        &.selected {
            display: none;
        }
    }
    }
  }

  .paginationBtns {
    display: flex;
    list-style: none;
    align-items: center;

    li {
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        cursor: pointer;
        opacity: 0.7;
        transition: all 0.3s ease;
        background-color: white;
      }

      &.previous {
        margin-right: 1rem;
      }

      &.next {
        margin-left: 1rem;
      }
    }

    .previousBtn {
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      transition: all 0.3s ease;

      img {
        transform: rotate(270deg);
        width: 1rem;
      }

      @media (max-width: 600px) {
          background-color: #F4F4F4;
      }
    }

    .nextBtn {
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      transition: all 0.3s ease;

      img {
        transform: rotate(90deg);
        width: 1rem;
      }

      @media (max-width: 600px) {
        background-color: #F4F4F4;
    }
    }

    .paginationDisabled {
        opacity: 0.4;
        transition: all 0.3s ease;
    }

    .selected {
      background-color: white;
      @media (max-width: 600px) {
        background-color: #F4F4F4;
    }
    }
  }
`;

export function MovieList({
  movies,
  onLike,
  onDislike,
  onDelete,
  pagination,
  onSelectPagination,
}) {

  // handle pagination dropdown => open/close
  const [openPageDropdown, setOpenPageDropdown] = useState(false);

  // handle pagination logic
  const [moviesDisplayed, setMoviesDisplayed] = useState(movies);
  const [pageNumber, setPageNumber] = useState(0);
  const moviesParPage = pagination;
  const pagesVisited = pageNumber * moviesParPage;
  const pageCount = Math.ceil(moviesDisplayed.length / moviesParPage);

  useEffect(() => {
    setPageNumber(0);
    setMoviesDisplayed(movies);
  }, [movies]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  //

  // load movies depend on pagination system
  const displayMovies = moviesDisplayed
    .slice(pagesVisited, pagesVisited + moviesParPage)
    .map((movie) => {
      return (
        <Card
          key={movie.id}
          onDelete={onDelete}
          onDislike={onDislike}
          onLike={onLike}
          movie={movie}
        />
      );
    });


  return (
    <>
      {moviesDisplayed.length !== 0 ? (
        <Pagination>
          <div
            onClick={() => {
              setOpenPageDropdown(!openPageDropdown);
            }}
            className={`paginationSelector ${openPageDropdown ? "active" : ""}`}
          >
            <p>{pagination}</p>
            <img src={Arrow} alt="arrow icon" />
            <div className="paginationDropDown">
              <p
                className={`${pagination === 4 ? "selected" : ""}`}
                onClick={() => {
                  onSelectPagination(4);
                }}
              >
                4
              </p>
              <p
                className={`${pagination === 8 ? "selected" : ""}`}
                onClick={() => {
                  onSelectPagination(8);
                }}
              >
                8
              </p>
              <p
                className={`${pagination === 12 ? "selected" : ""}`}
                onClick={() => {
                  onSelectPagination(12);
                }}
              >
                12
              </p>
            </div>
          </div>

          <ReactPaginate
            marginPagesDisplayed={2}
            pageRangeDisplayed={10}
            previousLabel={<img src={Triangle} alt="previous button" />}
            nextLabel={<img src={Triangle} alt="next button" />}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBtns"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeCLassName={"paginationActive"}
          />
        </Pagination>
      ) : (
        ""
      )}

      <DashBoardContainer>
        {moviesDisplayed.length !== 0 ? (
          displayMovies
        ) : (
          <div className="noRecord">
            <p>No record</p>
          </div>
        )}
      </DashBoardContainer>
    </>
  );
}

// Connect component to reducers
export const MovieListStore = connect(
  (state) => ({
    movies: moviesFiltered(state),
    pagination: paginationNumber(state),
  }),
  (dispatch) => ({
    onLike: (movie) => dispatch(likeMovieAction(movie)),
    onDislike: (movie) => dispatch(dislikeMovieAction(movie)),
    onDelete: (movie) => dispatch(deleteMovieAction(movie)),
    onSelectPagination: (number) => dispatch(selectPaginationNumber(number)),
  })
)(MovieList);
