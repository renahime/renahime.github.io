async function grabData() {
  const returnData = {}
  try {
    const githubResponse = await fetch('https://backend-portfolio-apis-1a01f3f13b6c.herokuapp.com/api/github');
    if (!githubResponse.ok) {
      throw new Error("Network error");
    }
    const githubData = await githubResponse.json();
    returnData['github'] = githubData;

    const overwatchResponse = await fetch('https://backend-portfolio-apis-1a01f3f13b6c.herokuapp.com/api/overwatch');
    if (!overwatchResponse.ok) {
      throw new Error("Network error");
    }
    const overwatchData = await overwatchResponse.json();
    returnData['overwatch'] = overwatchData;

    console.log(returnData);
    returnData['date'] = new Date();
    localStorage.setItem('data', JSON.stringify(returnData));
  } catch (error) {
    console.log(error);
  }

  return returnData;
}

async function checkData() {
  let data = localStorage.getItem('data');
  let dateCheck = new Date()

  if (!data) {
    data = await grabData();
  }

  data = JSON.parse(data);

  if (dateCheck - new Date(data.date) > 86400000) {
    data = await grabData();
    data = JSON.parse(data);
  }
  return data;
}

async function main() {
  let data = await checkData();

  const githubContainer = document.getElementById('github');
  const gameContainer = document.getElementById('game');

  console.log(data)

  if (githubContainer && gameContainer && data) {
    const commitsMonth = document.getElementById('commits-month');
    commitsMonth.innerText += data.github.commitsInMonth;
    const commitsWeek = document.getElementById('commits-week');
    commitsWeek.innerText += data.github.commitsInWeek;
    const lastRepo = document.getElementById('last-repo');
    lastRepo.innerHTML += `<a href=${data.github.lastCommit.repoUrl}'>${data.github.lastRepo}</a>`
    const lastCommit = document.getElementById('last-commit');
    lastCommit.innerHTML += `<a href=${data.github.lastCommit.commitUrl}>${data.github.lastCommit.commitMessage}</a>`
    const gameRank = document.getElementById('rank');
    gameRank.innerText += data.overwatch.rank.division + " " + data.overwatch.rank.tier;
    const winRate = document.getElementById('winrate');
    winRate.innerText += data.overwatch.winRate;
    const mostPlayed = document.getElementById('most-played');
    mostPlayed.innerText += data.overwatch.mostPlayed;
  }
}


main()
let textElement = document.getElementById('textend');
let textContent = textElement.innerHTML;


function type() {
  let charIndex = 0;
  function typeCharacter() {
    if (charIndex < textContent.length) {
      let currChar = textContent[charIndex];
      let nextChar = textContent[charIndex + 1];

      textElement.innerHTML = textContent.substring(0, charIndex + 1);

      if (currChar == '<' && nextChar == 'br') {
        charIndex += 4;
      }

      charIndex++;
      setTimeout(typeCharacter, 100);
    } else {
      setTimeout(repeatType, 10000);
    }
  }
  typeCharacter();
}

function repeatType() {
  textElement.innerHTML = ''; // Clear the text content
  type(); // Start the typing animation again
}

const projectsTag = document.querySelector('a[href="projects"]');

projectsTag.addEventListener("click", function (e) {
  e.preventDefault();

  document.getElementById("directory-links").style.display = "none";
  document.getElementById("directory-text").style.display = "none";
  document.getElementById("project-links").style.display = "block";
  document.getElementById("project-text").style.display = "block";

})

const backTag = document.querySelector('a[href="back"]');

backTag.addEventListener("click", function (e) {
  e.preventDefault();

  document.getElementById("project-links").style.display = "none";
  document.getElementById("project-text").style.display = "none";
  document.getElementById("directory-links").style.display = "block";
  document.getElementById("directory-text").style.display = "block";

})

const stylesheetLink = document.getElementById('stylesheet');
const sunIcon = document.getElementById('sun');
const meIcon = document.getElementById('me-icon');
const computerIcon = document.getElementById('computer-icon');
const githubIcon = document.getElementById('github-icon');
const gameIcon = document.getElementById('game-icon')
const navImage = document.querySelectorAll('.nav-image');
const backImage = document.querySelector('.back-image');
const backLink = document.querySelector('.back-link');
const left = document.getElementById('left-arrow')
const right = document.getElementById('right-arrow')
let isDarkMode;

