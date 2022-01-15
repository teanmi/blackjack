let dealerCardOneNum = Math.floor(Math.random() * 13) + 1;
let dealerCardOneSuit = Math.floor(Math.random() * 4) + 1;

let dealerCardTwoNum = Math.floor(Math.random() * 13) + 1;
let dealerCardOTwoSuit = Math.floor(Math.random() * 4) + 1;

let playerOneCardOneNum = Math.floor(Math.random() * 13) + 1;
let playerOneCardOneSuit = Math.floor(Math.random() * 4) + 1;

let playerOneCardTwoNum = Math.floor(Math.random() * 13) + 1;
let playerOneCardTwoSuit = Math.floor(Math.random() * 4) + 1;

let dealerCardOneImg =
  "images/" + dealerCardOneNum + "a" + dealerCardOneSuit + ".png";

let dealerCardTwoImg =
  "images/" + dealerCardOneNum + "a" + dealerCardOneSuit + ".png";

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
    initialCards[i] = 11; //Change value =
    if (i > 1) {
      playerOneAce = true;
    } else {
      dealerAce = true;
    }
  }
}

let dealerTotal = 0;

if (dealerAce) {
  let dealerLowNum = 0;
  let dealerHighNum = 0;
  let hiddenDealerLow = 0;
  let hiddenDealerHigh = 0;

  if (initialCards[0] == 11) {
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
  if ((initialCards[1] = 11)) {
    hiddenDealerLow += 1;
    hiddenDealerHigh += 11;
  } else {
    hiddenDealerLow += initialCards[1];
    hiddenDealerHigh += initialCards[1];
  }
  if ((initialCards[1] = 11 & (initialCards[0] == 11))) {
    hiddenDealerHigh = 12;
  }
  if (dealerHighNum == dealerLowNum) {
    dealerTotal = dealerHighNum;
  } else {
    dealerTotal = dealerLowNum + " or " + dealerHighNum;
  }
} else {
  let hiddenDealerTotal = 0;

  dealerTotal = initialCards[0];
  hiddenDealerTotal = dealerTotal + initialCards[1];
}

let playerOneTotal = 0;

if (playerOneAce) {
} else {
  playerOneTotal = initialCards[2] + initialCards[3];
}

document.getElementById("dealerTotal").innerHTML = dealerTotal;
document.getElementById("playerOneTotal").innerHTML = playerOneTotal;
