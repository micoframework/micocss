/**
 * =============================================================================
 * Mico CSS to Oxygen Builder JSON Converter (for Variables)
 * =============================================================================
 *
 * Author: Your Name / Gemini
 * Version: 4.0.0
 * - Implemented stable, deterministic IDs via hashing.
 * - Kept full '--mico-' prefix for cssVariableName.
 * - Added functionality to output a main file and separate files for each collection.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// --- CONFIGURATION ---
const config = {
    inputFile: path.resolve(__dirname, '..', 'css', '../../dist/css/variables.css'),
    // The main file containing ALL variables
    outputFile: path.resolve(__dirname, '..', '../dist/js/mico-oxygen-variables.json'),
    // The directory where individual collection files will be saved
    outputDir: path.resolve(__dirname, '..', '../dist/js/oxygen-variables'),
};
// --- END CONFIGURATION ---

const collectionMap = {
    'breakpoint': 'Breakpoints Collection','value': 'Common Values Collection','fs': 'Typography Collection', 'fw': 'Typography Collection', 'font-stretch': 'Typography Collection','font-style': 'Typography Collection', 'font-variant-numeric': 'Typography Collection','font-variant-ligatures': 'Typography Collection', 'font-variant-caps': 'Typography Collection','lh': 'Typography Collection', 'ls': 'Typography Collection', 'underline-offset': 'Typography Collection','decoration-thickness': 'Typography Collection', 'decoration-style': 'Typography Collection','underline-position': 'Typography Collection', 'text-transform': 'Typography Collection','text-align': 'Typography Collection', 'text-overflow': 'Typography Collection','whitespace': 'Typography Collection', 'indent': 'Typography Collection','text-shadow': 'Typography Collection', 'text-stroke': 'Typography Collection','list-style-type': 'Typography Collection', 'list-style-position': 'Typography Collection','text-direction': 'Typography Collection', 'writing-mode': 'Typography Collection','text-orientation': 'Typography Collection', 'hyphens': 'Typography Collection','text-align-last': 'Typography Collection', 'text-justify': 'Typography Collection','user-select': 'Typography Collection', 'word-break': 'Typography Collection','overflow-wrap': 'Typography Collection','size': 'Sizing & Spacing Collection','radius': 'Border Collection', 'border': 'Border Collection', 'border-width': 'Border Collection','outline-width': 'Border Collection', 'outline-style': 'Border Collection', 'outline-offset': 'Border Collection','divide-width': 'Border Collection','shadow': 'Shadows Collection','position': 'Layout Collection', 'display': 'Layout Collection', 'box-sizing': 'Layout Collection','box-decoration': 'Layout Collection', 'overflow': 'Layout Collection', 'overscroll': 'Layout Collection','aspect-ratio': 'Layout Collection', 'float': 'Layout Collection', 'clear': 'Layout Collection','object-fit': 'Layout Collection', 'object-position': 'Layout Collection', 'visibility': 'Layout Collection','isolation': 'Layout Collection', 'inset': 'Layout Collection','flex': 'Flexbox Collection', 'justify': 'Flexbox Collection', 'items': 'Flexbox Collection','grid-auto-columns': 'Grid Collection', 'grid-auto-fit': 'Grid Collection', 'grid-auto-fill': 'Grid Collection','place-items': 'Grid Collection', 'place-content': 'Grid Collection', 'align-self': 'Grid Collection','justify-self': 'Grid Collection', 'grid-column-count': 'Grid Collection', 'grid-min-column-width': 'Grid Collection','grid-row-count': 'Grid Collection', 'grid-min-row-height': 'Grid Collection', 'column-span': 'Grid Collection','row-span': 'Grid Collection', 'min-column-width': 'Grid Collection', 'max-column-width': 'Grid Collection','min-row-height': 'Grid Collection', 'max-row-height': 'Grid Collection', 'grid-cols': 'Grid Collection','grid-rows': 'Grid Collection', 'col-span': 'Grid Collection', 'grid-flow': 'Grid Collection','auto-cols': 'Grid Collection', 'auto-rows': 'Grid Collection', 'gap': 'Grid Collection','bg': 'Background Collection','filter': 'Effects Collection', 'opacity': 'Effects Collection', 'mask': 'Effects Collection','scale': 'Transforms Collection', 'rotate': 'Transforms Collection', 'translate': 'Transforms Collection','table': 'Tables Collection','fill': 'SVG Collection', 'stroke': 'SVG Collection','btn': 'Buttons Collection','cursor': 'Cursor Collection','appearance': 'Utilities Collection', 'pointer-events': 'Utilities Collection', 'will-change': 'Utilities Collection','bleed': 'Utilities Collection','fit-content': 'Sizing Collection', 'min-content': 'Sizing Collection', 'max-content': 'Sizing Collection','full': 'Sizing Collection', 'half': 'Sizing Collection', 'quarter': 'Sizing Collection', 'third': 'Sizing Collection','width-screen': 'Sizing Collection', 'height-screen': 'Sizing Collection','align': 'Alignment Collection', 'vertical-align': 'Alignment Collection','duration': 'Animation Collection', 'delay': 'Animation Collection', 'anim': 'Animation Collection','ripple': 'Animation Collection', 'typewriter': 'Animation Collection', 'animation': 'Animation Collection','ease': 'Animation Collection', 'transition': 'Animation Collection','color': 'Colors Collection','img-placeholder': 'Image Placeholder Collection URLs',
};

function generateStableId(name) {
    const hash = crypto.createHash('sha256').update(name).digest('hex');
    return `mico-${hash.substring(0, 16)}`;
}

function processVariableName(cssVar) {
    const baseName = cssVar.substring(7);
    const label = baseName.replace(/-/g, ' ');
    const parts = baseName.split('-');
    let groupKey = parts[0];

    for (let i = parts.length; i > 1; i--) {
        const potentialKey = parts.slice(0, i).join('-');
        if (collectionMap[potentialKey]) {
            groupKey = potentialKey;
            break;
        }
    }

    const collection = collectionMap[groupKey] || 'Default Mico Collection';
    let type = 'unit';
    if (groupKey === 'color' || baseName.includes('-color-')) {
        type = 'color';
    } else if (groupKey === 'img-placeholder') {
        type = 'image_url';
    }

    return { label, collection, cssVariableName: cssVar, type };
}

function main() {
    console.log('🚀 Starting Mico to Oxygen variable conversion (v4.0)...');
    let fileContent;
    try {
        fileContent = fs.readFileSync(config.inputFile, 'utf8');
    } catch (error) {
        console.error(`\n[ERROR] Reading input file: ${error.message}`);
        return;
    }

    const variableDefinitionRegex = /^\s*(--mico-[\w-]+)\s*:\s*(?!var\()([^;]+);/gm;
    const allVariables = [];
    const seenVariables = new Set();
    let match;

    while ((match = variableDefinitionRegex.exec(fileContent)) !== null) {
        const cssVar = match[1];
        if (seenVariables.has(cssVar)) continue;
        seenVariables.add(cssVar);

        const { label, collection, cssVariableName, type } = processVariableName(cssVar);
        const variableObject = {
            id: generateStableId(cssVar), type, label, cssVariableName, collection,
        };

        switch (type) {
            case 'color': case 'image_url':
                variableObject.value = cssVar;
                break;
            default:
                variableObject.value = { number: cssVar, unit: 'custom', style: cssVar };
                break;
        }
        allVariables.push(variableObject);
    }

    console.log(`...Processed ${allVariables.length} total variables.`);

    // --- Writing Files ---
    try {
        // 1. Write the main file with all variables
        fs.writeFileSync(config.outputFile, JSON.stringify(allVariables, null, 2));
        console.log(`\n[SUCCESS] ✅ Generated main variable JSON file: ${config.outputFile}`);

        // 2. Group variables by collection for individual file output
        const variablesByCollection = allVariables.reduce((acc, variable) => {
            const { collection } = variable;
            if (!acc[collection]) acc[collection] = [];
            acc[collection].push(variable);
            return acc;
        }, {});

        // 3. Ensure the output directory for collections exists
        if (!fs.existsSync(config.outputDir)) {
            fs.mkdirSync(config.outputDir, { recursive: true });
        }

        // 4. Write a separate file for each collection
        for (const collectionName in variablesByCollection) {
            const collectionData = variablesByCollection[collectionName];
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