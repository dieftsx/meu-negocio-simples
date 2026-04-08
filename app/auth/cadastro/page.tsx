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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Store, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";

const TIPOS_NEGOCIO = [
  {
    value: "alimentacao",
    label: "Alimentacao (Restaurante, Lanchonete, Marmitex)",
  },
  { value: "comercio", label: "Comercio (Loja, Mercadinho, Bazar)" },
  { value: "servicos", label: "Servicos (Salao, Manicure, Eletricista)" },
  { value: "artesanato", label: "Artesanato e Producao" },
  { value: "delivery", label: "Delivery e Entregas" },
  { value: "outros", label: "Outros" },
];

export default function CadastroPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomeResponsavel: "",
    nomeEmpresa: "",
    telefone: "",
    tipoNegocio: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const validateStep1 = () => {
    if (!formData.nomeResponsavel.trim()) {
      setError("Digite seu nome");
      return false;
    }
    if (!formData.nomeEmpresa.trim()) {
      setError("Digite o nome do seu negocio");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.email.trim()) {
      setError("Digite seu email");
      return false;
    }
    if (formData.password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas nao conferem");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/`,
          data: {
            nome_empresa: formData.nomeEmpresa,
            nome_responsavel: formData.nomeResponsavel,
            telefone: formData.telefone,
            tipo_negocio: formData.tipoNegocio,
          },
        },
      });

      if (error) throw error;
      router.push("/auth/cadastro-sucesso");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("already registered")) {
          setError("Este email ja esta cadastrado. Tente fazer login.");
        } else {
          setError("Erro ao criar conta. Tente novamente.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <Store className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Meu Negocio Simples
            </h1>
          </div>

          <Card className="w-full border-border shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center">
                {step === 1 ? "Cadastre sua empresa" : "Crie sua conta"}
              </CardTitle>
              <CardDescription className="text-center">
                {step === 1
                  ? "Conta pra gente sobre seu negocio"
                  : "Agora vamos criar seu acesso"}
              </CardDescription>
              {/* Progress indicator */}
              <div className="flex justify-center gap-2 pt-2">
                <div
                  className={`h-2 w-16 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`}
                />
                <div
                  className={`h-2 w-16 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={
                  step === 2
                    ? handleSubmit
                    : (e) => {
                        e.preventDefault();
                        handleNext();
                      }
                }
              >
                {step === 1 ? (
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="nomeResponsavel">
                        Seu nome
                      </FieldLabel>
                      <Input
                        id="nomeResponsavel"
                        type="text"
                        placeholder="Como podemos te chamar?"
                        required
                        value={formData.nomeResponsavel}
                        onChange={(e) =>
                          updateForm("nomeResponsavel", e.target.value)
                        }
                        className="h-12 text-base"
                        autoComplete="name"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="nomeEmpresa">
                        Nome do seu negocio
                      </FieldLabel>
                      <Input
                        id="nomeEmpresa"
                        type="text"
                        placeholder="Ex: Lanchonete da Maria"
                        required
                        value={formData.nomeEmpresa}
                        onChange={(e) =>
                          updateForm("nomeEmpresa", e.target.value)
                        }
                        className="h-12 text-base"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="telefone">
                        Telefone (opcional)
                      </FieldLabel>
                      <Input
                        id="telefone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={formData.telefone}
                        onChange={(e) => updateForm("telefone", e.target.value)}
                        className="h-12 text-base"
                        autoComplete="tel"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="tipoNegocio">
                        Tipo de negocio
                      </FieldLabel>
                      <Select
                        value={formData.tipoNegocio}
                        onValueChange={(value) =>
                          updateForm("tipoNegocio", value)
                        }
                      >
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIPOS_NEGOCIO.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>
                              {tipo.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    {error && (
                      <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-medium mt-2"
                    >
                      Continuar
                    </Button>
                  </FieldGroup>
                ) : (
                  <FieldGroup>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="w-fit -ml-2 mb-2"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Voltar
                    </Button>

                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        className="h-12 text-base"
                        autoComplete="email"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="password">Criar senha</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Minimo 6 caracteres"
                        required
                        value={formData.password}
                        onChange={(e) => updateForm("password", e.target.value)}
                        className="h-12 text-base"
                        autoComplete="new-password"
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
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirmPassword">
                        Confirmar senha
                      </FieldLabel>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Digite a senha novamente"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          updateForm("confirmPassword", e.target.value)
                        }
                        className="h-12 text-base"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
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
                          Criando conta...
                        </>
                      ) : (
                        "Criar minha conta"
                      )}
                    </Button>
                  </FieldGroup>
                )}

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Ja tem uma conta?{" "}
                    <Link
                      href="/auth/login"
                      className="font-medium text-primary hover:underline"
                    >
                      Entrar
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
