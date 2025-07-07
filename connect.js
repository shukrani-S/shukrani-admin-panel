const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');

let currentQR = null;
let currentPairingCode = null;

async function startSock() {
  const { state, saveCreds } = await useMultiFileAuthState('auth');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
  });

  sock.ev.on('connection.update', (update) => {
    const { qr, pairingCode } = update;

    if (qr) currentQR = qr;
    if (pairingCode) currentPairingCode = pairingCode;
  });

  sock.ev.on('creds.update', saveCreds);

  return sock;
}

function getQR() {
  return currentQR;
}

function getPairCode() {
  return currentPairingCode;
}

module.exports = { startSock, getQR, getPairCode };
