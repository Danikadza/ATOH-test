const { exec } = require('child_process');
const fs = require('fs');

const generateTokenCommand = 'yc iam create-token';
const envFilePath = '.env';
const tokenVariableName = 'YDB_ACCESS_TOKEN_CREDENTIALS';

// Execute "yc iam create-token" command
exec(generateTokenCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error}`);
    return;
  }

  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }

  const generatedToken = stdout.trim();

  // Read .env file
  fs.readFile(envFilePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error(`Error reading .env file: ${err}`);
      return;
    }

    let envContent = data || '';

    // Check if token variable already exists in .env file
    const tokenVariableRegex = new RegExp(`${tokenVariableName}\\s*=\\s*(.*)`);
    if (tokenVariableRegex.test(envContent)) {
      // Replace existing token value
      envContent = envContent.replace(tokenVariableRegex, `${tokenVariableName}=${generatedToken}`);
    } else {
      // Append new token variable
      envContent += `${tokenVariableName}=${generatedToken}\n`;
    }

    // Write updated .env file
    fs.writeFile(envFilePath, envContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing to .env file: ${err}`);
        return;
      }
      console.log('Token successfully saved to .env file.');
    });
  });
});
