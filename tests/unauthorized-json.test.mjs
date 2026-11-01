import assert from "node:assert/strict";
import test from "node:test";
import { withUnauthorizedJson } from "../worker-utils.ts";

test("empty API 401 becomes a JSON Unauthorized body", async () => {
	const res = withUnauthorizedJson("/api/mailboxes", new Response(null, { status: 401 }));
	assert.equal(res.status, 401);
	assert.match(res.headers.get("content-type"), /application\/json/);
	assert.deepEqual(await res.json(), { error: "Unauthorized" });
});

test("other responses pass through untouched", async () => {
	const withBody = new Response("x", { status: 401 });
	assert.equal(withUnauthorizedJson("/api/x", withBody), withBody);
	const page = new Response(null, { status: 401 });
	assert.equal(withUnauthorizedJson("/mailboxes", page), page);
	const ok = new Response(null, { status: 204 });
	assert.equal(withUnauthorizedJson("/api/x", ok), ok);
});
