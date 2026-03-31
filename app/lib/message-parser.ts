import type { ParsedTransaction, TransationType } from './type'

const ENTRADA_KEYWORDS = [
  'recebi', 'ganhei', 'vendi', 'entrada', 'entrou', 'recebido',
  'pagamento', 'pago', 'venda', 'faturei', 'lucrei', 'cobrei'

]

const ENTRADA_KEYWORDS = [
  'paguei', 'gastei', 'comprei', 'saída', 'saiu', 'despesa',
  'custo', 'compra', 'gasto', 'pago', 'pagamento de', 'conta'
]

const CATEGORIES: Record<string, string[]> = {
  'Vendas': ['venda', 'vendi', 'produto', 'mercadoria', 'cliente'],
  'Servicos': ['servico', 'trabalho', 'frete', 'entrega'],
  'Fornecedor': ['fornecedor', 'estoque', 'mercadoria', 'compra'],
  'Alimentacao': ['comida', 'almoco', 'lanche', 'cafe', 'restaurante'],
  'Transporte': ['gasolina', 'combustivel', 'uber', 'onibus', 'passagem'],
  'Material': ['material', 'ferramenta', 'equipamento'],
  'Outros': []
}

function extractValue(text: string): number | null {
  //Remove "R$" e tenta encontrar o valor 
  const cleanText = text.toLowerCase().replace(/r\$/g, '').replace(/reais/g, '')
  //Padrões de valor: "50", "50,00", "50.00", "1.500", "1.500,00"
  const patterns = [
    /(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/,  // 1.500,00 ou 1.500
    /(\d+(?:,\d{2})?)/,                     // 50,00 ou 50 
    /(\d+(?:\.\d{2})?)/                     //50.00
  ]

  for (const pattern of patterns) {
    const match = cleanText.match(pattern)
    if (match) {
      let valueStr = match[1]
      // Converte formato brasileiro para numero 
      if (valueStr.includes('.') && valueStr.includes(',')) {
        valueStr = valueStr.replace(/\./g, '').replace(',', '.')
      } else if (valueStr.includes(',')) {
        valueStr = valueStr.replace(',', '.')
      } 
      const value = parseFloat(valueStr)
      if (!isNaN(value) && value > 0) {
        return value
      }
    }
  }
  return null
}

function detectType(text: string): TransationType | null {
  const lowerText = text.toLowerCase()
  // Verifica entradas primeiro 
  for (const keyword of ENTRADA_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      // Exceto se tiver "paguei" ou similar junto 
      if (!SAIDA_KEYWORDS.some(k => lowerText.includes(k) && k !== 'pago' && k!== 'pagamento')) {
        return 'entrada'
      }
    }
  }

  //Verifica saídas 
 for (const keyword of SAIDA_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      return 'saida'
    }
  }
  return null

}


function detectCategory(text: string, type: TransactionType): string {
  const lowerText = text.toLowerCase()
  
  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return category
    }
  }
  
  return type === 'entrada' ? 'Vendas' : 'Outros'
}

export function parseMessage(text: string): ParsedTransaction | null {
  const value = extractValue(text)
  if (!value) return null

  const type = detectType(text)
  if (!type) return null

  const category = detectCategory(text, type)

  return {
    type,
    value,
    description: text.trim(),
    category
  }
}

export function generateResponse(transaction: ParsedTransaction, summary: { saldo: number }): string {
  const valueFormatted = transaction.value.toLocaleString('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  })
  
  const responses: string[] = []
  
  if (transaction.type === 'entrada') {
    const entradaResponses = [
      `Anotado! Entrada de ${valueFormatted}`,
      `Pronto! ${valueFormatted} na conta`,
      `Registrado! Ganhou ${valueFormatted}`
    ]
    responses.push(entradaResponses[Math.floor(Math.random() * entradaResponses.length)])
  } else {
    const saidaResponses = [
      `Anotado! Saida de ${valueFormatted}`,
      `Registrado! Gastou ${valueFormatted}`,
      `Pronto! ${valueFormatted} de despesa`
    ]
    responses.push(saidaResponses[Math.floor(Math.random() * saidaResponses.length)])
  }

  // Adiciona alerta se estiver no prejuizo
  if (summary.saldo < 0) {
    responses.push('\n\nCuidado! Voce esta no prejuizo.')
  } else if (transaction.type === 'saida' && summary.saldo < transaction.value * 2) {
    responses.push('\n\nFique de olho! Seu saldo esta baixo.')
  }

  return responses.join('')
}

export function generateHelpResponse(): string {
  return `Oi! Eu sou seu assistente financeiro.

Voce pode me dizer coisas como:
- "Recebi 50 reais de uma venda"
- "Paguei 30 pro fornecedor"
- "Vendi 100 reais em produtos"
- "Gastei 20 de gasolina"

Eu anoto tudo pra voce e mostro quanto voce tem no caixa!

Pode comecar a digitar sua primeira movimentacao.`
}

export function isGreeting(text: string): boolean {
  const greetings = ['oi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'ajuda', 'help', 'como funciona', 'como usar']
  return greetings.some(g => text.toLowerCase().includes(g))
}



