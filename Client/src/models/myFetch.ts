export function restApi<T>(url: string): Promise<T> {
  return fetch(url).then(x => x.json())
}
