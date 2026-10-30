// Windows Script Host script: shows a path in Explorer, selected (or opens it with `open`).
// Run as `wscript //B //Nologo reveal.js <path> [open]`. It exists because Explorer wants
// `/select,"C:\a b\c"` with the quotes around the path only, which an argument list cannot say,
// and WScript.Shell.Run takes the command line whole, with no shell in between.
var args = WScript.Arguments
var path = args(0)
var isOpening = args.length > 1 && args(1) === 'open'
var shell = new ActiveXObject('WScript.Shell')
shell.Run(isOpening ? 'explorer.exe "' + path + '"' : 'explorer.exe /select,"' + path + '"', 1, false)
