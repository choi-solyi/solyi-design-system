/** Private request lifecycle shared by selection inputs; query/model policy stays in each input. */
export function createOptionRequest<T>(options: {
  loader(): ((query: string, signal: AbortSignal) => Promise<readonly T[]>) | undefined
  available(): boolean
  pending(): void
  resolved(items: readonly T[]): void
  rejected(): void
  settled(): void
}) {
  let timer: ReturnType<typeof setTimeout> | undefined,
    controller: AbortController | undefined,
    revision = 0,
    disposed = false
  function stop() {
    clearTimeout(timer)
    timer = undefined
    controller?.abort()
    controller = undefined
    revision++
    options.settled()
  }
  async function run(query: string) {
    const loader = options.loader()
    if (disposed || !loader || !options.available()) return
    stop()
    const current = revision,
      request = new AbortController()
    controller = request
    options.pending()
    try {
      const items = await loader(query, request.signal)
      if (!disposed && current === revision && !request.signal.aborted) options.resolved(items)
    } catch {
      if (!disposed && current === revision && !request.signal.aborted) options.rejected()
    } finally {
      if (!disposed && current === revision) {
        controller = undefined
        options.settled()
      }
    }
  }
  return {
    stop,
    run,
    schedule(query: string | (() => string), delay: number) {
      if (disposed || !options.loader() || !options.available()) return
      stop()
      options.pending()
      timer = setTimeout(() => void run(typeof query === 'function' ? query() : query), Number.isFinite(delay) ? Math.max(0, delay) : 0)
    },
    dispose() {
      disposed = true
      stop()
    },
  }
}
