const isServer = typeof window === "undefined"
const baseUrl = isServer ? process.env.NEXT_PUBLIC_SITE_URL : ""

export const apiFetch = async (url: string) => {
  const fullUrl = `${baseUrl}${url}`
  const response = await fetch(fullUrl)
  return response.json()
}
