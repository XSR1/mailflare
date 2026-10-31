import type { LicenseEntitlements, LicensePlan, LicenseStatus } from "./types";

// Self-hosted fork: every feature is unlocked and no license server is contacted.
const UNLOCKED_ENTITLEMENTS: LicenseEntitlements = {
	plan: "team",
	canCustomizeBranding: true,
	canManageAccounts: true,
	canShareMailboxes: true,
	accountSeatLimit: null,
	canForwardEmail: true,
};

export async function getLicenseStatus(_env: CloudflareEnv): Promise<LicenseStatus> {
	return {
		plan: "team",
		state: "active",
		features: [],
		seatLimit: null,
		instanceId: "self-hosted",
		instanceUrl: null,
		active: true,
		activatedAt: null,
		validatedAt: null,
	};
}

export async function getLicenseEntitlements(_env: CloudflareEnv): Promise<LicenseEntitlements> {
	return UNLOCKED_ENTITLEMENTS;
}

// Activation, validation and deactivation are no-ops; the instance is always unlocked.
export function activateLicense(env: CloudflareEnv, _licenseKey: string, _instanceUrl: string, _plan: Exclude<LicensePlan, "community">) {
	return getLicenseStatus(env);
}

export function validateLicense(env: CloudflareEnv, _licenseKey: string, _instanceUrl: string) {
	return getLicenseStatus(env);
}

export function deactivateLicense(env: CloudflareEnv) {
	return getLicenseStatus(env);
}
