import queryString from "query-string"

type QueryParams = Record<string, string | number | boolean | null | undefined>

export const getApiUrl = (baseUrl: string, queryParams?: QueryParams) => {
  return queryString.stringifyUrl({ url: baseUrl, query: queryParams })
}
