import { error } from '@sveltejs/kit'
import { getAPI } from '$lib/utils/api'
import { getPocketbase } from '$lib/utils/server'
const isServer = import.meta.env.SSR

export const fetchFaqs = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		const endpoint = `texbab_faqs/records`;
		let res: any = {}
		if (isServer) {
			res = await getPocketbase(endpoint)
		} else {
			res = await getAPI(`faqs?store=${storeId}`, origin)
		}
		return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}
