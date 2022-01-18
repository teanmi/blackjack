let dealerCardOneNum = Math.floor(Math.random() * 13) + 1;
let dealerCardOneSuit = Math.floor(Math.random() * 4) + 1;

let dealerCardTwoNum = Math.floor(Math.random() * 13) + 1;
let dealerCardTwoSuit = Math.floor(Math.random() * 4) + 1;

let playerOneCardOneNum = Math.floor(Math.random() * 13) + 1;
let playerOneCardOneSuit = Math.floor(Math.random() * 4) + 1;

let playerOneCardTwoNum = Math.floor(Math.random() * 13) + 1;
let playerOneCardTwoSuit = Math.floor(Math.random() * 4) + 1;

let dealerCardOneImg =
  "images/" + dealerCardOneNum + "a" + dealerCardOneSuit + ".png";

let dealerCardTwoImg =
  "images/" + dealerCardTwoNum + "a" + dealerCardTwoSuit + ".png";

let playerOneCardOneImg =
  "images/" + playerOneCardOneNum + "a" + playerOneCardOneSuit + ".png";

let playerOneCardTwoImg =
  "images/" + playerOneCardTwoNum + "a" + playerOneCardTwoSuit + ".png";

document.getElementById("dealerCardOne").setAttribute("src", dealerCardOneImg);
document
  .getElementById("playerOneCardOne")
  .setAttribute("src", playerOneCardOneImg);
document
  .getElementById("playerOneCardTwo")
  .setAttribute("src", playerOneCardTwoImg);

const initialCards = [
  dealerCardOneNum,
  dealerCardTwoNum,
  playerOneCardOneNum,
  playerOneCardTwoNum,
];
let dealerAce = false;
let playerOneAce = false;

for (let i = 0; i < initialCards.length; i++) {
  if (initialCards[i] > 10) {
    initialCards[i] = 10;
  }
  if (initialCards[i] == 1) {
    if (i > 1) {
      playerOneAce = true;
    } else {
      dealerAce = true;
    }
  }
}

let dealerTotal = 0;
let hiddenDealerTotal = 0;
let dealerLowNum = 0;
let dealerHighNum = 0;
let hiddenDealerLow = 0;
let hiddenDealerHigh = 0;

if (dealerAce) {
  if (initialCards[0] == 1) {
    dealerLowNum += 1;
    dealerHighNum += 11;
    hiddenDealerLow += 1;
    hiddenDealerHigh += 11;
  } else {
    dealerLowNum += initialCards[0];
    dealerHighNum += initialCards[0];
    hiddenDealerLow += initialCards[0];
    hiddenDealerHigh += initialCards[0];
  }
  if (initialCards[1] == 1) {
    hiddenDealerLow += 1;
    hiddenDealerHigh += 11;
  } else {
    hiddenDealerLow += initialCards[1];
    hiddenDealerHigh += initialCards[1];
  }
  if ((initialCards[1] == 1) & (initialCards[0] == 1)) {
    hiddenDealerHigh = 12;
  }
  if (dealerHighNum == dealerLowNum) {
    dealerTotal = dealerHighNum;
  } else {
    dealerTotal = dealerLowNum + " or " + dealerHighNum;
  }
  hiddenDealerTotal = hiddenDealerLow + " or " + hiddenDealerHigh;
} else {
  dealerTotal = initialCards[0];
  hiddenDealerTotal = dealerTotal + initialCards[1];
}

let playerOneTotal = 0;
let playerOneLow = 0;
let playerOneHigh = 0;

if (playerOneAce) {
  if (initialCards[2] == 1) {
    playerOneLow += 1;
    playerOneHigh += 11;
  } else {
    playerOneLow += initialCards[2];
    playerOneHigh += initialCards[2];
  }
  if (initialCards[3] == 1) {
    playerOneLow += 1;
    playerOneHigh += 11;
  } else {
    playerOneLow += initialCards[3];
    playerOneHigh += initialCards[3];
  }
  if ((initialCards[2] == 1) & (initialCards[3] == 1)) {
    playerOneHigh = 12;
    playerOneLow = 2;
  }
  playerOneTotal = playerOneLow + " or " + playerOneHigh;
} else {
  playerOneTotal = initialCards[2] + initialCards[3];
  playerOneHigh = playerOneTotal;
  playerOneLow = playerOneTotal;
}

document.getElementById("dealerTotal").innerHTML = dealerTotal;
document.getElementById("playerOneTotal").innerHTML = playerOneTotal;

if ((hiddenDealerHigh == 21) & (playerOneHigh == 21)) {
  document.querySelector("h1").innerHTML = "Draw";
  document.getElementById("dealerTotal").innerHTML = "21";
  document.getElementById("playerOneTotal").innerHTML = "21";
  document
    .getElementById("dealerCardTwo")
    .setAttribute("src", dealerCardTwoImg);
} else if (hiddenDealerHigh == 21) {
  document
    .getElementById("dealerCardTwo")
    .setAttribute("src", dealerCardTwoImg);
  document.querySelector("h1").innerHTML = "Dealer BlackJack";
  document.getElementById("dealerTotal").innerHTML = "21";
} else if (playerOneHigh == 21) {
  document.querySelector("h1").innerHTML = "Player 1 Blackjack";
  document.getElementById("playerOneTotal").innerHTML = "21";
  document
    .getElementById("dealerCardTwo")
    .setAttribute("src", dealerCardTwoImg);
  document.getElementById("dealerTotal").innerHTML = hiddenDealerTotal;
}

