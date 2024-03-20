// Movie list array
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
  
  // Function to update movie details based on selection
  function updateMovieDetails() {
    const selectMovie = document.getElementById("selectMovie");
    const movieNameElement = document.getElementById("movieName");
    const moviePriceElement = document.getElementById("moviePrice");
  
    // Default values
    let selectedMovieName = "Flash";
    let selectedMoviePrice = 7;
  
    // Update dropdown with movie names
    moviesList.forEach((movie) => {
      const option = document.createElement("option");
      option.value = movie.movieName;
      option.textContent = movie.movieName;
      selectMovie.appendChild(option);
    });
  
    // Event listener for movie selection
    selectMovie.addEventListener("change", (event) => {
      selectedMovieName = event.target.value;
      const selectedMovie = moviesList.find((movie) => movie.movieName === selectedMovieName);
      selectedMoviePrice = selectedMovie.price;
  
      // Update movie details
      movieNameElement.textContent = selectedMovieName.toLowerCase();
      moviePriceElement.textContent = `$ ${selectedMoviePrice}`;
    });
  
    // Initial movie details update
    movieNameElement.textContent = selectedMovieName.toLowerCase();
    moviePriceElement.textContent = `$ ${selectedMoviePrice}`;
  
    return { selectedMovieName, selectedMoviePrice };
  }
  
  // Function to handle seat selection
  function handleSeatSelection() {
    const seatContainer = document.getElementById("seatCont");
    const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
    const totalPriceElement = document.getElementById("totalPrice");
    const numberOfSeatElement = document.getElementById("numberOfSeat");
  
    const selectedSeats = [];
  
    // Event listener for seat selection
    seatContainer.addEventListener("click", (event) => {
      const seat = event.target;
  
      // Check if the clicked seat is not occupied
      if (!seat.classList.contains("occupied")) {
        seat.classList.toggle("selected");
  
        // Update selected seats array
        const seatIndex = selectedSeats.indexOf(seat);
        if (seatIndex !== -1) {
          selectedSeats.splice(seatIndex, 1);
        } else {
          selectedSeats.push(seat);
        }
  
        // Update selected seats holder
        if (selectedSeats.length === 0) {
          selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
        } else {
          selectedSeatsHolder.innerHTML = selectedSeats.map((s) => `<span class="selectedSeat">${s.textContent}</span>`).join(", ");
        }
  
        // Update total price
        const totalPrice = selectedSeats.length * updateMovieDetails().selectedMoviePrice;
        totalPriceElement.textContent = `$ ${totalPrice}`;
        numberOfSeatElement.textContent = selectedSeats.length;
      }
    });
  
    // Continue button event listener
    const continueButton = document.getElementById("proceedBtn");
    continueButton.addEventListener("click", () => {
      if (selectedSeats.length === 0) {
        alert("Oops! No seat selected.");
      } else {
        alert("Yayy! Your seats have been booked.");
  
        // Mark selected seats as occupied
        selectedSeats.forEach((seat) => {
          seat.classList.remove("selected");
          seat.classList.add("occupied");
        });
  
        // Reset values
        totalPriceElement.textContent = "$ 0";
        numberOfSeatElement.textContent = "0";
        selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
        selectedSeats.length = 0;
      }
    });
  
    // Cancel button event listener
    const cancelButton = document.getElementById("cancelBtn");
    cancelButton.addEventListener("click", () => {
      selectedSeats.forEach((seat) => {
        seat.classList.remove("selected");
      });
  
      // Reset values
      totalPriceElement.textContent = "$ 0";
      numberOfSeatElement.textContent = "0";
      selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
      selectedSeats.length = 0;
    });
  }
  
  // Initialize movie details and seat selection
  updateMovieDetails();
  handleSeatSelection();
  