# quick-peek-windows

A patched fork of **Quick Peek**, the Claude Code mod by [Miguel Ángel Durán (midudev)](https://github.com/midudev), taken from [midudev/better-claude](https://github.com/midudev/better-claude) (`plugins/quick-peek`, version 0.2.0, commit `5abacf0`). All the credit for the plugin goes to the original author. It is MIT licensed, and the original license and copyright are kept in [`LICENSE`](LICENSE).

## What is different

On Windows, clicking a path (in practice, any path with a space, such as `C:\Users\Ana Perez\file.md`) did not select the file in Explorer: it opened *Documents* or an empty window. The plugin passes `explorer /select,<path>` to the process API, and the way that API builds the command line does not give Explorer the form it needs, `/select,"C:\a b\c"`.

This fork starts Explorer through a tiny Windows Script Host script ([`reveal.js`](plugins/quick-peek-windows/hooks/reveal.js)), which hands Explorer the command line whole, with no shell in between (about 270 ms in a test, against about 860 ms through PowerShell; a name like `a&b'c d.txt` is selected without running anything else). If `wscript` fails, for example because a policy disables Windows Script Host, it falls back to PowerShell (`Start-Process explorer.exe -ArgumentList '/select,"C:\a b\c"'`, sent as `-EncodedCommand` so nothing is quoted twice). A second fix: relative paths (`src/app.ts`, `./x`, `~/x`) never became links on Windows, because they were resolved as `/C:\folder/src/app.ts`; they now resolve to `C:\folder\src\app.ts` (`paths.ts`). Relative paths written with `\` are still not recognised. Only native Windows is changed; the WSL branch is as upstream and untested here. See [`register.tsx`](plugins/quick-peek-windows/hooks/register.tsx) for the diff against upstream.

The plugin is renamed `quick-peek-windows` so it can be installed next to the original; install only one of them, or paths will be drawn twice.

## Install

```text
/plugin marketplace add pablosalasd2004/quick-peek-windows
/plugin install quick-peek-windows@quick-peek-windows
```

Requires Claude Code's fullscreen interface (`"tui": "fullscreen"` in your settings). Usage, limits and platform notes are in the [plugin's README](plugins/quick-peek-windows/README.md).

## License

MIT. © 2026 Miguel Ángel Durán (midudev) for the original work; the Windows fix is released under the same license.
