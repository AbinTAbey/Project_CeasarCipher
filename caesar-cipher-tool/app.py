from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class CaesarCipherBackend:
    """
    Caesar Cipher Backend Implementation
    Using the formulas: C = (P + K) mod 26 for encryption, P = (C - K) mod 26 for decryption
    """

    @staticmethod
    def encrypt(text, shift):
        """
        Encrypt text using Caesar cipher
        Formula: C = (P + K) mod 26
        """
        if not isinstance(text, str) or not isinstance(shift, int):
            raise ValueError("Invalid input parameters")

        if shift < 1 or shift > 25:
            raise ValueError("Shift value must be between 1 and 25")

        result = ""
        for char in text:
            if char.isalpha():
                # Determine if uppercase or lowercase
                ascii_offset = ord('A') if char.isupper() else ord('a')
                # Apply Caesar cipher formula: C = (P + K) mod 26
                encrypted_char = chr((ord(char) - ascii_offset + shift) % 26 + ascii_offset)
                result += encrypted_char
            else:
                # Non-alphabetic characters remain unchanged
                result += char

        return result

    @staticmethod
    def decrypt(text, shift):
        """
        Decrypt text using Caesar cipher
        Formula: P = (C - K) mod 26
        """
        if not isinstance(text, str) or not isinstance(shift, int):
            raise ValueError("Invalid input parameters")

        if shift < 1 or shift > 25:
            raise ValueError("Shift value must be between 1 and 25")

        result = ""
        for char in text:
            if char.isalpha():
                # Determine if uppercase or lowercase
                ascii_offset = ord('A') if char.isupper() else ord('a')
                # Apply Caesar cipher formula: P = (C - K) mod 26
                decrypted_char = chr((ord(char) - ascii_offset - shift) % 26 + ascii_offset)
                result += decrypted_char
            else:
                # Non-alphabetic characters remain unchanged
                result += char

        return result

    @staticmethod
    def analyze_text(text):
        """
        Analyze text for basic statistics
        """
        stats = {
            'total_chars': len(text),
            'alphabetic_chars': len(re.findall(r'[a-zA-Z]', text)),
            'non_alphabetic_chars': len(text) - len(re.findall(r'[a-zA-Z]', text)),
            'uppercase_chars': len(re.findall(r'[A-Z]', text)),
            'lowercase_chars': len(re.findall(r'[a-z]', text)),
            'words': len(text.split()) if text.strip() else 0
        }
        return stats

@app.route('/')
def home():
    """
    Home endpoint with API information
    """
    return jsonify({
        'message': 'Caesar Cipher API',
        'version': '1.0',
        'endpoints': {
            'encrypt': '/api/encrypt',
            'decrypt': '/api/decrypt',
            'analyze': '/api/analyze'
        },
        'formulas': {
            'encryption': 'C = (P + K) mod 26',
            'decryption': 'P = (C - K) mod 26'
        }
    })

@app.route('/api/encrypt', methods=['POST'])
def encrypt_text():
    """
    Encrypt text using Caesar cipher
    Expected JSON: {"text": "Hello World", "shift": 3}
    """
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        text = data.get('text', '')
        shift = data.get('shift', 0)

        if not text:
            return jsonify({'error': 'Text field is required'}), 400

        if not isinstance(shift, int) or shift < 1 or shift > 25:
            return jsonify({'error': 'Shift must be an integer between 1 and 25'}), 400

        encrypted_text = CaesarCipherBackend.encrypt(text, shift)
        text_stats = CaesarCipherBackend.analyze_text(text)

        return jsonify({
            'success': True,
            'original_text': text,
            'encrypted_text': encrypted_text,
            'shift': shift,
            'stats': text_stats
        })

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/decrypt', methods=['POST'])
def decrypt_text():
    """
    Decrypt text using Caesar cipher
    Expected JSON: {"text": "Khoor Zruog", "shift": 3}
    """
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        text = data.get('text', '')
        shift = data.get('shift', 0)

        if not text:
            return jsonify({'error': 'Text field is required'}), 400

        if not isinstance(shift, int) or shift < 1 or shift > 25:
            return jsonify({'error': 'Shift must be an integer between 1 and 25'}), 400

        decrypted_text = CaesarCipherBackend.decrypt(text, shift)
        text_stats = CaesarCipherBackend.analyze_text(text)

        return jsonify({
            'success': True,
            'original_text': text,
            'decrypted_text': decrypted_text,
            'shift': shift,
            'stats': text_stats
        })

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/analyze', methods=['POST'])
def analyze_text():
    """
    Analyze text for basic statistics
    Expected JSON: {"text": "Hello World"}
    """
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        text = data.get('text', '')

        if not text:
            return jsonify({'error': 'Text field is required'}), 400

        stats = CaesarCipherBackend.analyze_text(text)

        return jsonify({
            'success': True,
            'text': text,
            'stats': stats
        })

    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/brute-force', methods=['POST'])
def brute_force_decrypt():
    """
    Attempt to decrypt text using all possible shifts (1-25)
    Expected JSON: {"text": "Khoor Zruog"}
    """
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        text = data.get('text', '')

        if not text:
            return jsonify({'error': 'Text field is required'}), 400

        results = []
        for shift in range(1, 26):
            decrypted = CaesarCipherBackend.decrypt(text, shift)
            results.append({
                'shift': shift,
                'decrypted_text': decrypted
            })

        return jsonify({
            'success': True,
            'original_text': text,
            'all_possibilities': results
        })

    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({'error': 'Method not allowed'}), 405

if __name__ == '__main__':
    print("Caesar Cipher API Server")
    print("========================")
    print("Available endpoints:")
    print("- GET  /                 : API information")
    print("- POST /api/encrypt      : Encrypt text")
    print("- POST /api/decrypt      : Decrypt text")
    print("- POST /api/analyze      : Analyze text")
    print("- POST /api/brute-force  : Brute force decrypt")
    print("\nFormulas used:")
    print("- Encryption: C = (P + K) mod 26")
    print("- Decryption: P = (C - K) mod 26")
    print("\nServer starting on http://localhost:5000")
    print("========================")

    app.run(debug=True, host='0.0.0.0', port=5000)
