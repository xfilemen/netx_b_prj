import CryptoJS from 'crypto-js';

export function encrypt(text, secret) {
  return CryptoJS.AES.encrypt(text, secret).toString();
}

export function decrypt(ciphertext, secret) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
}