let playerOneFinal = 0;

function hit() {
  let cardNum = Math.floor(Math.random() * 13) + 1;
  let cardSuit = Math.floor(Math.random() * 4) + 1;
  let cardImg = "images/" + cardNum + "a" + cardSuit + ".png";
  if (cardNum > 10) {
    cardNum = 10;
  }

  const playerOneCard = document.createElement("img");
  const playerOneElement = document.getElementById("playerOneExtraCards");
  playerOneElement.appendChild(playerOneCard);
  document
    .getElementById("playerOneExtraCards")
    .lastElementChild.setAttribute("src", cardImg);

  if (playerOneAce | (cardNum == 1)) {
    if (playerOneAce & (cardNum != 1)) {
      playerOneHigh += cardNum;
      playerOneLow += cardNum;
    } else if (!playerOneAce & (cardNum == 1)) {
      playerOneAce = true;
      playerOneLow += 1;
      playerOneHigh += 11;
    } else if (playerOneAce & (cardNum == 1)) {
      playerOneLow += 1;
      playerOneHigh += 1;
    }

    if (playerOneHigh < 22) {
      playerOneTotal = playerOneLow + " or " + playerOneHigh;
    } else {
      playerOneTotal = playerOneLow;
    }

    document.getElementById("playerOneTotal").innerHTML = playerOneTotal;
    if (playerOneLow >= 22) {
      document.querySelector("h1").innerHTML = "Player One Bust";
      gameOver()
    }
  } else {
    playerOneTotal += cardNum;
    document.getElementById("playerOneTotal").innerHTML = playerOneTotal;

    if (playerOneTotal >= 22) {
      document.querySelector("h1").innerHTML = "Player One Bust";
      gameOver()
    }
  }
}

function stand() {
  if (playerOneAce) {
    if (playerOneHigh <= 21) {
      playerOneTotal = playerOneHigh;
    } else {
      playerOneTotal = playerOneLow;
    }
    document.getElementById("playerOneTotal").innerHTML = playerOneTotal;
  }
  document
    .getElementById("dealerCardTwo")
    .setAttribute("src", dealerCardTwoImg);

  check();
  while (!isOver) {
    addDealerCard();
    check();
  }
}

function addDealerCard() {
  let newDealerNum = Math.floor(Math.random() * 13) + 1;
  let newDealerSuit = Math.floor(Math.random() * 4) + 1;
  let newDealerImg = "images/" + newDealerNum + "a" + newDealerSuit + ".png";

  if (newDealerNum > 10) {
    newDealerNum = 10;
  }

  const dealerCard = document.createElement("img");
  const dealerElement = document.getElementById("dealerExtraCards");
  dealerElement.appendChild(dealerCard);
  document
    .getElementById("dealerExtraCards")
    .lastElementChild.setAttribute("src", newDealerImg);

  if (dealerAce | (newDealerNum == 1)) {
    if (dealerAce & (newDealerNum != 1)) {
      hiddenDealerHigh += newDealerNum;
      hiddenDealerLow += newDealerNum;
    } else if (!dealerAce & (newDealerNum == 1)) {
      dealerAce = true;
      hiddenDealerLow += 1;
      hiddenDealerHigh += 11;
    } else if (dealerAce & (newDealerNum == 1)) {
      hiddenDealerLow += 1;
      hiddenDealerHigh += 1;
    }

    if (hiddenDealerHigh < 22) {
      hiddenDealerTotal = hiddenDealerLow + " or " + hiddenDealerHigh;
    } else {
      hiddenDealerTotal = hiddenDealerLow;
    }

    document.getElementById("dealerTotal").innerHTML = hiddenDealerTotal;
    if (hiddenDealerLow >= 22) {
      document.querySelector("h1").innerHTML = "Dealer Bust";

      gameOver()
    }
  } else {
    hiddenDealerTotal += newDealerNum;
    document.getElementById("dealerTotal").innerHTML = hiddenDealerTotal;

    if (hiddenDealerTotal >= 22) {
      document.querySelector("h1").innerHTML = "Dealer Bust";
      gameOver()
    }
  }
}

let isOver = false;

function check() {
  if (dealerAce) {
    if ((hiddenDealerHigh >= 17) & (hiddenDealerHigh <= 21)) {
      if (playerOneTotal > hiddenDealerHigh) {
        document.querySelector("h1").innerHTML = "Player 1 Wins";
      } else if (playerOneTotal < hiddenDealerHigh) {
        document.querySelector("h1").innerHTML = "Dealer Wins";
      } else {
        document.querySelector("h1").innerHTML = "Draw";
      }
      gameOver()
    }
    document.getElementById("dealerTotal").innerHTML = hiddenDealerHigh;
  } else {
    if ((hiddenDealerTotal >= 17) & (hiddenDealerTotal <= 21)) {
      if (playerOneTotal > hiddenDealerTotal) {
        document.querySelector("h1").innerHTML = "Player 1 Wins";
      } else if (playerOneTotal < hiddenDealerTotal) {
        document.querySelector("h1").innerHTML = "Dealer Wins";
      } else {
        document.querySelector("h1").innerHTML = "Draw";
      }
      gameOver()
    }
    document.getElementById("dealerTotal").innerHTML = hiddenDealerTotal;
  }
}

function gameOver() {
  document.getElementById("hitButton").disabled = true;
  document.getElementById("standButton").disabled = true;
  isOver = true;
}