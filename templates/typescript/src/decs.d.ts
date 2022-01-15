// TypeScript does not support package.json "exports" fields
// https://github.com/microsoft/TypeScript/issues/33079
// costro/jsx is exposed with this field, so there are no TypeScript declaration files for this file.
// Declare the module to tell TypeScript to ignore the warning.
declare module 'costro/jsx' {
	export * from 'costro/types/jsx';
}
