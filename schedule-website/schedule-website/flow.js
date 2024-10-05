const mockTypingAfter = 500;
const mockResponseAfter = 500;
const mockOpeningMessage =
  "Hello there. I am Speed. Ask me anything you want.";
const mockResponsePrefix = "Thanks for sending me: ";

document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('sendButton');
    let waitingOnResponse = false;

    function appendMessage(role, body) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'rounded-lg', 'py-2', 'px-6', 'mb-4');
        if (role === 'assistant') {
            messageDiv.classList.add('assistant', 'bg-blue-100', 'border-blue-100', 'self-start');
        } else {
            messageDiv.classList.add('user', 'bg-green-200', 'border-green-200', 'self-end');
        }
        messageDiv.textContent = body;
        chatContainer.appendChild(messageDiv);
    }

    function typeOutResponse(message) {
        appendMessage('assistant', '');
        const responseMessage = chatContainer.lastChild;
        let i = 0;
        const interval = setInterval(() => {
            responseMessage.textContent += message.charAt(i);
            i++;
            if (i > message.length - 1) {
                waitingOnResponse = false;
                clearInterval(interval);
            }
        }, 30);
    }

    function mockResponse(message) {
        setTimeout(() => {
            waitingOnResponse = true;
        }, mockTypingAfter);
        setTimeout(() => {
            if (!message) {
                message = mockResponsePrefix + chatContainer.lastChild.textContent;
            }
            typeOutResponse(message);
        }, mockResponseAfter);
    }

    function sendMessage() {
        if (waitingOnResponse) return;
        const userMessage = messageInput.value;
        if (userMessage.trim() === '') return;
        appendMessage('user', userMessage);
        messageInput.value = '';
        mockResponse();
    }

    messageInput.addEventListener('input', function () {
        sendButton.disabled = messageInput.value.trim() === '';
    });

    messageInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    sendButton.addEventListener('click', sendMessage);

    // Initialize with an opening message
    mockResponse(mockOpeningMessage);
});