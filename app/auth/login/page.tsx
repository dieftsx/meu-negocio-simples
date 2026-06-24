"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Store, Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
    setIsLoading(false);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("Email ou senha incorretos");
        } else if (error.message.includes("Email not confirmed")) {
          setError("Confirme seu email antes de entrar");
        } else {
          setError("Erro ao fazer login. Tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Button
          variant='ghost'
          asChild
          className='w-fit pl-0 hover:bg-transparent hover:text-primary mb-6'
        >
          <Link href='/'>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Início
          </Link>
        </Button>
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <Store className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Meu Negocio Simples
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              Controle financeiro simples como mandar mensagem
            </p>
          </div>

          <Card className="w-full border-border shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center">
                Entrar na sua conta
              </CardTitle>
              <CardDescription className="text-center">
                Digite seu email e senha para acessar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base"
                      autoComplete="email"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 text-base"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </Field>

                  {error && (
                    <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                  {/* Google OAuth Button */}
                  <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full mb-4 h-12 text-base font-medium"
                    //disabled={isLoading}
                    disabled={true}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Entrando com Google...
                      </>
                    ) : (
                      "Entrar com Google"

                    )}
                    <span className='text-xs font-normal bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full'>Em breve</span>
                  </Button>

                </FieldGroup>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Ainda nao tem conta?{" "}
                    <Link
                      href="/auth/cadastro"
                      className="font-medium text-primary hover:underline"
                    >
                      Cadastre sua empresa
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
