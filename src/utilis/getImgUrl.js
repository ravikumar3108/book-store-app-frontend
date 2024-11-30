function getImgUrl(bookname) {
  return new URL(`../assets/books/${bookname}`,import.meta.url)
}

export {getImgUrl}