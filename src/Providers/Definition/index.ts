import * as vscode from 'vscode';
import InteroSpawn from '../InteroSpawn';
import { getNearWord } from '../../utils/other';
import { normalizePath } from '../../utils/document';
import InteroLocationDecoder from '../InteroLocationDecoder';

export default class HaskellDefinitionProvider implements vscode.DefinitionProvider {
    private interoSpawn: InteroSpawn;
    private interoLocationDecoder: InteroLocationDecoder;

    public constructor(interoSpawn: InteroSpawn) {
        this.interoSpawn = interoSpawn;
        this.interoLocationDecoder = new InteroLocationDecoder();
    }

    public async provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.Location> {
        const wordInfo = getNearWord(position, document.getText());
        const filePath = normalizePath(document.uri.fsPath);

        const definitionLocation = await this.interoSpawn.requestDefinition(filePath, position, wordInfo);
        return this.interoLocationDecoder.decode(definitionLocation);
    }
}
