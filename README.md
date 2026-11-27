# Pop Culture Gallery

A movie and video game discovery site for pop culture fans. Browse what's trending, see what's coming soon, search any title, and get picks based on your taste. No build step and no dependencies: plain HTML, CSS and JavaScript.

## Features

- Fresh movie and game picks on every load and every refresh
- Real posters and details, with a generated cover when no photo is available
- Search for any movie or game
- Taste-based recommendations using mood chips and your saved list
- Coming-soon releases, a live headline ticker and a news feed
- Detail sheet with synopsis, cast or developer, where to watch or play, scores and similar titles
- Auto-refresh every 30 minutes
- Glass UI with dark and light themes, a phone dock and smooth animations (respects reduced motion)

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub and push this folder to it.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. Your site appears at `https://<your-username>.github.io/<repo-name>/` after a minute or so.

## Where the data comes from

Every source is optional. The page always shows something and upgrades when a source responds.

| Section | Sources, in order |
| --- | --- |
| Movies | Claude web search (if enabled), Apple top movies, built-in starter catalog |
| Games | Claude web search (if enabled), CheapShark deals, built-in starter catalog |
| Posters and summaries | Apple artwork, CheapShark thumbnails, Wikipedia |
| Search | Starter catalog, Apple, CheapShark, Wikipedia, Claude (if enabled) |
| News | Claude web search (if enabled), Variety and IGN feeds through rss2json |
| Coming soon | Claude web search (if enabled), a short built-in list (past dates are hidden) |

These free public APIs can change or rate-limit without notice, so treat the live data as best effort.

### About the Claude web search layer

Live Claude search works when the page runs inside Claude. On `github.io` it is turned off automatically (see `CONFIG` at the top of `app.js`), so the site relies on the free sources above.

To use Claude on your own deployment, run a small server of your own that holds your API key and forwards requests to the Anthropic API, then set `CONFIG.AI_ENDPOINT` to that server and `CONFIG.USE_AI` to `true`. Never put an API key in front-end code or commit it to a repository.

## Customize

- **Starter catalog:** edit `STARTER_MOVIES`, `STARTER_GAMES` and `STARTER_SOON` in `app.js`.
- **Refresh interval:** change `REFRESH_MS` in `app.js`.
- **Colors and motion:** edit the variables at the top of `styles.css`.

## Project structure

```
index.html   page structure
styles.css   design system, layout and animations
app.js       data loading, search, recommendations and interactions
```

## License

MIT. See `LICENSE`.
