
function fetchUser() { 
  return new Promise((resolve, reject) => {
      fetch('https://www.easy-mock.com/mock/5c7626b708ff8c3b19c52fc5/api/getUserData#!method=get')
      .then((data) => {
          resolve(data.json());
      }, (error) => {
          reject(error);
      })
  });
}

// promise方法
function getUserByPromise() {
  fetchUser().then((data) => {
    console.log(data)
  }, (error) => {
      console.log(error)
  })
}
getUserByPromise()

// Generator方式
function* fetchUserByGenerator() {
  const user = yield fetchUser()
  return user
}
const g = fetchUserByGenerator()
const result = g.next.value
result.then((v) => {
  console.log(v)
})

// async 方式
async function getUserByAsync() {
  let user = await fetchUser()
  return user
}
getUserByAsync().then(v => console.log)

