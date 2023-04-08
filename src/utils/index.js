export function createCategorySlide(movies, nameCategory, id) {
  let titleCategory = nameCategory
  nameCategory === 'Tendencias'
    ? (nameCategory = 'Tendencias')
    : (nameCategory = `category=${id}-${nameCategory}`)

  const isNotHome =
    location.pathname.startsWith('/mylist') ||
    location.pathname.startsWith('/category') ||
    location.pathname.startsWith('/trends')

  const link = (name) => `<more-category-component link=${name}></more-category-component>`
  return `
		<category-container-component img="${movies
      .map(
        (movie) => `
			<movie-component src='https://image.tmdb.org/t/p/w300${
        movie.poster_path ? movie.poster_path : movie.posterImage
      }'
						linkMovie='${movie.id ? movie.id : movie.idMovie}'
						title='${movie.original_title}'
						releaseYear='${movie.release_date}'
					>
					</movie-component>`
      )
      .join('')}"
			title="${titleCategory}"
			link="${!isNotHome ? link(nameCategory) : ''}"
			>
		</category-container-component>
	`
}
