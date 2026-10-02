import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'dijkstra-hop-by-hop-simulation',
    title: 'Building a Hop-by-Hop Telemetry Simulator in the Browser',
    subtitle: 'Deterministic shortest-path graph routing, SPI firewall packet inspection, and 802.1Q VLAN isolation with React Flow and Zustand.',
    date: 'Oct 01, 2026',
    readTimeMinutes: 7,
    category: 'Systems',
    tags: ['Algorithms', 'Network Simulation', 'React Flow', 'Zustand', 'TypeScript'],
    excerpt: 'Simulating stateful network packets in the browser requires moving beyond static graph rendering. Here is how NetWatch calculates deterministic shortest paths via Dijkstra while enforcing Layer 3/4 firewall policies in real time.',
    content: `## The Problem: Real-Time Network Packet State in the DOM

Most interactive network diagrams are purely aesthetic: nodes are linked with static SVG lines and clicking an element opens an arbitrary modal. When building **NetWatch**, the design objective was different: create an authentic, deterministic packet simulation engine capable of calculating shortest paths, filtering packets with stateful inspection, and emulating CLI diagnostics (\`ping\`, \`traceroute\`, \`arp\`, \`nslookup\`).

### 1. Adjacency Graph Formulation & Dijkstra Routing

To route packets between endpoints, we construct an adjacency graph where edge weights correspond to link latency (in milliseconds):

\`\`\`typescript
export function calculateDijkstraPath(
  nodes: NetworkNode[],
  connections: NetworkConnection[],
  sourceId: string,
  targetId: string
): { path: string[]; totalLatency: number } | null {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const unvisited = new Set<string>();

  nodes.forEach(node => {
    distances[node.id] = node.id === sourceId ? 0 : Infinity;
    previous[node.id] = null;
    unvisited.add(node.id);
  });

  while (unvisited.size > 0) {
    let currentId: string | null = null;
    let minDistance = Infinity;

    unvisited.forEach(id => {
      if (distances[id] < minDistance) {
        minDistance = distances[id];
        currentId = id;
      }
    });

    if (currentId === null || currentId === targetId) break;
    unvisited.delete(currentId);

    const neighbors = getActiveNeighbors(currentId, connections, nodes);
    neighbors.forEach(({ neighborId, latency }) => {
      if (unvisited.has(neighborId)) {
        const alt = distances[currentId!] + latency;
        if (alt < distances[neighborId]) {
          distances[neighborId] = alt;
          previous[neighborId] = currentId;
        }
      }
    });
  }

  return reconstructPath(previous, distances, sourceId, targetId);
}
\`\`\`

### 2. Stateful Firewall Inspection (SPI)

Whenever a packet transits through a firewall node, the packet header (\`protocol\`, \`port\`, \`sourceIp\`) is verified against the firewall rule table:

\`\`\`typescript
export function evaluateFirewall(
  packet: PacketHeader,
  rules: FirewallRule[]
): 'ALLOW' | 'DENY' {
  for (const rule of rules) {
    if (
      (rule.protocol === 'ANY' || rule.protocol === packet.protocol) &&
      (rule.port === 0 || rule.port === packet.destPort)
    ) {
      return rule.action; // 'ALLOW' or 'DENY'
    }
  }
  return 'ALLOW'; // Default permissive policy
}
\`\`\`

### Key Takeaways
1. Graph algorithms executed client-side in sub-millisecond execution times provide instant visual feedback without backend round-trips.
2. Isolating state transitions inside a central Zustand store keeps canvas re-renders decoupled from high-frequency packet clock ticks.`
  },
  {
    slug: 'procedural-web-audio-synthesis',
    title: 'Procedural Audio Synthesis: Zero-Bandwidth Sound in Web Apps',
    subtitle: 'Replacing heavy MP3 audio assets with native Web Audio API oscillators, filters, and gain envelopes.',
    date: 'Sep 25, 2026',
    readTimeMinutes: 5,
    category: 'Web Audio',
    tags: ['Web Audio API', 'DSP', 'Sound Design', 'Frontend Craft'],
    excerpt: 'Why bundle 5 megabytes of audio assets when you can generate chimes, ticks, white noise rain, and mechanical clicks procedurally in less than 50 lines of code?',
    content: `## Why Procedural Audio?

Traditional web applications that need sensory feedback typically import static \`.mp3\` or \`.wav\` assets. This introduces latency, browser decoding delays, asset 404 risks, and bandwidth bloat.

By contrast, the **Web Audio API** ships native hardware-accelerated sound synthesis directly into every modern browser.

### Creating a Crisp UI Page Turn Rustle

A page turn sound can be synthesized using a burst of white noise shaped with a bandpass filter and an exponential decay gain envelope:

\`\`\`typescript
export function playPageTurn(ctx: AudioContext) {
  const bufferSize = ctx.sampleRate * 0.08; // 80ms buffer
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1; // Pure white noise
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1400, ctx.currentTime);
  filter.Q.setValueAtTime(2, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start();
}
\`\`\`

### Real-Time Frequency Visualizer

Connecting an \`AnalyserNode\` into the audio destination graph allows drawing real-time FFT spectrum bars on an HTML5 \`<canvas>\` with zero external dependencies.

\`\`\`typescript
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 64;
// Connect oscillator -> gain -> analyser -> destination
\`\`\``
  },
  {
    slug: 'esp8266-mqtt-rfid-access-control',
    title: 'Hardware Interfacing: ESP8266 & RC522 RFID Access Controllers',
    subtitle: 'Architecting resilient SPI bus polling, non-blocking MQTT telemetry, and solenoid relay actuation.',
    date: 'Sep 18, 2026',
    readTimeMinutes: 6,
    category: 'IoT & Hardware',
    tags: ['ESP8266', 'C++', 'RFID', 'MQTT', 'Embedded Systems'],
    excerpt: 'A deep-dive into embedded firmware architecture for IoT access control, exploring debounce mechanisms, MQTT pub/sub event loops, and hardware pinout mappings.',
    content: `## Architecture of an IoT RFID Node

Access control systems require ultra-low latency: a user tapping an RFID badge at a turnstile or security door expects feedback within 100 milliseconds.

The **NodeGuard** hardware system uses an ESP8266 NodeMCU microcontroller connected via SPI bus to an MFRC522 13.56MHz contactless reader.

### Pinout Mapping

| NodeMCU Pin | GPIO | Function | RC522 RFID Pin |
|---|---|---|---|
| D2 | GPIO 4 | SS / SDA | SDA / NSS |
| D5 | GPIO 14 | SCK | SCK |
| D7 | GPIO 13 | MOSI | MOSI |
| D6 | GPIO 12 | MISO | MISO |
| D1 | GPIO 5 | RST | RST |

### Non-Blocking MQTT Firmware Loop

In embedded systems, avoiding blocking \`delay()\` calls is critical so that network telemetry and RFID interrupt checks occur concurrently:

\`\`\`cpp
void loop() {
  if (!client.connected()) {
    reconnect_mqtt();
  }
  client.loop();

  // Check if new RFID card is presented
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    return;
  }

  String uidStr = formatUID(rfid.uid.uidByte, rfid.uid.size);
  
  // Publish telemetry payload to MQTT broker
  client.publish("nodeguard/lab/rfid/access", uidStr.c_str());

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}
\`\`\``
  }
];
