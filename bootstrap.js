// Using dynamic import to load Babel register setup
import('@babel/register').then(register => {
  register.default({
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  });

  // Then load the server
  import('./server.js');
}).catch(error => {
  console.error('Error setting up Babel register:', error);
});
