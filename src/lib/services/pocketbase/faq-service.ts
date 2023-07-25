import { error } from '@sveltejs/kit'
import { getAPI } from '$lib/utils/api'
import { getBySid } from '$lib/utils/server'
const isServer = import.meta.env.SSR

export const fetchFaqs = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}
		if (isServer) {
			res = await getBySid(`faqs?store=${storeId}`, sid)
			console.log('res1', res.data, storeId)
		} else {
			res = await getAPI(`faqs?store=${storeId}`, origin)
			console.log('res2', res.data)
		}
		return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}
