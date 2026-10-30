# quick-peek-windows

A patched fork of **Quick Peek**, the Claude Code mod by [Miguel Ángel Durán (midudev)](https://github.com/midudev), taken from [midudev/better-claude](https://github.com/midudev/better-claude) (`plugins/quick-peek`, version 0.2.0, commit `5abacf0`). All the credit for the plugin goes to the original author. It is MIT licensed, and the original license and copyright are kept in [`LICENSE`](LICENSE).

## What is different

On Windows, clicking a path that contains a space (for example `C:\Users\Ana Perez\file.md`) opened Explorer on *Documents* with nothing selected. The plugin ran `explorer "/select,C:\Users\Ana Perez\file.md"` as a single argument; when the path has a space, Windows quotes the whole argument and Explorer ignores it.

This fork passes `/select,` and the path as two arguments (`explorer /select, "C:\…"`), which Explorer accepts. The same change is applied to the WSL branch (`explorer.exe`). Nothing else changes. See [`register.tsx`](plugins/quick-peek-windows/hooks/register.tsx) for the diff against upstream.

The plugin is renamed `quick-peek-windows` so it can be installed next to the original; install only one of them, or paths will be drawn twice.

## Install

```text
/plugin marketplace add pablosalasd2004/quick-peek-windows
/plugin install quick-peek-windows@quick-peek-windows
```

Requires Claude Code's fullscreen interface (`"tui": "fullscreen"` in your settings). Usage, limits and platform notes are in the [plugin's README](plugins/quick-peek-windows/README.md).

## License

MIT. © 2026 Miguel Ángel Durán (midudev) for the original work; the Windows fix is released under the same license.
