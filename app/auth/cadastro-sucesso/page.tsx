
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Store, Mail, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CadastroSucessoPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <Store className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <Card className="w-full border-border shadow-lg">
            <CardHeader className="space-y-1 pb-4 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle className="h-10 w-10 text-success" />
                </div>
              </div>
              <CardTitle className="text-xl">Cadastro realizado!</CardTitle>
              <CardDescription>
                Sua conta foi criada com sucesso
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5" />
                <p className="text-sm">
                  Enviamos um email de confirmacao
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">
                  Verifique sua caixa de entrada e clique no link para confirmar seu email.
                  Depois disso, voce podera acessar sua conta.
                </p>
              </div>

              <div className="pt-4">
                <Button asChild className="w-full h-12">
                  <Link href="/auth/login">
                    Ir para o Login
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
