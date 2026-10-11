"use client";

import { usePathname, useRouter } from "next/navigation";
import { ComposeForm } from "@/components/compose/compose-form";
import { useCompose } from "@/components/compose/compose-context";

export function FloatingComposer() {
	const { open, draftId, closeComposer, notice } = useCompose();
	const pathname = usePathname();
	const router = useRouter();
	return (
		<>
			{notice && (
				<div role="status" className="fixed right-6 top-6 z-[60] rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
					{notice}
				</div>
			)}
			{open && <ComposeForm key={draftId ?? "new"} mode="popup" draftIdToLoad={draftId} onClose={() => {
				closeComposer();
				if (/^\/drafts\/[^/]+\/?$/.test(pathname)) router.replace("/drafts");
			}} />}
		</>
	);
}
