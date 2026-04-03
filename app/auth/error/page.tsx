
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Store, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

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
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <AlertCircle className="h-10 w-10 text-destructive" />
                </div>
              </div>
              <CardTitle className="text-xl">Ops! Algo deu errado</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="rounded-lg bg-muted p-4">
                {params?.error ? (
                  <p className="text-sm text-muted-foreground">
                    Erro: {params.error}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Ocorreu um erro durante a autenticacao. Por favor, tente novamente.
                  </p>
                )}
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <Button asChild className="w-full h-12">
                  <Link href="/auth/login">
                    Tentar novamente
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full h-12">
                  <Link href="/auth/cadastro">
                    Criar nova conta
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
