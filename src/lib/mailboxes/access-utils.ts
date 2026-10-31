import type { AppDatabase } from "@/db";

// Self-hosted fork: shared mailboxes are always enabled.
export async function isTeamMailboxSharingEnabled(_db: AppDatabase): Promise<boolean> {
	return true;
}
