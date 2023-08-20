import { BlogService } from '$lib/services'
import { error } from '@sveltejs/kit'

export async function load({ params, locals }) {
	const { id } = params
console.log("bloget:", id)
	const blog = await BlogService.fetchBlog({ id, server: true })
console.log("bloget:", blog, id)
	const latestBlogs = await BlogService.fetchLatestBlogs({ storeId: locals.store?.id, server: true })

	if (blog) {
		return { blog, latestBlogs }
	}

	throw error(404, 'Blog not found')
}
