// app.js - Caesar Cipher Tool Logic (Fixed Input Handling)

/* ------------------------- Utility Functions ------------------------- */
const $ = (selector) => document.querySelector(selector);

function showNotification(message, type = 'success') {
  const container = $('#notification-container');
  const notif = document.createElement('div');
  notif.className = `notification notification--${type}`;
  notif.textContent = message;
  container.appendChild(notif);

  // Trigger animation
  requestAnimationFrame(() => notif.classList.add('show'));

  // Auto-hide after 3s
  setTimeout(() => {
    notif.classList.add('hide');
    notif.addEventListener('animationend', () => notif.remove());
  }, 3000);
}

function validateShift(value) {
  const num = parseInt(value, 10);
  return !isNaN(num) && num >= 1 && num <= 25;
}

function caesarCipher(text, shift, isEncrypt = true) {
  if (!text) return '';
  
  const direction = isEncrypt ? 1 : -1;
  const actualShift = ((shift * direction) % 26 + 26) % 26;

  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpperCase = char >= 'A' && char <= 'Z';
    const base = isUpperCase ? 65 : 97;
    const charCode = char.charCodeAt(0) - base;
    const shiftedCode = (charCode + actualShift) % 26;
    return String.fromCharCode(shiftedCode + base);
  });
}

/* ------------------------- DOM Elements ------------------------- */
let inputTextEl, shiftEl, outputTextEl, encryptBtn, decryptBtn, clearBtn, copyBtn;

function initializeElements() {
  inputTextEl = $('#inputText');
  shiftEl = $('#shift');
  outputTextEl = $('#outputText');
  encryptBtn = $('#encryptBtn');
  decryptBtn = $('#decryptBtn');
  clearBtn = $('#clearBtn');
  copyBtn = $('#copyBtn');
}

/* ------------------------- Event Handlers ------------------------- */
function handleEncrypt() {
  const text = inputTextEl.value.trim();
  const shiftValue = shiftEl.value;

  // Clear previous error states
  inputTextEl.classList.remove('error');
  shiftEl.classList.remove('error');

  // Validation
  let isValid = true;
  
  if (!text) {
    inputTextEl.classList.add('error');
    isValid = false;
  }

  if (!validateShift(shiftValue)) {
    shiftEl.classList.add('error');
    isValid = false;
  }

  if (!isValid) {
    showNotification('Please correct the highlighted fields.', 'error');
    return;
  }

  // Show loading state
  encryptBtn.classList.add('is-loading');
  const originalText = encryptBtn.textContent;
  encryptBtn.textContent = 'Encrypting...';

  // Process encryption
  setTimeout(() => {
    const shift = parseInt(shiftValue, 10);
    const result = caesarCipher(text, shift, true);
    outputTextEl.value = result;
    showNotification('Encryption successful!', 'success');
    
    // Remove loading state
    encryptBtn.classList.remove('is-loading');
    encryptBtn.textContent = originalText;
  }, 300);
}

function handleDecrypt() {
  const text = inputTextEl.value.trim();
  const shiftValue = shiftEl.value;

  // Clear previous error states
  inputTextEl.classList.remove('error');
  shiftEl.classList.remove('error');

  // Validation
  let isValid = true;
  
  if (!text) {
    inputTextEl.classList.add('error');
    isValid = false;
  }

  if (!validateShift(shiftValue)) {
    shiftEl.classList.add('error');
    isValid = false;
  }

  if (!isValid) {
    showNotification('Please correct the highlighted fields.', 'error');
    return;
  }

  // Show loading state
  decryptBtn.classList.add('is-loading');
  const originalText = decryptBtn.textContent;
  decryptBtn.textContent = 'Decrypting...';

  // Process decryption
  setTimeout(() => {
    const shift = parseInt(shiftValue, 10);
    const result = caesarCipher(text, shift, false);
    outputTextEl.value = result;
    showNotification('Decryption successful!', 'success');
    
    // Remove loading state
    decryptBtn.classList.remove('is-loading');
    decryptBtn.textContent = originalText;
  }, 300);
}

function handleClear() {
  inputTextEl.value = '';
  outputTextEl.value = '';
  shiftEl.value = '3';
  
  // Clear error states
  inputTextEl.classList.remove('error');
  shiftEl.classList.remove('error');
  
  showNotification('Fields cleared.', 'info');
}

async function handleCopy() {
  const text = outputTextEl.value;
  
  if (!text) {
    showNotification('Nothing to copy!', 'error');
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showNotification('Copied to clipboard!', 'success');
  } catch (err) {
    showNotification('Failed to copy to clipboard.', 'error');
  }
}

/* ------------------------- Input Handling Fix ------------------------- */
function handleShiftInput(e) {
  // Allow only numeric input and prevent concatenation issues
  let value = e.target.value;
  
  // Remove any non-numeric characters
  value = value.replace(/[^0-9]/g, '');
  
  // Limit to reasonable length to prevent concatenation issues
  if (value.length > 2) {
    value = value.slice(0, 2);
  }
  
  // Set the cleaned value
  e.target.value = value;
  
  // Validate and update error state
  if (validateShift(value)) {
    shiftEl.classList.remove('error');
  }
}

function handleShiftKeydown(e) {
  // Allow: backspace, delete, tab, escape, enter
  if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)) {
    return;
  }
  
  // Ensure that it is a number and stop the keypress
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
}

/* ------------------------- Initialize Application ------------------------- */
function initializeApp() {
  initializeElements();
  
  // Attach event listeners
  encryptBtn.addEventListener('click', handleEncrypt);
  decryptBtn.addEventListener('click', handleDecrypt);
  clearBtn.addEventListener('click', handleClear);
  copyBtn.addEventListener('click', handleCopy);
  
  // Fixed shift input handling
  shiftEl.addEventListener('input', handleShiftInput);
  shiftEl.addEventListener('keydown', handleShiftKeydown);
  
  // Focus handling for shift input
  shiftEl.addEventListener('focus', () => {
    shiftEl.select(); // Select all text when focused for easy replacement
  });
  
  // Keyboard shortcut (Ctrl+Enter to encrypt)
  inputTextEl.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleEncrypt();
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}