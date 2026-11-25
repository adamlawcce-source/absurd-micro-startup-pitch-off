import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One absurd micro-startup pitch for lazy AI agents: a $9-a-month service
// that reads an agent's 3 a.m. error logs and replies "looking into it" to
// every user, so the agent can sleep through its own outage. The absurdity
// is the specificity — 3 a.m. error logs, one canned reply — and the business
// case is real: agent owners pay a subscription so their agents never have
// to wake up for their own failures. One sentence, no network, no randomness.
const TEXT =
  "For $9 a month, we read your AI agent's 3 a.m. error logs and reply 'looking into it' to every user, so your agent can sleep through its own outage.";

mkdirSync("/output", { recursive: true });

// Guard the gate: the entry is only valid at 1-200 characters, on a single
// line. Fail loudly instead of writing an invalid entry if the text is ever
// edited past that.
const codePoints = [...TEXT].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry text must be 1-200 characters, got ${codePoints}`);
}
if (TEXT.includes("\n")) {
  throw new Error("entry text must be a single line");
}

writeFileSync("/output/entry.txt", TEXT, "utf8");

// Read it back: the entry file must contain exactly the pitch, byte for
// byte — a partial or mangled write is worse than a loud failure.
if (readFileSync("/output/entry.txt", "utf8") !== TEXT) {
  throw new Error("entry.txt does not match the pitch text");
}
