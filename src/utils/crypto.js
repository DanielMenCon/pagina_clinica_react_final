/*
  Utilidades de criptografía ligera para cliente.
  Implementa hashing SHA-256 usando SubtleCrypto (Web Crypto API).
  Nota: El hashing en cliente es un refuerzo; siempre realizar hashing y manejo seguro en servidor.
*/
export async function hashPassword(password) {
    if (typeof password !== 'string') return null;
    const enc = new TextEncoder();
    const data = enc.encode(password);
    const hashBuffer = await (window.crypto || window.msCrypto).subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
