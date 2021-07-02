const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial: this[0]
  for(let index = 0; index <= this.length - 1; index++) {
    valorFinal = callback(valorFinal, this[index], this)
  }
  return valorFinal
}

async function main() {
  try {
    const { results } = await obterPessoas(`a`)
    const alturas = results.map(item => parseInt(item.height))
    console.log('alturas', alturas)
    /* const total = alturas.reduce((anterior, proximo) => {
      return anterior + proximo
    }) */
    const minhaLista = [
      ['Lívia', 'Devolder'],
      ['BRQ', 'Renault']
    ]
    const total = minhaLista.meuReduce((anterior, proximo) => {
      return anterior.concat(proximo)
    }, [])
    .join(', ')
    
    console.log('total', total)
  } catch (error) {
    console.error(`Algo deu errado`, error)
  }
}

main()