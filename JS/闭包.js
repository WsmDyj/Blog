function func() {
  const guang = 'guang';
  function func2() {
    const ssh = 'ssh';
    function func3 () {
      const suzhe = 'suzhe';
      console.log(ssh);
      console.log(guang);
      console.log(suzhe);
    }
    return func3;
  }
  return func2;
}

const func2 = func();
const func3 = func2()
func3()
