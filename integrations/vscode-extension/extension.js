const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

let utilityClasses = [];
let cssVariables = [];

function loadData(context) {
  try {
    const dataPath = path.join(context.extensionPath, 'data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    utilityClasses = data.utilityClasses || [];
    cssVariables = data.cssVariables || [];
  } catch (err) {
    console.error("⚠️ Failed to load data.json:", err);
  }
}

function activate(context) {
  loadData(context);

  const provider = vscode.languages.registerCompletionItemProvider(
    ['html', 'javascript', 'typescript'],
    {
      provideCompletionItems(document, position) {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        const items = [];

        if (/class=["'][^"']*$/.test(linePrefix)) {
          utilityClasses.forEach(cls => {
            const item = new vscode.CompletionItem(cls, vscode.CompletionItemKind.Keyword);
            item.insertText = cls;
            item.detail = 'MicoCSS Class';
            items.push(item);
          });
        }

        if (/var\(--[^)]*$/.test(linePrefix)) {
          cssVariables.forEach(v => {
            const item = new vscode.CompletionItem(v, vscode.CompletionItemKind.Variable);
            item.insertText = v;
            item.detail = 'MicoCSS Variable';
            items.push(item);
          });
        }

        return items;
      }
    },
    '-', ':', '"', "'"
  );

  context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
