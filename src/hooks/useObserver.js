export const useObserver = (element, options) => {
  const { rootMargin } = options
  return new Promise((resolve) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resolve(entry)
          observer.unobserve(element)
        }
      },
      { rootMargin }
    )
    observer.observe(element)
  })
}
