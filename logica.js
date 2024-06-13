const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function getDeck() {
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function dealCards() {
    const deck = shuffleDeck(getDeck());
    const playerCards = deck.slice(0, 2);
    const aiCards = deck.slice(2, 4);
    const communityCards = deck.slice(4, 9);
    
    renderCards('player-cards', playerCards);
    renderCards('ai-cards', aiCards);
    renderCards('community-cards', communityCards);

    // Simulate AI decision
    const aiDecision = aiPlay(aiCards, communityCards);
    alert(`La IA decide: ${aiDecision}`);
}

function renderCards(elementId, cards) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    for (let card of cards) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerText = `${card.value}${card.suit}`;
        element.appendChild(cardDiv);
    }
}

function aiPlay(aiCards, communityCards) {
    // Basic AI logic for demonstration: decides to "call" if it has an Ace or King in hand, otherwise "fold".
    const aiHand = [...aiCards, ...communityCards];
    const aiValues = aiHand.map(card => card.value);

    if (aiValues.includes('A') || aiValues.includes('K')) {
        return 'call';
    } else {
        return 'fold';
    }
}
