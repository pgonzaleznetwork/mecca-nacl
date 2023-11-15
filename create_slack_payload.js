const fs = require('fs');

let slackPayload = {
    text: 'Deployment validation in UAT',
    blocks: []
}

let summaryBlock = {
    type: 'section',
    text: {
        type: 'mrkdwn',
        text: 'A deployment validation has started in UAT. The following files are being deployed:'
    }
}

slackPayload.blocks.push(summaryBlock);

// Specify the path to your text file
const filePath = 'changed_files.txt';

try {
  // Read the file synchronously
  const data = fs.readFileSync(filePath, 'utf8');

  // Split the content into an array of lines
  const lines = data.split('\n');

  // Process each line
  lines.forEach((line) => {

    if(line == 'README.md' || line == ''){
        return;
    }

    console.log('Processing line:', line)

    let block = {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '`'+line+'`'
        }
    }

    slackPayload.blocks.push(block);

  });

  console.log('Finished reading the file.');
} catch (err) {
  console.error('Error reading the file:', err);
}



// Convert the object to a JSON string
const jsonData = JSON.stringify(slackPayload); 

// Write the JSON string to the file
fs.writeFileSync('slackPayload.json', jsonData, 'utf-8');
