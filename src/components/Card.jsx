import styled from "styled-components";
import LikeIcon from "../../src/Heart.svg";
import DislikeIcon from "../../src/Heart-off.svg";
import Croix from "../../src/cross.svg";
import Trash from "../../src/trash.svg";
import { useState } from "react";

const CardContainer = styled.div`

  background-color: white;
  width: 17rem;
  padding: 2rem;
  aspect-ratio: 1/1;
  margin: 1rem;
  border-radius: 2rem;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transition: box-shadow 0.3s ease;
  }

  .cardContentTop {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .categoryBox {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;

      &.categoryBox--Comedy {
        background-color: #ba9be3;
      }
      &.categoryBox--Animation {
        background-color: #f0cf85;
      }
      &.categoryBox--Thriller {
        background-color: #32afa9;
      }
      &.categoryBox--Drame {
        background-color: #db6f6f;
      }
    }

    .deleteBtn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (min-width: 600px) {
        &:hover {
          img {
            transform: scale(1.1);
            cursor: pointer;
            opacity: 1;
            transition: all 0.3s ease;
          }
        }
      }

      &.active {

        img {
          transform: scale(1.1);
          cursor: pointer;
          opacity: 1;
          transition: all 0.3s ease;
        }

        .deleteValidation {
          pointer-events: unset;
          opacity: 1;
          top: 2rem;
          transition: all 0.3s ease;
        }
      }

      img {
        z-index: 1;
        width: 1.8rem;
        opacity: 0.5;
        transition: all 0.3s ease;
      }

      .deleteValidation {
        z-index: 0;
        opacity: 0;
        position: absolute;
        pointer-events: none;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        background-color: #ff5b5b;
        transition: all 0.3s ease;

        img {
          opacity: 1;
          transform: unset;
        }
      }
    }
  }

  .cardContentMiddle {

    h4 {
      color: #353c56;
      font-size: 2rem;
      margin: unset;
    }

    p {
      color: #b7bac2;
      font-size: 1.4rem;
      margin-top: 1rem;
    }
  }

  .cardContentBottom {
    display: flex;
    justify-content: flex-end;

    .voteComponent {
      display: flex;

      .voteBox {
        display: flex;
        margin-right: 1rem;
        align-items: center;

        img {
          width: 2rem;
          heigth: 2rem;
          opacity: 0.5;
          margin-right: 0.5rem;
          transition: all 0.3s ease;

          &:hover {
            opacity: 1;
            cursor: pointer;
            transform: scale(1.5);
            transition: all 0.3s ease;
          }
        }

        p {
          margin: unset;
        }

        &.voteBox--dislike {
          img {
            &:hover {
              filter: invert(40%) sepia(86%) saturate(1084%) hue-rotate(333deg)
                brightness(92%) contrast(81%);
            }
          }

          &.voted {
            img {
              opacity: 1;
              filter: invert(40%) sepia(86%) saturate(1084%) hue-rotate(333deg)
                brightness(92%) contrast(81%);
              transform: scale(1.5);
            }
          }
        }

        &.voteBox--like {
          img {
            &:hover {
              filter: invert(65%) sepia(52%) saturate(524%) hue-rotate(87deg)
                brightness(98%) contrast(85%);
            }
          }

          &.voted {
            img {
              opacity: 1;
              filter: invert(65%) sepia(52%) saturate(524%) hue-rotate(87deg)
                brightness(98%) contrast(85%);
              transform: scale(1.5);
            }
          }

        }
      }
    }
  }
`;

export default function Card({ movie, onLike, onDislike, onDelete }) {

  // handle delete popup
  const [deletePopUp, setDeletePopUp] = useState(false);

  return (
    <CardContainer>
      <div className="cardContentTop">
        <div className={`categoryBox categoryBox--${movie.category}`}></div>
        <div
          onClick={() => setDeletePopUp(!deletePopUp)}
          className={`deleteBtn ${deletePopUp ? "active" : ""}`}
        >
          <img src={Croix} alt="" />
          <div className="deleteValidation">
            <img
              onClick={() => {
                onDelete(movie);
              }}
              src={Trash}
              alt="Trash icon"
            />
          </div>
        </div>
      </div>
      <div className="cardContentMiddle">
        <h4>{movie.title}</h4>
        <p>{movie.category}</p>
      </div>
      <div className="cardContentBottom">
        <div className="voteComponent">
          <div className={`voteBox voteBox--like ${movie.vote ? "voted" : ""}`}>
            <img
              onClick={() => {
                onLike(movie);
              }}
              src={LikeIcon}
              alt="Like icon"
            />
            <p>{movie.likes}</p>
          </div>
          <div
            className={`voteBox voteBox--dislike ${
              movie.vote === false ? "voted" : ""
            }`}
          >
            <img
              onClick={() => {
                onDislike(movie);
              }}
              src={DislikeIcon}
              alt="Dislike icon"
            />
            <p>{movie.dislikes}</p>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}
