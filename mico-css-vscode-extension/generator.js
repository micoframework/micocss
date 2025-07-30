const fs = require('fs');

const cssFile = 'mico.css'; // Your full CSS framework file
const outputFile = 'data.json';

const css = fs.readFileSync(cssFile, 'utf8');

// Regexes to extract classes and variables
const classRegex = /\.([a-zA-Z0-9\-_:]+)/g;
const varRegex = /--[a-zA-Z0-9\-]+(?=\s*[:=])/g;

const classSet = new Set();
const varSet = new Set();

// Match classes
let match;
while ((match = classRegex.exec(css)) !== null) {
    if (!match[1].includes("@")) classSet.add(match[1]);
}

// Match variables
while ((match = varRegex.exec(css)) !== null) {
    varSet.add(`--${match[0].replace(/^--/, "")}`);
}

const result = {
    utilityClasses: Array.from(classSet),
    cssVariables: Array.from(varSet)
};

fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log("✅ data.json created from CSS");
