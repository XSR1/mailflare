import type { InboundQueueMessage } from "./src/lib/email/inbound";
import type { WebhookRetryMessage } from "./src/lib/email/webhooks";
import type { ImportJobMessage } from "./src/lib/import/jobs-types";

export function isInboundQueueMessage(payload: unknown): payload is InboundQueueMessage {
	return (
		typeof payload === "object" &&
		payload !== null &&
		"rawR2Key" in payload &&
		"from" in payload &&
		"to" in payload
	);
}

export function isWebhookRetryMessage(payload: unknown): payload is WebhookRetryMessage {
	return (
		typeof payload === "object" &&
		payload !== null &&
		(payload as { kind?: unknown }).kind === "webhook.retry" &&
		typeof (payload as { deliveryId?: unknown }).deliveryId === "string"
	);
}

export function isImportJobMessage(payload: unknown): payload is ImportJobMessage {
	return (
		typeof payload === "object" &&
		payload !== null &&
		(payload as { kind?: unknown }).kind === "import.run" &&
		typeof (payload as { jobId?: unknown }).jobId === "string"
	);
}

/** Route handlers that throw `unauthorized` reach us as an empty 401; give API callers a JSON body. */
export function withUnauthorizedJson(pathname: string, response: Response): Response {
	if (response.status !== 401 || response.body !== null || !pathname.startsWith("/api/")) return response;
	const headers = new Headers(response.headers);
	headers.set("Content-Type", "application/json");
	return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
}
