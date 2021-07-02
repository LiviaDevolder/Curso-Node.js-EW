/*
 0 Obter um usuário
 1 Obter o número de telefone de um usuário a partir de seu ID
 2 Obter o endereço do usuário pelo ID
*/

// Importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  // Quando algo inesperado acontecer -> reject(ERRO)
  // Quando tudo correr como o esperado -> resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function() {
        // return reject(new Error('Algo de muito errado aconteceu!'))

        return resolve({
          id: 1,
          nome: 'Aladin',
          dataNascimento: new Date()
        })
      }, 1000)
  })
}

function obterTelefone(idUsuario, ) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone:'1199002',
        ddd: 11
      })
    }, 2000)
  })

}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    })
  }, 2000)
}

// 1o passo: adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {
  try {
    console.time('medida-promise')
    const usuario = await obterUsuario()
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]

    console.log(`
      Nome: ${usuario.nome},
      Telefone: (${telefone.ddd}) ${telefone.telefone},
      Endereço: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd('medida-promise')
  }
  catch (erro) {
    console.error('Algo deu errado', error)
  }
}

// const usuarioPromise = obterUsuario()
// // Para manipular o acerto, usamos a função .then
// // Para manipular o erro, usamos a função .catch
// // usuario -> telefone
// usuarioPromise
//   .then(function (usuario) {
//     return obterTelefone(usuario.id)
//     .then(function resolverTelefone(result) {
//       return {
//         usuario: {
//           nome: usuario.nome,
//           id: usuario.id
//         },
//         telefone: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id)
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     console.log(`
//       Nome: ${resultado.usuario.nome}
//       Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//       Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//     `)
//   })
//   .catch(function (error) {
//     console.error('Algo deu errado', error)
//   })

// obterUsuario(function resolverUsuario(error, usuario) {
//   if(error) {
//     console.error('Erro em USUÁRIO', error)
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
//     if(error1) {
//       console.error('Erro em TELEFONE', error1)
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
//       if (erro2) {
//         console.error('Erro em ENDEREÇO', erro2)
//         return;
//       }

//       console.log(`
//       Nome: ${usuario.nome},
//       Endereço: ${endereco.rua}, ${endereco.numero}
//       Telefone: (${telefone.ddd}) ${telefone.telefone}
//       `)
//     })
//   })
// })
// const telefone = obterTelefone(usuario.id)

// console.log('telefone', telefone)