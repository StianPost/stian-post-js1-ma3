// Question 2:

const gamesApi =
  'https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating';
const gamesDiv = document.querySelector('#gamesDiv');

async function getGames(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const resultArray = result.results;
    document.querySelector('.loading').innerHTML = '';
    for (let i = 0; i < resultArray.length; i++) {
      if (i === 8) {
        break;
      }

      let platforms = resultArray[i].platforms;
      let platformsHTML = '';

      for (let j = 0; j < platforms.length; j++) {
        platformsHTML += `
        <p>${j + 1}: ${platforms[j].platform.name}</p>
        `;
      }

      let ratings = resultArray[i].ratings;
      let ratingHTML = '';
      for (let k = 0; k < ratings.length; k++) {
        ratingHTML += `
        <div class="ratingsBlock">
          <p><span>Rating: </span>${ratings[k].title}</p>
          <p><span>Count: </span>${ratings[k].count}</p>
          <p><span>Percentage: </span>${ratings[k].percent}%</p>
        </div>
        `;
        if (k === 2) {
          break;
        }
      }

      gamesDiv.innerHTML += `
        <div class="gamesCard">
          <div class="gamesCardInfo">
            <h2> ${resultArray[i].name} </h2>
            <p><span>Rating:</span> ${resultArray[i].rating} </p>
            <p><span>Number of Tags:</span> ${resultArray[i].tags.length}</p>
            <div class="platformDiv"><span>Platforms: </span>${platformsHTML}</div>
            <img class="gameImg" src="${resultArray[i].background_image}" alt="Image from the game: ${resultArray[i].name} ">
          </div>
          <div class="ratings">
            <div>
              <h3>Ratings: </h3>
              
                ${ratingHTML}
              
            </div>
          </div>
        </div>
        `;

      //<p><span>Platform:</span> ${resultArray[i].platforms[j].platform.name}</p>
    }
  } catch (error) {
    document.querySelector('.alert').innerHTML = showAlertTouser(
      'Woops, something is wrong, contact the system admin and the monkeys will get to work!',
      'danger'
    );
    console.log(error);
  } finally {
    setTimeout(function () {
      document.querySelector('.alert').innerHTML = '';
    }, 3000);
  }
}

getGames(gamesApi);
