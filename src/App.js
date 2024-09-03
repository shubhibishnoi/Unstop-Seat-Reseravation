
import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Total number of seats and coach setup
  const totalSeats = 80;
  const initialSeats = [
    ['1A', '1B', '1C', '1D', '1E', '1F', '1G'],
    ['2A', '2B', '2C', '2D', '2E', '2F', '2G'],
    ['3A', '3B', '3C', '3D', '3E', '3F', '3G'],
    ['4A', '4B', '4C', '4D', '4E', '4F', '4G'],
    ['5A', '5B', '5C', '5D', '5E', '5F', '5G'],
    ['6A', '6B', '6C', '6D', '6E', '6F', '6G'],
    ['7A', '7B', '7C', '7D', '7E', '7F', '7G'],
    ['8A', '8B', '8C', '8D', '8E', '8F', '8G'],
    ['9A', '9B', '9C', '9D', '9E', '9F', '9G'],
    ['10A', '10B', '10C', '10D', '10E', '10F', '10G'],
    ['11A', '11B', '11C', '11D', '11E', '11F', '11G'],
    ['12A', '12B', '12C']
  ];


  // Flatten the initialSeats array to match the totalSeats count
  const [seats, setSeats] = useState(
    initialSeats.map(row => row.map(seat => ({ seatNumber: seat, booked: false })))
  );
  const [seatsToBook, setSeatsToBook] = useState(1);

  // Calculate the total booked seats
  const bookedSeatsCount = seats.flat().filter(seat => seat.booked).length;

  const bookSeats = () => {
    let seatsNeeded = seatsToBook;
    const newSeats = seats.map(row => [...row]);

    // Check if there are enough available seats
    const availableSeatsCount = totalSeats - bookedSeatsCount;
    if (seatsToBook > availableSeatsCount) {
      alert('Not enough available seats! All seats are booked or insufficient seats left.');
      return;
    }

    // Attempt to book in a single row
    for (let i = 0; i < newSeats.length && seatsNeeded > 0; i++) {
      const availableSeatsInRow = newSeats[i].filter(seat => !seat.booked).length;

      if (availableSeatsInRow >= seatsNeeded) {
        for (let j = 0; j < newSeats[i].length && seatsNeeded > 0; j++) {
          if (!newSeats[i][j].booked) {
            newSeats[i][j].booked = true;
            seatsNeeded--;
          }
        }
        break;
      }
    }

    // If not enough seats in one row, book across multiple rows
    if (seatsNeeded > 0) {
      for (let i = 0; i < newSeats.length && seatsNeeded > 0; i++) {
        for (let j = 0; j < newSeats[i].length && seatsNeeded > 0; j++) {
          if (!newSeats[i][j].booked) {
            newSeats[i][j].booked = true;
            seatsNeeded--;
          }
        }
      }
    }

    setSeats(newSeats);
  };

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value > totalSeats) {
      alert('All seats booked or requested seats exceed available seats!');
      setSeatsToBook(totalSeats - bookedSeatsCount);
    } else {
      setSeatsToBook(value);
    }
  };

  return (
    <div className="App">
      <h1>Seat Reservation</h1>
      <div>
        <label className='label'>
          Number of seats to book:
          <input
            type="number"
            value={seatsToBook}
            onChange={handleInputChange}
            max={7}
            min={1}
            className='inputField'
          />
        </label>
        <button className='btn' onClick={bookSeats}>Book Seats</button>
      </div>
      <div className="coach">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${seat.booked ? 'booked' : 'available'}`}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;