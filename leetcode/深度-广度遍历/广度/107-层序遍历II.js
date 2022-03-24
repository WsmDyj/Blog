const a = [[3], [9, 20], [15, 7]]


console.log(
  a.map((it) => {
    return (
      it.reduce((acc, cur) => {
        return acc + cur
      }, 0) / it.length
    )
  })
)