function toggleTheme() {
  isDarkMode = !isDarkMode;
  saveDarkModePreference();

  if (isDarkMode) {
    setDarkMode()
  } else {
    stylesheetLink.href = 'light.css';
    sunIcon.src = 'imgs/bow.gif';
    navImage.forEach(img => {
      img.src = 'imgs/better-box.png';
    });
    const backImage = document.querySelector('.back-image');
    backImage.src = 'imgs/back.png';
    const box = document.getElementById('box');
    box.src = "imgs/box.png";
    const directory = document.getElementById('directory-text');
    const projects = document.getElementById('project-text');
    directory.innerText = "directory^";
    projects.innerText = "projects^";
    if (meIcon) {
      meIcon.src = 'imgs/pixelme.png';
    }
    if (computerIcon) {
      computerIcon.src = 'imgs/computer.png';
    }
    if (gameIcon) {
      gameIcon.src = 'imgs/game.png'
    }
    if (right && left) {
      right.src = 'imgs/next2.gif'
      left.src = 'imgs/back2.gif'
    }
  }

}

function setDarkMode() {
  stylesheetLink.href = 'dark.css';
  sunIcon.src = 'imgs/moon1.gif';
  navImage.forEach(img => {
    img.src = 'imgs/nav_dark_box.png';
  });
  const backImage = document.querySelector('.back-image');
  backImage.src = 'imgs/dark-image.png';
  const box = document.getElementById('box');
  box.src = "imgs/dark-mode-box.png";
  const directory = document.getElementById('directory-text');
  const projects = document.getElementById('project-text');
  directory.innerText = "Directory";
  projects.innerText = "Projects";
  if (meIcon) {
    meIcon.src = 'imgs/dark_me.png';
  }
  if (computerIcon) {
    computerIcon.src = 'imgs/dark_computer.png';
  }
  if (gameIcon) {
    gameIcon.src = 'imgs/dark_game.png'
  }
  if (right && left) {
    right.src = 'imgs/arrow_dark.png'
    left.src = 'imgs/arrow_dark.png'
  }
}

function saveDarkModePreference() {
  localStorage.setItem('darkModePreference', isDarkMode);
}
function loadDarkModePreference() {
  const savedPreference = localStorage.getItem('darkModePreference');
  if (savedPreference !== null) {
    if (savedPreference == 'true') {
      return true;
    } else {
      return false
    }
  } else {
    return false
  }
}


const iconImages = document.querySelectorAll('.stat-img');
const statDivs = document.querySelectorAll('.stat-container');


function handleImageClick(event) {
  const clickedImageId = event.target.id;
  const allStatDivs = document.querySelectorAll('.stat-container');
  allStatDivs.forEach(function (div) {
    div.classList.add('hide');
  });

  // Show the corresponding div with the matching ID
  const correspondingStatDiv = document.querySelector(`#${clickedImageId.replace('-icon', '')}.stat-container`);
  if (correspondingStatDiv) {
    correspondingStatDiv.classList.remove('hide');
  }

}



iconImages.forEach(image => {
  image.addEventListener('click', handleImageClick);
});

window.onload = function () {
  isDarkMode = loadDarkModePreference()
  if (isDarkMode) {
    setDarkMode();
  }
};

const pdcContainers = document.querySelectorAll('.pdc');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

let currentIndex = 0;
// Show the initial slide
if (pdcContainers.length) {
  pdcContainers[currentIndex].classList.remove('hide');
}

// Function to hide all .pdc containers
function hideAllPdcContainers() {
  pdcContainers.forEach(container => {
    container.classList.add('hide');
  });
}

// Function to show the slide at a given index
function showSlide(index) {
  hideAllPdcContainers();
  pdcContainers[index].classList.remove('hide');
}

// Event listener for the left arrow
if (leftArrow && rightArrow) {
  leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + pdcContainers.length) % pdcContainers.length;
    showSlide(currentIndex);
  });
  // Event listener for the right arrow
  rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % pdcContainers.length;
    showSlide(currentIndex);
  });

}



type()
const emailIcon = document.getElementById('emailIcon');
const github = document.getElementById('githubIcon');
const linkedinIcon = document.getElementById('linkedinIcon');

// Define URLs for the respective social profiles
const emailURL = 'mailto:2015lorenaasanchezz@gmail.com';
const githubURL = 'https://github.com/renahime';
const linkedinURL = 'https://www.linkedin.com/in/lorena-s-a4a106275/';

// Add click event listeners to open URLs in new tabs
if (emailIcon) {
  emailIcon.addEventListener('click', () => {
    window.open(emailURL, '_blank');
  });
}

if (github) {
  github.addEventListener('click', () => {
    window.open(githubURL, '_blank');
  });
}

if (linkedinIcon) {
  linkedinIcon.addEventListener('click', () => {
    window.open(linkedinURL, '_blank');
  });
}

const clickableImages = document.querySelectorAll('.clickable-image');

if (clickableImages) {
  clickableImages.forEach(function (image) {
    image.addEventListener('click', function () {
      const filename = this.getAttribute('data-filename');
      console.log(filename)
      const imageURL = `/gifs/${filename}`;

      if (imageURL) {
        window.open(imageURL, '_blank');
      }
    });
  });
}
