// Question 2:

const gamesApi =
  'https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating';
const gamesDiv = document.querySelector('#gamesDiv');

async function getGames(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const resultArray = result.results;
    resultArray.forEach((element) => {
      gamesDiv.innerHTML += `
        <div class="individualGame">
        <h2> ${element.name} </h2>
        <p>Rating: ${element.rating} </p>
        <p>Tags: ${element.tags.length}</p>
        `;
    });
  } catch (error) {
    document.querySelector('.alert').innerHTML = showAlertTouser(
      'Woops, something is wrong, contact the system admin and the monkeys will get to work!',
      'danger'
    );
  } finally {
    setTimeout(function () {
      document.querySelector('.alert').innerHTML = '';
    }, 3000);
  }
}

getGames(gamesApi);
