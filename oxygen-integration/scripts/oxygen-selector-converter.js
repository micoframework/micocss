/**
 * =============================================================================
 * Mico CSS to Oxygen Builder Selector JSON Converter
 * =============================================================================
 *
 * Author: Your Name / Gemini
 * Version: 4.0.0
 * - Implemented stable, deterministic IDs via hashing.
 * - Added intelligent grouping of selectors into multiple collections.
 * - Added functionality to output a main file and separate files for each collection.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// --- CONFIGURATION ---
const config = {
    inputFile: path.resolve(__dirname, '..', 'css', '../../dist/css/mico.min.css'),
    outputFile: path.resolve(__dirname, '..', '../dist/js/mico-oxygen-selectors.json'),
    outputDir: path.resolve(__dirname, '..', '../dist/js/oxygen-selectors'),
};
// --- END CONFIGURATION ---

const selectorCollectionMap = {
    'p': 'Spacing', 'm': 'Spacing', 'gap': 'Spacing', 'container': 'Spacing',
    'bg': 'Backgrounds',
    'text': 'Typography', 'fs': 'Typography', 'fw': 'Typography', 'lh': 'Typography', 'ls': 'Typography', 'f': 'Typography', 'font': 'Typography', 'list': 'Typography', 'decoration': 'Typography', 'underline': 'Typography', 'whitespace': 'Typography', 'break': 'Typography', 'align': 'Typography & Flexbox', 'indent': 'Typography', 'caps': 'Typography', 'ligatures': 'Typography', 'writing': 'Typography', 'orientation': 'Typography', 'hyphens': 'Typography',
    'w': 'Sizing', 'h': 'Sizing', 'min-w': 'Sizing', 'min-h': 'Sizing', 'max-w': 'Sizing', 'max-h': 'Sizing', 'aspect-ratio': 'Sizing',
    'border': 'Borders & Shadows', 'rounded': 'Borders & Shadows', 'outline': 'Borders & Shadows', 'divide': 'Borders & Shadows', 'shadow': 'Borders & Shadows',
    'opacity': 'Filters & Effects', 'filter': 'Filters & Effects', 'mask': 'Filters & Effects',
    'flex': 'Flexbox', 'justify': 'Flexbox', 'items': 'Flexbox',
    'grid': 'Grid', 'col': 'Grid', 'row': 'Grid',
    'static': 'Layout', 'fixed': 'Layout', 'absolute': 'Layout', 'relative': 'Layout', 'sticky': 'Layout', 'top': 'Layout', 'bottom': 'Layout', 'left': 'Layout', 'right': 'Layout', 'inset': 'Layout', 'z': 'Layout', 'float': 'Layout', 'clear': 'Layout', 'object': 'Layout', 'overflow': 'Layout', 'overscroll': 'Layout',
    'btn': 'Components', 'link': 'Components', 'card': 'Components', 'alert': 'Components',
    'hover': 'States', 'focus': 'States', 'active': 'States',
    'transition': 'Transitions & Animations', 'duration': 'Transitions & Animations', 'ease': 'Transitions & Animations', 'delay': 'Transitions & Animations', 'anim': 'Transitions & Animations',
    'd': 'Display',
    // Add other prefixes as needed
};

function generateStableId(name) {
    const hash = crypto.createHash('sha256').update(name).digest('hex');
    return `mico-${hash.substring(0, 16)}`;
}

/**
 * Determines the collection for a given selector name based on its prefix.
 * @param {string} selectorName The name of the CSS class.
 * @returns {string} The determined collection name.
 */
function getSelectorCollection(selectorName) {
    // Strip responsive prefixes like sm:, md:, etc., to get the base class name
    const baseName = selectorName.split(':').pop();
    const prefix = baseName.split('-')[0];
    return selectorCollectionMap[prefix] || 'Utilities'; // Default to 'Utilities' if no match
}

function main() {
    console.log('🚀 Starting Mico CSS selector to Oxygen JSON conversion (v4.0)...');
    let fileContent;
    try {
        fileContent = fs.readFileSync(config.inputFile, 'utf8');
    } catch (error) {
        console.error(`\n[ERROR] Reading input file: ${error.message}`);
        return;
    }

    const selectorRegex = /\.([a-zA-Z][a-zA-Z0-9-:]*)/g;
    const matchedSelectors = fileContent.match(selectorRegex);

    if (!matchedSelectors) {
        console.warn("\n[WARNING] No valid CSS class selectors were found.");
        return;
    }

    const uniqueSelectors = new Set(matchedSelectors.map(s => s.substring(1)));
    const allSelectors = [];
    console.log(`...Found ${uniqueSelectors.size} unique selectors. Grouping into collections.`);

    uniqueSelectors.forEach(selectorName => {
        allSelectors.push({
            id: generateStableId(selectorName),
            name: selectorName,
            children: [],
            locked: false,
            collection: getSelectorCollection(selectorName),
            type: 'class',
        });
    });

    allSelectors.sort((a, b) => a.name.localeCompare(b.name));

    // --- Writing Files ---
    try {
        fs.writeFileSync(config.outputFile, JSON.stringify(allSelectors, null, 2));
        console.log(`\n[SUCCESS] ✅ Generated main selector JSON file: ${config.outputFile}`);

        const selectorsByCollection = allSelectors.reduce((acc, selector) => {
            const { collection } = selector;
            if (!acc[collection]) acc[collection] = [];
            acc[collection].push(selector);
            return acc;
        }, {});

        if (!fs.existsSync(config.outputDir)) {
            fs.mkdirSync(config.outputDir, { recursive: true });
        }

        for (const collectionName in selectorsByCollection) {
            const collectionData = selectorsByCollection[collectionName];
            const fileName = `${collectionName}.json`;
            const filePath = path.join(config.outputDir, fileName);
            fs.writeFileSync(filePath, JSON.stringify(collectionData, null, 2));
            console.log(`          ✅ Generated collection file: ${filePath}`);
        }
    } catch (error) {
        console.error(`\n[ERROR] Writing output files: ${error.message}`);
    }
}

main();