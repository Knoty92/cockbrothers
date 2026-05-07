import { type Component, createSignal, Show } from "solid-js";
import { AppShell } from "../../../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Avatar } from "../../../components/ui/Avatar";
import { Tabs, TabPanel } from "../../../components/ui/Tabs";
import { addToast } from "../../../components/ui/Toast";

export default function SettingsPage() {
  const [name, setName] = createSignal("Knoty");
  const [email, setEmail] = createSignal("knoty@example.com");
  const [saving, setSaving] = createSignal(false);

  const handleSave = async () => {
    setSaving(true);
    // TODO: API call
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    addToast({
      type: "success",
      message: "Settings saved",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <AppShell
      user={{
        name: "Knoty",
        email: "knoty@example.com",
        tier: "free",
      }}
      brands={[
        { id: "1", name: "Beach Club", primaryColor: "#06b6d4" },
        { id: "2", name: "Urban Wear", primaryColor: "#8b5cf6" },
      ]}
      activeBrandId="1"
    >
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-[var(--color-text)]">Settings</h1>
        <p class="text-sm text-[var(--color-text-secondary)] mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs
        tabs={[
          { id: "profile", label: "Profile" },
          { id: "account", label: "Account" },
          { id: "notifications", label: "Notifications" },
        ]}
      />

      <TabPanel value="profile" activeTab="profile">
        <Card class="mt-6">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardBody>
            <div class="flex items-center gap-6 mb-6">
              <Avatar name={name()} size="xl" />
              <div>
                <Button size="sm" variant="secondary">
                  Change avatar
                </Button>
                <p class="text-xs text-[var(--color-text-tertiary)] mt-1">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            <div class="grid gap-4 max-w-md">
              <Input
                label="Full name"
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
                placeholder="Your name"
              />
              <Input
                label="Email"
                type="email"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                disabled
                helperText="Email cannot be changed. Contact support."
              />
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="ghost">Cancel</Button>
            <Button onClick={handleSave} loading={saving()}>
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabPanel>

      <TabPanel value="account" activeTab="profile">
        <Card class="mt-6">
          <CardHeader>
            <CardTitle>Account Preferences</CardTitle>
          </CardHeader>
          <CardBody>
            <div class="space-y-4 max-w-md">
              {/* Language selector placeholder */}
              <div>
                <label class="text-sm font-medium text-[var(--color-text)] block mb-1.5">
                  Language
                </label>
                <select class="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)]">
                  <option value="en">English</option>
                  <option value="cs">Čeština</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              {/* Timezone placeholder */}
              <div>
                <label class="text-sm font-medium text-[var(--color-text)] block mb-1.5">
                  Timezone
                </label>
                <select class="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)]">
                  <option value="Europe/Prague">Europe/Prague (CET)</option>
                  <option value="UTC">UTC</option>
                  <option value="US/Eastern">US/Eastern</option>
                </select>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button>Save preferences</Button>
          </CardFooter>
        </Card>
      </TabPanel>
    </AppShell>
  );
}
