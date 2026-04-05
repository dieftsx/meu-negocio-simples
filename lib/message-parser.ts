
import type { ParsedTransaction, TransactionType } from './types'

const ENTRADA_KEYWORDS = [
  'recebi', 'ganhei', 'vendi', 'entrada', 'entrou', 'recebido',
  'pagamento', 'pago', 'venda', 'faturei', 'lucrei', 'cobrei',
  'receber', 'ganhar', 'vender', 'faturar', 'cobrar'
]

const SAIDA_KEYWORDS = [
  'paguei', 'gastei', 'comprei', 'saida', 'saiu', 'despesa',
  'custo', 'compra', 'gasto', 'pagamento de', 'conta',
  'pagar', 'gastar', 'comprar', 'investir', 'investimento'
]

const CATEGORIES: Record<string, string[]> = {
  'Vendas': ['venda', 'vendi', 'produto', 'mercadoria', 'cliente', 'loja', 'pedido', 'encomenda'],
  'Servicos': ['servico', 'trabalho', 'frete', 'entrega', 'manutencao', 'conserto', 'reparo', 'consultoria'],
  'Fornecedor': ['fornecedor', 'estoque', 'mercadoria', 'insumo', 'materia prima', 'atacado'],
  'Alimentacao': ['comida', 'almoco', 'lanche', 'cafe', 'restaurante', 'ifood', 'marmita', 'jantar'],
  'Transporte': ['gasolina', 'combustivel', 'uber', 'onibus', 'passagem', 'pedagio', 'estacionamento', '99', 'etanol', 'diesel'],
  'Conta': ['luz', 'agua', 'internet', 'telefone', 'aluguel', 'boleto', 'fatura', 'mensalidade', 'assinatura', 'iptu', 'condominio'],
  'Material': ['material', 'ferramenta', 'equipamento', 'maquina', 'impressora', 'computador'],
  'Funcionario': ['funcionario', 'empregado', 'salario', 'vale', 'beneficio', 'freelancer', 'terceirizado'],
  'Marketing': ['anuncio', 'propaganda', 'marketing', 'facebook', 'instagram', 'google ads', 'panfleto', 'cartao de visita'],
  'Imposto': ['imposto', 'taxa', 'tributo', 'das', 'simples nacional', 'inss', 'mei', 'guia'],
  'Outros': []
}

const PAYMENT_METHODS: Record<string, string[]> = {
  'PIX': ['pix', 'chave pix'],
  'Boleto': ['boleto', 'fatura', 'guia'],
  'Dinheiro': ['dinheiro', 'especie', 'cash', 'em maos'],
  'Cartão de Crédito': ['cartao de credito', 'credito', 'cartão de crédito', 'crédito'],
  'Cartão de Débito': ['cartao de debito', 'debito', 'cartão de débito', 'débito'],
  'Transferência': ['transferencia', 'transferência', 'ted', 'doc'],
  'Cheque': ['cheque'],
}

