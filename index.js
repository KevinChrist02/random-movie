async function fetchData() {
  const random = [];
  const url = `https://www.omdbapi.com/?apikey=b0a878ff&s=movie&type=movie`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.error}`);
    }
    const data = await response.json();

    console.log(data);

    if (data.Response === "True") {
    } else {
      console.log(data.Error);
    }
  } catch (error) {
    console.error(`Error fetching the data: ${error}`);
    document.getElementById(
      "results"
    ).textContent = `<p>Error loading the data</p>`;
  }
}

fetchData();
