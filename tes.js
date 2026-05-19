const { FeloClient } = require('./felo');

(async () => {
  const client = new FeloClient();
  
  await client.login('xnnn2006@gmail.com', 'EOBIN12345'); // Opsional
  

  const { answer, sources } = await client.search('kamu siapa?', {
    onChunk: chunk => process.stdout.write(chunk)
  });
  
  process.stdout.write('\n');
  await client.logout();
})().catch(console.error);
