const fs = require('fs')
const path = require('path')

const pastaEntrada = path.join(__dirname,'arquivo')
const pastaSaida = path.join(__dirname,'novo_cadastro')

// le o conteudo da pasta (nomes dos arquivos)
fs.readdir(pastaEntrada,(err,arquivos)=>{
// verfica se consegue ler os arquivos da pasta
    if(err){
        console.log('Erro ao listar os arquivos',err)
        return 
    }
    // se houver pelo menos um arquivo, lê o primeiro
    if(arquivos.length>0){
        const caminhoDoArquivo = path.join(pastaEntrada,arquivos[0])
        // le o arquivo TXT
        fs.readFile(caminhoDoArquivo,'utf-8',(err,data)=>{
            if(err){
                console.error('Erro ao ler o arquivo',err)
                return
            }
            // Ao ler o arquivo, cria a o arquivo em JSON
            else{
                //transforma o txt em array para transformar em JSON
                const linhas = data.split('\n')
                const objeto  ={}
                linhas.forEach(linha=>{
                    const [chave,valor] = linha.split(':').map(e=>e.trim())
                    if (chave&&valor!==undefined){
                        objeto[chave]=isNaN(valor)?valor:Number(valor)// converte numero, caso possivel
                    }
                })
                // criar uma pasta, caso não haja uma existente
                fs.mkdir(pastaSaida, { recursive: true }, (err) => {
                    if (err) {
                      console.error('Erro ao criar a pasta de saída:', err);
                      return;
                    }

                    const caminhoJson = path.join(pastaSaida, 'novo_cadastro.json');

                    // Cria o arquivo JSON
                    fs.writeFile(caminhoJson,JSON.stringify(objeto, null, 2),(err)=>{
                        // erro ao escrever no arquivo
                        if(err){
                            console.error('Erro ao escrever no arquivo',err)
                            return
                        }
                        console.log('Arquivo salvo com sucesso!')
                    })
                })

                
            }
        })
    }else{
        return console.log('Nenhum arquivo encontrado na pasta.')
    }
})
