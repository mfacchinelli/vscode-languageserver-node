/* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { RequestHandler } from 'vscode-jsonrpc';
import { TextDocumentIdentifier, Diagnostic } from 'vscode-languageserver-types';

import { ProtocolRequestType } from './messages';
import { PartialResultParams, StaticRegistrationOptions, WorkDoneProgressParams, TextDocumentRegistrationOptions, WorkDoneProgressOptions, TextDocumentClientCapabilities } from './protocol';


/**
 * @since 3.17.0
 */
export interface DiagnosticClientCapabilities {
	/**
	 * Whether implementation supports dynamic registration. If this is set to `true`
	 * the client supports the new `(TextDocumentRegistrationOptions & StaticRegistrationOptions)`
	 * return value for the corresponding server capability as well.
	 */
	dynamicRegistration?: boolean;
}

export interface $DiagnosticClientCapabilities {
	textDocument?: TextDocumentClientCapabilities & {
		diagnostic: DiagnosticClientCapabilities;
	}
}

export interface DiagnosticParams extends WorkDoneProgressParams, PartialResultParams {
	/**
	 * The text document.
	 */
	textDocument: TextDocumentIdentifier;
}

export interface DiagnosticOptions extends WorkDoneProgressOptions {
	identifier?: string;
}

export interface DiagnosticRegistrationOptions extends TextDocumentRegistrationOptions, DiagnosticOptions, StaticRegistrationOptions {
}

export interface $DiagnosticServerCapabilities {
	diagnosticProvider?: boolean | DiagnosticOptions;
}

export namespace DiagnosticRequest {
	export const method: 'textDocument/diagnostic' = 'textDocument/diagnostic';
	export const type = new ProtocolRequestType<DiagnosticParams, Diagnostic[] | null, Diagnostic[], void, DiagnosticRegistrationOptions>(method);
	export type HandlerSignature = RequestHandler<DiagnosticParams, Diagnostic[] | null, void>;
}