# Mock Xtream Codes API Server

QA test server for Samsung TV app store submission. Implements standard Xtream Codes API endpoints serving **public domain content only** (Blender Foundation open movies under CC-BY).

## Credentials

- Username: `samsung_qa`
- Password: `test2026`

## Content

- **4 movies**: Big Buck Bunny, Sintel, Tears of Steel, Elephant's Dream
- **2 live channels**: Test Pattern (HLS), Nature Loop (HLS)
- **1 series**: "Blender Open Movies" with 3 episodes

All streams are redirects to publicly hosted files (Google Cloud Storage, Mux test streams, Akamai test streams).

## Deploy

```bash
npm install
vercel
```

## Local dev

```bash
npm install
npm run dev
```

Then test: `http://localhost:3000/player_api.php?username=samsung_qa&password=test2026`
