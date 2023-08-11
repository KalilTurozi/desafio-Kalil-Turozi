class CaixaDaLanchonete {
    constructor() {
      this.cardapio = new Map([
        ["cafe", { descricao: "Café", valor: 3.0 }],
        ["chantily", { descricao: "Chantily (extra do Café)", valor: 1.5 }],
        ["suco", { descricao: "Suco Natural", valor: 6.2 }],
        ["sanduiche", { descricao: "Sanduíche", valor: 6.5 }],
        ["queijo", { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 }],
        ["salgado", { descricao: "Salgado", valor: 7.25 }],
        ["combo1", { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 }],
        ["combo2", { descricao: "1 Café e 1 Sanduíche", valor: 7.5 }],
      ]);
  
      this.formasDePagamento = new Set(["dinheiro", "debito", "credito"]);
      this.itemPrincipalComExtra = new Map([
        ["cafe", "chantily"],
        ["sanduiche", "queijo"],
      ]);
    }
  
    calcularValorDaCompra(formaDePagamento, itens) {
      if (!this.formasDePagamento.has(formaDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      if (itens.length === 0) {
        return "Não há itens no carrinho de compra!";
      }
  
      let total = 0;
      const principalSet = new Set();
      const extraSet = new Set();
  
      for (const itemInfo of itens) {
        const [itemName, quantity] = itemInfo.split(",");
        const item = this.cardapio.get(itemName);
  
        if (!item) {
          return "Item inválido!";
        }
  
        if (quantity <= 0) {
          return "Quantidade inválida!";
        }
  
        if (this.itemPrincipalComExtra.has(itemName)) {
          principalSet.add(itemName);
        } else {
          extraSet.add(itemName);
        }
  
        total += item.valor * quantity;
      }
  
      for (const [principal, extra] of this.itemPrincipalComExtra) {
        if (!principalSet.has(principal) && extraSet.has(extra)) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
  
      switch (formaDePagamento) {
        case 'dinheiro':
          total *= 0.95;
          break;
        case 'debito':
          total;
          break;
        case 'credito':
          total *= 1.03
          break;
      }
  
      return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
  }
  
  export { CaixaDaLanchonete };