import { error } from '@sveltejs/kit'
import { getAPI } from '$lib/utils/api'
import { getBySid, getPocketbase } from '$lib/utils/server'
const isServer = import.meta.env.SSR

export const fetchFaqs = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}
		let res2: any = {}
		if (isServer) {

		
	 	// query your Pocketbase API
    	const endpoint = `collections/b456fnlo55zrz2v/records?page=1&perPage=10&sort=-created&filter=&expand=`;

		res = await getPocketbase(endpoint)
		res2 = await getBySid(`faqs?store=${storeId}`, sid)
		console.log('ressid: ', res2.data)
		console.log('res1: ', res.items)

		} else {
			res = await getAPI(`faqs?store=${storeId}`, origin)
			console.log('res2', res.data)
		}
		return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}
