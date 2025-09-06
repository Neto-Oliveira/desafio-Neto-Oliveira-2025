class AbrigoAnimais {
  constructor() {
    this.animais = {
      'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      'Fofo': { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };
    this.brinquedosPermitidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'];
  }

  encontraPessoas(brinquedosDaPessoa1, brinquedosDaPessoa2, listaDeAnimais) {
    let brinquedos1 = this.stringtoArray(brinquedosDaPessoa1);
    let brinquedos2 = this.stringtoArray(brinquedosDaPessoa2);
    let animais = this.stringtoArray(listaDeAnimais);

    let brinquedosInvalidos = this.validarBrinquedos(brinquedos1, brinquedos2);
    if (brinquedosInvalidos) {
      return { erro: "Brinquedo inválido" };
    }

    let animaisInvalidos = this.validarAnimais(animais);
    if (animaisInvalidos) {
      return { erro: "Animal inválido" };
    }

    let resultado = this.processaAdocoes(animais, brinquedos1, brinquedos2);
    return resultado;
  }

  stringtoArray(texto) {
    let partes = texto.split(",");
    let arrayFinal = [];
    for (let contador = 0; contador < partes.length; contador++) {
      let item = partes[contador].trim();
      arrayFinal.push(item);
    }
    return arrayFinal;
  }

  validarBrinquedos(brinquedos1, brinquedos2) {
    let verificarDuplicata1 = this.verificarDuplicatas(brinquedos1);
    if (verificarDuplicata1) {
      return true;
    }

    let verificarDuplicatas2 = this.verificarDuplicatas(brinquedos2);
    if (verificarDuplicatas2) {
      return true;
    }

    let todosOsBrinquedos = [];
    for (let contador = 0; contador < brinquedos1.length; contador++) {
      todosOsBrinquedos.push(brinquedos1[contador]);
    }
    for (let contador = 0; contador < brinquedos2.length; contador++) {
      todosOsBrinquedos.push(brinquedos2[contador]);
    }

    for (let contador = 0; contador < todosOsBrinquedos.length; contador++) {
      let brinquedo = todosOsBrinquedos[contador];
      let ehPermitido = false;

      for (let contador2 = 0; contador2 < this.brinquedosPermitidos.length; contador2++) {
        if (brinquedo === this.brinquedosPermitidos[contador2]) {
          ehPermitido = true;
        }
      }

      if (ehPermitido === false) {
        return true;
      }
    }

    return false;
  }

  verificarDuplicatas(lista) {
    for (let contador = 0; contador < lista.length; contador++) {
      let item = lista[contador];
      for (let contador2 = contador + 1; contador2 < lista.length; contador2++) {
        let outroItem = lista[contador2];
        if (item === outroItem) {
          return true;
        }
      }
    }
    return false;
  }

  validarAnimais(animais) {
    let verificarDuplicatas = this.verificarDuplicatas(animais);
    if (verificarDuplicatas) {
      return true;
    }

    for (let contador = 0; contador < animais.length; contador++) {
      let nomeAnimal = animais[contador];
      let existe = false;

      for (let nome in this.animais) {
        if (nomeAnimal === nome) {
          existe = true;
        }
      }

      if (existe === false) {
        return true;
      }
    }

    return false;
  }

  processaAdocoes(animais, brinquedos1, brinquedos2) {
    let listaResultado = [];
    let animaisDaPessoa1 = [];
    let animaisDaPessoa2 = [];

    for (let contador = 0; contador < animais.length; contador++) {
      let nomeAnimal = animais[contador];
      let infoAnimal = this.animais[nomeAnimal];

      let pessoa1Pode = this.podeAdotar(infoAnimal, brinquedos1, animaisDaPessoa1);
      let pessoa2Pode = this.podeAdotar(infoAnimal, brinquedos2, animaisDaPessoa2);

      let destino = this.decideDestino(pessoa1Pode, pessoa2Pode, animaisDaPessoa1, animaisDaPessoa2);

      let texto = nomeAnimal + " - " + destino;
      listaResultado.push(texto);

      if (destino === "pessoa 1") {
        animaisDaPessoa1.push(nomeAnimal);
      } else if (destino === "pessoa 2") {
        animaisDaPessoa2.push(nomeAnimal);
      }
    }

    for (let contador = 0; contador < listaResultado.length - 1; contador++) {
      for (let contador2 = contador + 1; contador2 < listaResultado.length; contador2++) {
        if (listaResultado[contador] > listaResultado[contador2]) {
          let temporario = listaResultado[contador];
          listaResultado[contador] = listaResultado[contador2];
          listaResultado[contador2] = temporario;
        }
      }
    }

    return { lista: listaResultado };
  }

  podeAdotar(infoAnimal, brinquedosDaPessoa, animaisJaAdotados) {
    if (infoAnimal.tipo === "jabuti") {
      if (animaisJaAdotados.length === 0) {
        return false;
      }

      for (let contador = 0; contador < infoAnimal.brinquedos.length; contador++) {
        let brinquedoNecessario = infoAnimal.brinquedos[contador];
        let temBrinquedo = false;

        for (let contador2 = 0; contador2 < brinquedosDaPessoa.length; contador2++) {
          let brinquedoDaPessoa = brinquedosDaPessoa[contador2];
          if (brinquedoDaPessoa === brinquedoNecessario) {
            temBrinquedo = true;
          }
        }

        if (temBrinquedo === false) {
          return false;
        }
      }
      return true;
    }

    let posicao = 0;
    for (let contador = 0; contador < brinquedosDaPessoa.length; contador++) {
      let brinquedo = brinquedosDaPessoa[contador];
      if (brinquedo === infoAnimal.brinquedos[posicao]) {
        posicao = posicao + 1;
      }
    }

    if (posicao === infoAnimal.brinquedos.length) {
      return true;
    } else {
      return false;
    }
  }

  decideDestino(pessoa1Pode, pessoa2Pode, animaisPessoa1, animaisPessoa2) {
    if (pessoa1Pode === true && pessoa2Pode === true) {
      return "abrigo";
    } else if (pessoa1Pode === true && animaisPessoa1.length < 3) {
      return "pessoa 1";
    } else if (pessoa2Pode === true && animaisPessoa2.length < 3) {
      return "pessoa 2";
    } else {
      return "abrigo";
    }
  }
}

export { AbrigoAnimais };