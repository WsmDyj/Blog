
console.log(
  a.map((it) => {
    return (
      it.reduce((acc, cur) => {
        return acc + cur
      }, 0) / it.length
    )
  })
)
