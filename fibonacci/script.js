const getN = () => {
  const T = +document.getElementById('T').value;
  let a = +document.getElementById('a').value;
  let b = +document.getElementById('b').value;

  let sum = 0 + a + b;
  let n = 2;
  let fArray = `[1]: <span class='highlight'>${a}</span>, [2]: <span class='highlight'>${b}</span>`;

  while(T - sum > 0) {
    n++;
    const next = a + b;
    sum += next;
    a = b;
    b = next;
    fArray += `, [${n}]: <span class='highlight'>${next}</span>`;
  }

  document.getElementById('aki').innerHTML = "Aki answer:";
  document.getElementById('fArray').innerHTML = fArray;
  document.getElementById('n').innerHTML = `N = <span class='highlight'>${n}</span>`;
}