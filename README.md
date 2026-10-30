# quick-peek-windows

A patched fork of **Quick Peek**, the Claude Code mod by [Miguel Ángel Durán (midudev)](https://github.com/midudev), taken from [midudev/better-claude](https://github.com/midudev/better-claude) (`plugins/quick-peek`, version 0.2.0, commit `5abacf0`). All the credit for the plugin goes to the original author. It is MIT licensed, and the original license and copyright are kept in [`LICENSE`](LICENSE).

## What is different

On Windows, clicking a path (in practice, any path with a space, such as `C:\Users\Ana Perez\file.md`) did not select the file in Explorer: it opened *Documents* or an empty window. The plugin passes `explorer /select,<path>` to the process API, and the way that API builds the command line does not give Explorer the form it needs, `/select,"C:\a b\c"`.

This fork starts Explorer through PowerShell (`Start-Process explorer.exe -ArgumentList '/select,"C:\a b\c"'`, sent as `-EncodedCommand` so nothing is quoted twice). Cost: PowerShell's start-up makes the click open a fraction of a second later. Only native Windows is changed; the WSL branch is as upstream and untested here. See [`register.tsx`](plugins/quick-peek-windows/hooks/register.tsx) for the diff against upstream.

The plugin is renamed `quick-peek-windows` so it can be installed next to the original; install only one of them, or paths will be drawn twice.

## Install

```text
/plugin marketplace add pablosalasd2004/quick-peek-windows
/plugin install quick-peek-windows@quick-peek-windows
```

Requires Claude Code's fullscreen interface (`"tui": "fullscreen"` in your settings). Usage, limits and platform notes are in the [plugin's README](plugins/quick-peek-windows/README.md).

## License

MIT. © 2026 Miguel Ángel Durán (midudev) for the original work; the Windows fix is released under the same license.
