// Configuration
const API_ENDPOINT = '/api/query';

// DOM Elements
const queryForm = document.getElementById('queryForm');
const queryInput = document.getElementById('queryInput');
const chatMessages = document.getElementById('chatMessages');
const sendButton = document.getElementById('sendButton');
const buttonText = document.getElementById('buttonText');
const buttonSpinner = document.getElementById('buttonSpinner');

// Initialize
let messageId = 1;

// Event Listeners
queryForm.addEventListener('submit', handleSubmit);

// Set example query
function setExampleQuery(button) {
    queryInput.value = button.textContent.trim();
    queryInput.focus();
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    const query = queryInput.value.trim();
    if (!query) return;

    // Add user message to chat
    addMessage('user', query);
    
    // Clear input and disable form
    queryInput.value = '';
    setLoading(true);

    try {
        const response = await sendQuery(query);
        
        // Add assistant response to chat
        if (response.error) {
            addMessage('error', `Error: ${response.error.message || 'Unknown error occurred'}`);
        } else if (response.result) {
            addMessage('assistant', formatResponse(response.result));
        } else {
            addMessage('assistant', formatResponse(response));
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('error', `Connection error: ${error.message}`);
    } finally {
        setLoading(false);
        queryInput.focus();
    }
}

// Send query to API
async function sendQuery(text) {
    const payload = {
        jsonrpc: "2.0",
        id: String(messageId++),
        method: "message/send",
        params: {
            message: {
                kind: "message",
                messageId: generateUUID(),
                role: "user",
                parts: [
                    {
                        kind: "text",
                        text: text
                    }
                ]
            }
        }
    };

    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
}

// Add message to chat
function addMessage(type, content) {
    // Remove welcome message if it exists
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    const messageDiv = document.createElement('div');
    
    if (type === 'error') {
        messageDiv.className = 'message-error';
        messageDiv.textContent = content;
    } else {
        messageDiv.className = `message message-${type}`;
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (typeof content === 'string') {
            contentDiv.innerHTML = content;
        } else {
            contentDiv.textContent = content;
        }
        
        messageDiv.appendChild(contentDiv);
    }
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Format response - ONLY show the text field value
function formatResponse(response) {
    // Extract the text value from the response
    const textValue = extractTextValue(response);
    
    if (!textValue) {
        return '<p class="empty-response">No text content found in response</p>';
    }
    
    // Return ONLY the text value, escaped for safety
    return `<div class="text-only-response">${escapeHtml(textValue)}</div>`;
}

// Extract ONLY the text field value from the response
function extractTextValue(obj) {
    if (!obj) return null;
    
    // If it's already a string, return it
    if (typeof obj === 'string') {
        return obj;
    }
    
    // Check for text in result.message.parts[0].text (JSON-RPC structure)
    if (obj.result && obj.result.message && obj.result.message.parts && Array.isArray(obj.result.message.parts)) {
        for (const part of obj.result.message.parts) {
            if (part.text) {
                return part.text;
            }
        }
    }
    
    // Check for direct text fields in common locations
    if (obj.text) return obj.text;
    if (obj.result && obj.result.text) return obj.result.text;
    if (obj.result && typeof obj.result === 'string') return obj.result;
    
    // Recursively search for the first 'text' field
    return findFirstTextField(obj);
}

// Recursively find the first 'text' field in an object
function findFirstTextField(obj, depth = 0, maxDepth = 10) {
    if (depth > maxDepth || !obj) return null;
    
    // If this is an object, check for 'text' key
    if (typeof obj === 'object' && !Array.isArray(obj)) {
        if (obj.text && typeof obj.text === 'string') {
            return obj.text;
        }
        
        // Check all keys
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const result = findFirstTextField(obj[key], depth + 1, maxDepth);
                if (result) return result;
            }
        }
    }
    
    // If this is an array, check each element
    if (Array.isArray(obj)) {
        for (const item of obj) {
            const result = findFirstTextField(item, depth + 1, maxDepth);
            if (result) return result;
        }
    }
    
    return null;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Set loading state
function setLoading(isLoading) {
    sendButton.disabled = isLoading;
    queryInput.disabled = isLoading;
    
    if (isLoading) {
        buttonText.classList.add('hidden');
        buttonSpinner.classList.remove('hidden');
    } else {
        buttonText.classList.remove('hidden');
        buttonSpinner.classList.add('hidden');
    }
}

// Generate UUID v4
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

