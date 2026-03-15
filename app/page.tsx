export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "700px" }}>
      <h1>Mock Xtream Codes API</h1>
      <p>QA test server for Samsung TV app store submission.</p>
      <p>All content served is <strong>public domain / Creative Commons</strong> (Blender Foundation open movies).</p>

      <h2>Credentials</h2>
      <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "4px" }}>
        Username: samsung_qa{"\n"}
        Password: test2026
      </pre>

      <h2>Endpoints</h2>
      <ul>
        <li><code>/player_api.php?username=samsung_qa&amp;password=test2026</code> &mdash; Auth</li>
        <li><code>...&amp;action=get_vod_categories</code></li>
        <li><code>...&amp;action=get_vod_streams</code></li>
        <li><code>...&amp;action=get_vod_info&amp;vod_id=1</code></li>
        <li><code>...&amp;action=get_live_categories</code></li>
        <li><code>...&amp;action=get_live_streams</code></li>
        <li><code>...&amp;action=get_series_categories</code></li>
        <li><code>...&amp;action=get_series</code></li>
        <li><code>...&amp;action=get_series_info&amp;series_id=501</code></li>
        <li><code>/movie/samsung_qa/test2026/1.mp4</code> &mdash; Stream redirect</li>
        <li><code>/live/samsung_qa/test2026/101.m3u8</code> &mdash; Live redirect</li>
        <li><code>/series/samsung_qa/test2026/1001.mp4</code> &mdash; Episode redirect</li>
      </ul>
    </main>
  );
}
