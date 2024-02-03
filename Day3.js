const { exec } = require('child_process');

function executeCommand(command) {
    const childProcess = exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
            return;
        }
        console.log(`Command Output:\n${stdout}`);
    });

    childProcess.stdout.on('data', (data) => {
        console.log(`Command Output:\n${data}`);
    });

    childProcess.stderr.on('data', (data) => {
        console.error(`Command stderr: ${data}`);
    });
}

// Test cases
executeCommand('dir');
executeCommand('echo "Hello, Node.js!"');
