const { FeloClient } = require('./felo');

(async () => {
  const client = new FeloClient();
  /*
  await client.login('example@gmail.com', 'sha256'); // Opsional
  */

  const { answer, sources } = await client.search('kamu siapa?', {
    onChunk: chunk => process.stdout.write(chunk)
  });
  
  process.stdout.write('\n');
  await client.logout();
})().catch(console.error);