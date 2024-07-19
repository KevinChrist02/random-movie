async function fetchData() {
  const movieElements = [
    document.getElementById("movie-1"),
    document.getElementById("movie-2"),
    document.getElementById("movie-3"),
  ];
  const button = document.getElementById("random");
  const errorMessage = document.getElementById("error");

  const apiKey = "b0a878ff";
  const random = [];
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < 3; i++) {
    const randomYear =
      Math.floor(Math.random() * (currentYear - 1900 + 1)) + 1900;
    const url =
      "http://www.omdbapi.com/?apikey=" +
      apiKey +
      "&s=movie&y=" +
      randomYear +
      "&type=movie";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.error}`);
      }
      const data = await response.json();
      errorMessage.textContent = "";
      console.log(data);

      if (data.Response === "True" && data.Search && data.Search.length > 0) {
        const randomMovie =
          data.Search[Math.floor(Math.random() * data.Search.length)];
        movieElements[i].innerHTML = `
          <h3>${randomMovie.Title}</h3>
          <p>${randomMovie.Year}</p>`;
      } else {
        console.log(data.Error);
        movieElements[i].innerHTML = "<p>Error loading movie</p>";
      }
    } catch (error) {
      console.error(`Error fetching the data: ${error}`);
      errorMessage.textContent = `Error loading the data`;
      movieElements[i].innerHTML = "<p>Error loading movie</p>";
    }
  }
}

document.getElementById("random").addEventListener("click", fetchData);
