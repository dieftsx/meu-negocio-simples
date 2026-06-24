"use client";

import { Wallet, MessageCircle, TrendingUp } from "lucide-react";

export function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-primary/10 rounded-full p-6 mb-6">
        <Wallet className="w-16 h-16 text-primary" />
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-2">
        Bem-vindo ao Meu Negocio!
      </h2>

      <p className="text-muted-foreground mb-8 max-w-sm">
        Controle suas financas de forma simples, como se estivesse mandando
        mensagem.
      </p>

      <div className="space-y-4 w-full max-w-sm">
        <div className="flex items-start gap-4 bg-card rounded-xl p-4 text-left">
          <div className="bg-green-100 dark:bg-green-950/50 rounded-full p-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-foreground">Escreva naturalmente</p>
            <p className="text-sm text-muted-foreground">
              {'"Recebi 50 reais de uma venda"'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-card rounded-xl p-4 text-left">
          <div className="bg-red-100 dark:bg-red-950/50 rounded-full p-2">
            <MessageCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="font-medium text-foreground">Registre despesas</p>
            <p className="text-sm text-muted-foreground">
              {'"Paguei 30 pro fornecedor"'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-card rounded-xl p-4 text-left">
          <div className="bg-primary/10 rounded-full p-2">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Veja seu saldo</p>
            <p className="text-sm text-muted-foreground">
              Acompanhe lucros e despesas em tempo real
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
