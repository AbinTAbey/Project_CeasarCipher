// Caesar Cipher JavaScript Implementation
// Using the formulas: C = (P + K) mod 26 for encryption, P = (C - K) mod 26 for decryption

class CaesarCipher {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.inputText = document.getElementById('inputText');
        this.shiftValue = document.getElementById('shiftValue');
        this.outputText = document.getElementById('outputText');
        this.encryptBtn = document.getElementById('encryptBtn');
        this.decryptBtn = document.getElementById('decryptBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.notification = document.getElementById('notification');
    }

    attachEventListeners() {
        this.encryptBtn.addEventListener('click', () => this.encrypt());
        this.decryptBtn.addEventListener('click', () => this.decrypt());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());

        // Add input validation
        this.shiftValue.addEventListener('input', () => this.validateShift());
        this.inputText.addEventListener('input', () => this.validateInput());

        // Add Enter key support
        this.inputText.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.encrypt();
            }
        });
    }

    // Core Caesar Cipher Encryption: C = (P + K) mod 26
    caesarEncrypt(text, shift) {
        return text.split('').map(char => {
            if (char.match(/[a-zA-Z]/)) {
                const code = char.charCodeAt(0);
                const base = code >= 65 && code <= 90 ? 65 : 97; // A=65, a=97
                return String.fromCharCode(((code - base + shift) % 26) + base);
            }
            return char; // Non-alphabetic characters remain unchanged
        }).join('');
    }

    // Core Caesar Cipher Decryption: P = (C - K) mod 26
    caesarDecrypt(text, shift) {
        return text.split('').map(char => {
            if (char.match(/[a-zA-Z]/)) {
                const code = char.charCodeAt(0);
                const base = code >= 65 && code <= 90 ? 65 : 97; // A=65, a=97
                return String.fromCharCode(((code - base - shift + 26) % 26) + base);
            }
            return char; // Non-alphabetic characters remain unchanged
        }).join('');
    }

    encrypt() {
        const text = this.inputText.value;
        const shift = parseInt(this.shiftValue.value);

        if (!this.validateInputs(text, shift)) {
            return;
        }

        try {
            // Add loading state
            this.setLoadingState(this.encryptBtn, true);

            // Simulate slight delay for better UX
            setTimeout(() => {
                const encrypted = this.caesarEncrypt(text, shift);
                this.outputText.value = encrypted;
                this.showNotification('Text encrypted successfully!', 'success');
                this.setLoadingState(this.encryptBtn, false);
                this.outputText.classList.add('fade-in');
            }, 200);

        } catch (error) {
            this.showNotification('Encryption failed. Please try again.', 'error');
            this.setLoadingState(this.encryptBtn, false);
        }
    }

    decrypt() {
        const text = this.inputText.value;
        const shift = parseInt(this.shiftValue.value);

        if (!this.validateInputs(text, shift)) {
            return;
        }

        try {
            // Add loading state
            this.setLoadingState(this.decryptBtn, true);

            // Simulate slight delay for better UX
            setTimeout(() => {
                const decrypted = this.caesarDecrypt(text, shift);
                this.outputText.value = decrypted;
                this.showNotification('Text decrypted successfully!', 'success');
                this.setLoadingState(this.decryptBtn, false);
                this.outputText.classList.add('fade-in');
            }, 200);

        } catch (error) {
            this.showNotification('Decryption failed. Please try again.', 'error');
            this.setLoadingState(this.decryptBtn, false);
        }
    }

    clearAll() {
        this.inputText.value = '';
        this.outputText.value = '';
        this.shiftValue.value = '3';
        this.showNotification('All fields cleared!', 'success');
    }

    async copyToClipboard() {
        const text = this.outputText.value;

        if (!text) {
            this.showNotification('No text to copy!', 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Text copied to clipboard!', 'success');
        } catch (error) {
            // Fallback for older browsers
            this.fallbackCopyTextToClipboard(text);
        }
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            this.showNotification('Text copied to clipboard!', 'success');
        } catch (error) {
            this.showNotification('Failed to copy text!', 'error');
        }

        document.body.removeChild(textArea);
    }

    validateInputs(text, shift) {
        if (!text.trim()) {
            this.showNotification('Please enter some text to encrypt/decrypt!', 'error');
            this.inputText.focus();
            return false;
        }

        if (!shift || shift < 1 || shift > 25) {
            this.showNotification('Please enter a valid shift value (1-25)!', 'error');
            this.shiftValue.focus();
            return false;
        }

        return true;
    }

    validateShift() {
        const shift = parseInt(this.shiftValue.value);
        if (shift < 1 || shift > 25) {
            this.shiftValue.style.borderColor = '#ff4b2b';
        } else {
            this.shiftValue.style.borderColor = '#e0e0e0';
        }
    }

    validateInput() {
        const text = this.inputText.value.trim();
        if (text.length === 0) {
            this.inputText.style.borderColor = '#e0e0e0';
        } else {
            this.inputText.style.borderColor = '#667eea';
        }
    }

    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showNotification(message, type) {
        this.notification.textContent = message;
        this.notification.className = `notification ${type}`;
        this.notification.classList.add('show');

        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }
}

