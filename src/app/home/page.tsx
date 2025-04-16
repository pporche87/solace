import { API_ADVOCATES } from "../api/advocates/urls"
import { getAdvocates } from "../api/advocates/utils"
import { getApiUrl } from "../api/apiUtils/getApiUrl"
import { Advocate } from "../types/advocates"
import HomeClient from "./HomeClient"

export default async function HomePage() {
  const initialUrl = getApiUrl(API_ADVOCATES, {
    limit: 10,
    offset: 0,
  })

  const initialData: Advocate[] = (await getAdvocates(initialUrl))?.data ?? []

  return <HomeClient initialAdvocates={initialData} />
}
