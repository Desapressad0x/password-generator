console.clear();
const https = require('https');
const path = require('path');

if (process.argv.length < 3) {
  console.log(`Specify the password length.\n\nUse: node ${path.basename(__filename)} [length]`);
  process.exit(1);
}

/**
 * @returns {Promise<void>} - Realiza o request pra obter o número
 */
function numero_aleatorio(min, max) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`, (resp) => {
      let texto = '';
      resp.on('data', (chunk) => {
        texto += chunk;
      });
      resp.on('end', () => {
        resolve(texto);
      });
    }).on('error', (error) => {
      console.log(error);
      process.exit(1); 
    });
  });
}

/**
 * @returns {string} - Retorna a senha gerada
 */
async function gerar(tamanho) {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let senha = '';

  for (let i = 0; i < tamanho; i++) {
    const rand = await numero_aleatorio(0, str.length - 1);
    senha += str.charAt(rand);
  }

  return senha;
}

gerar(process.argv[2]).then((s) => {
  console.log('Generated password:', s);
});
