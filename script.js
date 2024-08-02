document.addEventListener('DOMContentLoaded', function() {
  const nickname = "weat";
  const discordNick = "weaat";
  const element = document.getElementById('nickname');
  const discordButton = document.getElementById('discord-btn');
  const copiedNotice = document.getElementById('copied-notice');
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const endingChars = ">, ?, ^), $, #";
  let currentIndex = 0;
  let currentText = '';
  let endingChar = '';
  let isBuilding = true;
  let interval;

  function getRandomChar() {
    return randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  function getRandomEndingChar() {
    const chars = endingChars.split(', ');
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function typeEffect() {
    if (isBuilding) {
      endingChar = getRandomEndingChar();
      element.innerText = currentText + endingChar;

      if (currentIndex < nickname.length) {
        currentText += getRandomChar();
        currentIndex++;
      } else if (currentIndex === nickname.length) {
        currentText = nickname;
        currentIndex++;
      } else {
        element.innerText = nickname + endingChar;
        clearInterval(interval);
      }
    }
  }

  function dismantleNickname() {
    if (currentIndex > 0) {
      currentText = currentText.slice(0, -1);
      currentIndex--;
      element.innerText = currentText + endingChar;
    } else {
      clearInterval(interval);
    }
  }

  function handleMouseOver() {
    clearInterval(interval);
    interval = setInterval(dismantleNickname, 100);
    element.classList.add('strike');
  }

  function handleMouseOut() {
    clearInterval(interval);
    isBuilding = true;
    currentIndex = 0;
    currentText = '';
    interval = setInterval(typeEffect, 100);
    element.classList.remove('strike');
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      copiedNotice.classList.add('visible');
      setTimeout(() => {
        copiedNotice.classList.remove('visible');
      }, 2000);
    });
  }

  discordButton.addEventListener('click', () => copyToClipboard(discordNick));
  element.addEventListener('mouseover', handleMouseOver);
  element.addEventListener('mouseout', handleMouseOut);

  interval = setInterval(typeEffect, 100);
});
