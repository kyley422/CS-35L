import React, {Component, useTransition} from 'react'
import { useState } from 'react';

function Square({value,onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

export default function Board() {
  const [xCount, setXCount] = useState(0)
  const [oCount, setOCount] = useState(0)
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [centerIsOccupied, setCenterIsOccupied] = useState(null)
  const [xIsNext, setXisNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = "Winner " + winner
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  function handleClick(i) {
    if (calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()

    if (squares[4]) {
      setCenterIsOccupied(squares[4])
    }
    else {
      setCenterIsOccupied(null)
    }
    console.log("Center is occupied: " + centerIsOccupied)

    if (xIsNext) {
      if (xCount == 3) {
        if (squares[i] == "O") {return}
        // Empty square check
        if (!squares[i]) {
          if (selectedPiece!=null) {
            if (squares[selectedPiece] == "X") {
              let adjacentSquares = findAdjacent(selectedPiece)
              console.log(adjacentSquares)
              // Move piece
              if (adjacentSquares.includes(i)) {
                nextSquares[i] = "X"
                nextSquares[selectedPiece] = null
                // Check for center condition
                if (centerIsOccupied == "X") {
                  if (selectedPiece != 4 && !calculateWinner(nextSquares)) {
                    // Undo the move, this wasn't a valid move
                    nextSquares[i] = null
                    nextSquares[selectedPiece] = "X"
                    return
                  }
                }
                // Assuming valid move
              }
              else {
                return
              }
            }
            else {
              return
            }
          }
          else {
            return
          }
        }
        else {
          console.log("X selected (" + i +")")
          setSelectedPiece(i)
          return
        }
      }
      else {
        if (squares[i]) {
          return
        }
        else {
          nextSquares[i] = "X"
          setXCount(xCount+1)
        }
      }
    }
    else {
      if (oCount == 3) {
        if (xCount == 3) {
          if (squares[i] == "X") {return}
          // Empty square check
          if (!squares[i]) {
            if (selectedPiece!=null) {
              if (squares[selectedPiece] == "O") {
                let adjacentSquares = findAdjacent(selectedPiece)
                console.log(adjacentSquares)
                // Move piece
                if (adjacentSquares.includes(i)) {
                  nextSquares[i] = "O"
                  nextSquares[selectedPiece] = null
                  // Check for center condition
                  if (centerIsOccupied == "O") {
                    if (selectedPiece != 4 && !calculateWinner(nextSquares)) {
                      // Undo the move, this wasn't a valid move
                      nextSquares[i] = null
                      nextSquares[selectedPiece] = "O"
                      return
                    }
                  }
                  // Assuming valid move
                }
                else {
                  return
                }
              }
              else {
                return
              }
            }
            else {
              return
            }
          }
          else {
            console.log("O selected (" + i +")")
            setSelectedPiece(i)
            return
          }
        }
      }
      else {
        if (squares[i]) {
          return
        }
        else {
          nextSquares[i] = "O"
          setOCount(oCount+1)
        }
      }
    }
    setXisNext(!xIsNext)
    setSquares(nextSquares)
  }

  return (
    <React.Fragment>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </React.Fragment>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Returns array of adjacent squares for position
function findAdjacent(position) {
  let adjacent
  switch (position) {
    case 0:
      adjacent = [1,3,4]
      break
    case 1:
      adjacent = [0,2,3,4,5]
      break
    case 2:
      adjacent = [1,4,5]
      break
    case 3:
      adjacent = [0,1,4,7,6]
      break
    case 4:
      adjacent = [0,1,2,3,5,6,7,8]
      break
    case 5:
      adjacent = [2,1,4,7,8]
      break
    case 6:
      adjacent = [3,4,7]
      break
    case 7:
      adjacent = [6,3,4,5,8]
      break
    case 8:
      adjacent = [5,4,7]
      break
    default:
      console.log("Something went wrong")
  }
  return adjacent
}