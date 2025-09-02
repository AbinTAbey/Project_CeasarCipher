# Caesar Cipher Full-Stack Project

A complete web application for encrypting and decrypting text using the Caesar cipher algorithm.

## Features

- **Frontend**: Modern HTML, CSS, and JavaScript interface
- **Backend**: Python Flask API for Caesar cipher operations
- **Algorithms**: Uses the mathematical formulas C = (P + K) mod 26 for encryption and P = (C - K) mod 26 for decryption
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive UI**: Real-time validation, animations, and notifications

## Project Structure

```
caesar-cipher-project/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── app.py              # Python Flask backend
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Setup Instructions

### Frontend Setup

1. **Option 1: Direct Browser Access**
   - Simply open `index.html` in any modern web browser
   - The application will work in frontend-only mode

2. **Option 2: Local Server (Recommended)**
   ```bash
   # Using Python's built-in server
   python -m http.server 8000

   # Or using Node.js
   npx http-server
   ```
   - Navigate to `http://localhost:8000`

### Backend Setup

1. **Install Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Flask Server**
   ```bash
   python app.py
   ```
   - Server will start on `http://localhost:5000`

## API Endpoints

### Encrypt Text
- **URL**: `POST /api/encrypt`
- **Body**: 
  ```json
  {
    "text": "Hello World",
    "shift": 3
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "original_text": "Hello World",
    "encrypted_text": "Khoor Zruog",
    "shift": 3,
    "stats": {
      "total_chars": 11,
      "alphabetic_chars": 10,
      "non_alphabetic_chars": 1,
      "uppercase_chars": 2,
      "lowercase_chars": 8,
      "words": 2
    }
  }
  ```

### Decrypt Text
- **URL**: `POST /api/decrypt`
- **Body**: 
  ```json
  {
    "text": "Khoor Zruog",
    "shift": 3
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "original_text": "Khoor Zruog",
    "decrypted_text": "Hello World",
    "shift": 3,
    "stats": {
      "total_chars": 11,
      "alphabetic_chars": 10,
      "non_alphabetic_chars": 1,
      "uppercase_chars": 2,
      "lowercase_chars": 8,
      "words": 2
    }
  }
  ```

### Analyze Text
- **URL**: `POST /api/analyze`
- **Body**: 
  ```json
  {
    "text": "Hello World"
  }
  ```

### Brute Force Decrypt
- **URL**: `POST /api/brute-force`
- **Body**: 
  ```json
  {
    "text": "Khoor Zruog"
  }
  ```
- **Response**: Returns all possible decryptions with shifts 1-25

## Usage Examples

### Basic Encryption
1. Enter your text in the input field
2. Set the shift value (1-25)
3. Click "Encrypt" to get the encrypted text
4. Use "Copy to Clipboard" to copy the result

### Basic Decryption
1. Enter encrypted text in the input field
2. Set the same shift value used for encryption
3. Click "Decrypt" to get the original text

### Keyboard Shortcuts
- **Ctrl + Enter**: Encrypt text
- **Tab**: Navigate between fields

## Caesar Cipher Algorithm

The Caesar cipher is a substitution cipher where each letter is shifted a fixed number of positions in the alphabet.

### Mathematical Formulas

**Encryption**: `C = (P + K) mod 26`
- C = Cipher text character
- P = Plain text character  
- K = Shift key (1-25)

**Decryption**: `P = (C - K) mod 26`
- P = Plain text character
- C = Cipher text character
- K = Shift key (1-25)

### Example
- **Original text**: "HELLO"
- **Shift**: 3
- **Encrypted**: "KHOOR"
- **Process**: H→K, E→H, L→O, L→O, O→R

## Browser Compatibility

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile browsers**: iOS Safari, Chrome Mobile, Firefox Mobile
- **Required features**: ES6 support, CSS Grid, Flexbox

## Security Notes

⚠️ **Important**: The Caesar cipher is not secure for real-world applications. It's easily breakable and should only be used for educational purposes.

## Development

### Debug Mode
Add `?debug=true` to the URL to enable debug mode with console logging.

### Frontend Only Mode
The application can work entirely in the browser without the backend server. The JavaScript includes all necessary cipher logic.

## License

This project is for educational purposes. Feel free to use and modify as needed.

## Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the Flask server is running and CORS is enabled
2. **Port Conflicts**: Change the port in `app.py` if 5000 is already in use
3. **Dependencies**: Install all requirements using `pip install -r requirements.txt`

### Browser Console Errors

Check the browser's developer console for JavaScript errors and ensure all files are properly loaded.

## 🔎 Project Samples  

 
![image alt](https://github.com/AbinTAbey/Project_CeasarCipher/blob/029ede66325d0fbfeed85550ee7c0e82003b2675/src/Cipher1.PNG)
  
![image alt](https://github.com/AbinTAbey/Project_CeasarCipher/blob/029ede66325d0fbfeed85550ee7c0e82003b2675/src/Cipher2.PNG)

![image alt](https://github.com/AbinTAbey/Project_CeasarCipher/blob/029ede66325d0fbfeed85550ee7c0e82003b2675/src/Cipher3.PNG)

    
