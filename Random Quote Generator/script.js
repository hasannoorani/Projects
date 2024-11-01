const quotes = [
    {
        text: "We cannot solve problems with the kind of thinking we employed when we came up with them.",
        author: "Albert Einstein"
    },
    {
        text: "The best and most beautiful things in the world cannot be seen or even heard, but must be felt with the heart.",
        author: "Helen Keller"
    },
    {
        text: "To succeed in your mission, you must have single-minded devotion to your goal.",
        author: "Dr.A.P.J.Abdul Kalam"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        text: "If everyone is moving forward together, then success takes care of itself.",
        author: "Henry Ford"
    },
    {
        text: "I can accept failure, everyone fails at something. But I can't accept not trying.",
        author: "Michael Jordan"
    },
    {
        text: "Arise, Awake and Stop not until the goal is reached.",
        author: "Swami Vivekananda"
    },
    {
        text: "You must be the change you want to see in the world.",
        author: "Mahatma Gandhi"
    },
    {
        text: "Opportunities do not happen. You create them.",
        author: "Chris Grosser"
    },
    {
        text: "Your time is limited, so don’t waste it living someone else’s life.",
        author: "Steve Jobs"
    }
];

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");

    quoteElement.textContent = quotes[randomIndex].text;
    authorElement.textContent = `- ${quotes[randomIndex].author}`;
}