// Additional utility functions
class CipherAnalyzer {
    static analyzeText(text) {
        const stats = {
            totalChars: text.length,
            alphabeticChars: (text.match(/[a-zA-Z]/g) || []).length,
            nonAlphabeticChars: text.length - (text.match(/[a-zA-Z]/g) || []).length,
            uppercaseChars: (text.match(/[A-Z]/g) || []).length,
            lowercaseChars: (text.match(/[a-z]/g) || []).length,
            words: text.split(/\s+/).filter(word => word.length > 0).length
        };

        return stats;
    }

    static frequencyAnalysis(text) {
        const frequency = {};
        const alphabeticText = text.toLowerCase().replace(/[^a-z]/g, '');

        for (let char of alphabeticText) {
            frequency[char] = (frequency[char] || 0) + 1;
        }

        return frequency;
    }

    static suggestDecryption(cipherText) {
        const suggestions = [];

        // Try all possible shifts
        for (let shift = 1; shift <= 25; shift++) {
            const cipher = new CaesarCipher();
            const decrypted = cipher.caesarDecrypt(cipherText, shift);
            suggestions.push({
                shift: shift,
                text: decrypted,
                score: this.calculateReadabilityScore(decrypted)
            });
        }

        // Sort by readability score
        return suggestions.sort((a, b) => b.score - a.score);
    }

    static calculateReadabilityScore(text) {
        // Simple readability scoring based on common English patterns
        const commonWords = ['the', 'and', 'is', 'in', 'to', 'of', 'it', 'you', 'that', 'he', 'was', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'i', 'at', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'said', 'there', 'use', 'an', 'each', 'which', 'she', 'do', 'how', 'their', 'if', 'will', 'up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would', 'make', 'like', 'into', 'him', 'has', 'two', 'more', 'go', 'no', 'way', 'could', 'my', 'than', 'first', 'been', 'call', 'who', 'oil', 'its', 'now', 'find', 'long', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part'];

        const words = text.toLowerCase().split(/\s+/);
        let score = 0;

        for (let word of words) {
            if (commonWords.includes(word)) {
                score += 2;
            }
            // Bonus for reasonable word lengths
            if (word.length >= 3 && word.length <= 8) {
                score += 1;
            }
        }

        return score;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const caesarCipher = new CaesarCipher();

    // Add some visual flair
    const container = document.querySelector('.container');
    container.classList.add('fade-in');

    // Add keyboard shortcuts info
    console.log('Caesar Cipher Tool loaded!');
    console.log('Keyboard shortcuts:');
    console.log('- Ctrl + Enter: Encrypt text');
    console.log('- Press Tab to navigate between fields');

    // Add development mode features
    if (window.location.search.includes('debug=true')) {
        console.log('Debug mode enabled');
        window.cipher = caesarCipher;
        window.analyzer = CipherAnalyzer;
    }
});

// Export for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CaesarCipher, CipherAnalyzer };
}