function extractValue(text: string): number | null {
  const cleanText = text.toLowerCase().replace(/r\$/g, '').replace(/reais/g, '')

  const patterns = [
    /(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/,
    /(\d+(?:,\d{2})?)/,
    /(\d+(?:\.\d{2})?)/
  ]

  for (const pattern of patterns) {
    const match = cleanText.match(pattern)
    if (match) {
      let valueStr = match[1]
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

function detectType(text: string): TransactionType | null {
  const lowerText = text.toLowerCase()

  // Verifica saídas primeiro (prioridade para evitar conflito com "pagamento")
  for (const keyword of SAIDA_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      return 'saida'
    }
  }

  // Verifica entradas
  for (const keyword of ENTRADA_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      return 'entrada'
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

function extractPaymentMethod(text: string): string | undefined {
  const lowerText = text.toLowerCase()

  for (const [method, keywords] of Object.entries(PAYMENT_METHODS)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return method
    }
  }

  return undefined
}

function extractSupplier(text: string): string | undefined {
  const lowerText = text.toLowerCase()

  // Padrões para extrair nome de fornecedor/cliente/pessoa
  const patterns = [
    /(?:do |da |de |pro |pra |para o |para a |para |ao |à )(?:fornecedor|fornecedora)\s+(.+?)(?:\s+(?:no valor|pela|pelo|via|em|com|$))/i,
    /(?:do |da |de |pro |pra |para o |para a |para |ao |à )(?:cliente)\s+(.+?)(?:\s+(?:no valor|pela|pelo|via|em|com|$))/i,
    /(?:fornecedor|fornecedora)\s+(.+?)(?:\s+(?:no valor|pela|pelo|via|em|com|$))/i,
    /(?:cliente)\s+(.+?)(?:\s+(?:no valor|pela|pelo|via|em|com|$))/i,
    /(?:do |da |pro |pra |para o |para a |para |ao |à )(\w[\w\s]{1,30}?)$/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      let name = match[1].trim()
      // Remove palavras comuns que não são nomes
      const stopWords = ['um', 'uma', 'uns', 'umas', 'de', 'da', 'do', 'no', 'na', 'reais', 'real', 'valor']
      const words = name.split(/\s+/)
      if (words.length === 1 && stopWords.includes(words[0].toLowerCase())) {
        continue
      }
      // Remove trailing stopwords
      while (words.length > 0 && stopWords.includes(words[words.length - 1].toLowerCase())) {
        words.pop()
      }
      name = words.join(' ')
      if (name.length >= 2) {
        // Capitaliza o nome
        return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
      }
    }
  }

  // Pattern mais simples: "do/da/pro/pra + Nome" quando é perto de keywords de valor
  const simplePatterns = [
    /(?:do |da |pro |pra )([A-Z][\wÀ-ú]+(?:\s+[A-Z][\wÀ-ú]+)*)/,
  ]

  for (const pattern of simplePatterns) {
    const match = text.match(pattern)
    if (match && match[1] && match[1].length >= 2) {
      return match[1].trim()
    }
  }

  return undefined
}

export function parseMessage(text: string): ParsedTransaction | null {
  const value = extractValue(text)
  if (!value) return null

  const type = detectType(text)
  if (!type) return null

  const category = detectCategory(text, type)
  const paymentMethod = extractPaymentMethod(text)
  const supplier = extractSupplier(text)

  return {
    type,
    value,
    description: text.trim(),
    category,
    supplier,
    paymentMethod,
  }
}

export function generateResponse(transaction: ParsedTransaction, summary: { saldo: number }): string {
  const valueFormatted = transaction.value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  const parts: string[] = []

  if (transaction.type === 'entrada') {
    const entradaResponses = [
      `✅ Anotado! Entrada de ${valueFormatted}`,
      `✅ Pronto! ${valueFormatted} na conta`,
      `✅ Registrado! Ganhou ${valueFormatted}`
    ]
    parts.push(entradaResponses[Math.floor(Math.random() * entradaResponses.length)])
  } else {
    const saidaResponses = [
      `✅ Anotado! Saída de ${valueFormatted}`,
      `✅ Registrado! Gastou ${valueFormatted}`,
      `✅ Pronto! ${valueFormatted} de despesa`
    ]
    parts.push(saidaResponses[Math.floor(Math.random() * saidaResponses.length)])
  }

  // Detalhes do contexto extraído
  const details: string[] = []
  details.push(`📂 Categoria: ${transaction.category}`)
  if (transaction.supplier) {
    details.push(`👤 ${transaction.type === 'entrada' ? 'Cliente' : 'Fornecedor'}: ${transaction.supplier}`)
  }
  if (transaction.paymentMethod) {
    details.push(`💳 Forma: ${transaction.paymentMethod}`)
  }
  parts.push('\n\n' + details.join('\n'))

  // Alerta se estiver no prejuizo
  if (summary.saldo < 0) {
    parts.push('\n\n⚠️ Cuidado! Voce esta no prejuizo.')
  } else if (transaction.type === 'saida' && summary.saldo < transaction.value * 2) {
    parts.push('\n\n⚠️ Fique de olho! Seu saldo esta baixo.')
  }

  return parts.join('')
}

export function generateHelpResponse(): string {
  return `Oi! 👋 Eu sou seu assistente financeiro.

Voce pode me dizer coisas como:
- "Recebi 50 reais de uma venda"
- "Paguei 30 de boleto do fornecedor João"
- "Vendi 100 reais via pix pro cliente Maria"
- "Gastei 20 de gasolina"
- "Paguei 500 reais de aluguel"
- "Recebi 200 via pix"

Eu entendo o fornecedor, cliente, forma de pagamento e categoria automaticamente!

Pode comecar a digitar sua primeira movimentacao.`
}

export function isGreeting(text: string): boolean {
  const greetings = ['oi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'ajuda', 'help', 'como funciona', 'como usar']
  return greetings.some(g => text.toLowerCase().trim() === g || text.toLowerCase().startsWith(g + ' ') || text.toLowerCase().startsWith(g + ','))
}
