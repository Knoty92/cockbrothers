import { type Component, createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardTitle, CardBody } from "../components/ui/Card";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const handleEmailRegister = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password() !== confirmPassword()) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password().length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    // TODO: Connect to Supabase auth
    try {
      await new Promise((r) => setTimeout(r, 1000));
      navigate("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    // TODO: Connect to Supabase Google OAuth
    setLoading(false);
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-[var(--color-surface-secondary)] px-4">
      <div class="w-full max-w-sm">
        {/* Logo */}
        <div class="text-center mb-8">
          <A href="/" class="inline-flex items-center gap-2">
            <span class="text-3xl">🍆</span>
            <span class="font-bold text-2xl text-[var(--color-text)]">
              Cockbrothers
            </span>
          </A>
        </div>

        <Card>
          <CardBody>
            <CardTitle>Create your account</CardTitle>
            <p class="text-sm text-[var(--color-text-secondary)] mt-1 mb-6">
              Start building your brand kit in minutes.
            </p>

            <Show when={error()}>
              <div class="mb-4 p-3 text-sm text-[var(--color-error)] bg-[var(--color-error-bg)] rounded-lg">
                {error()}
              </div>
            </Show>

            <form onSubmit={handleEmailRegister} class="space-y-4">
              <Input
                label="Full name"
                type="text"
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
                placeholder="John Doe"
                required
                icon={
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                }
              />

              <Input
                label="Email"
                type="email"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                placeholder="you@example.com"
                required
                icon={
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
              />

              <Input
                label="Password"
                type="password"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                placeholder="At least 8 characters"
                required
                helperText="Minimum 8 characters"
              />

              <Input
                label="Confirm password"
                type="password"
                value={confirmPassword()}
                onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                placeholder="Repeat your password"
                required
              />

              <Button
                type="submit"
                class="w-full"
                loading={loading()}
              >
                Create account
              </Button>
            </form>

            {/* Terms */}
            <p class="text-xs text-[var(--color-text-tertiary)] text-center mt-4">
              By creating an account, you agree to our{" "}
              <a href="/terms" class="text-[var(--color-primary)] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" class="text-[var(--color-primary)] hover:underline">
                Privacy Policy
              </a>
              .
            </p>

            {/* Divider */}
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-[var(--color-border)]" />
              </div>
              <div class="relative flex justify-center text-xs">
                <span class="bg-white px-2 text-[var(--color-text-tertiary)]">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google OAuth */}
            <Button
              variant="secondary"
              class="w-full"
              onClick={handleGoogleRegister}
              icon={
                <svg class="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              }
            >
              Sign up with Google
            </Button>
          </CardBody>
        </Card>

        <p class="text-center text-sm text-[var(--color-text-secondary)] mt-6">
          Already have an account?{" "}
          <A
            href="/login"
            class="text-[var(--color-primary)] hover:underline font-medium"
          >
            Sign in
          </A>
        </p>
      </div>
    </div>
  );
}
