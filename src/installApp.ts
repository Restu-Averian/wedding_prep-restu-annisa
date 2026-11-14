interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: InstallPromptEvent | null = null;
let prompting = false;
let cleanup: (() => void) | undefined;
let snapshot = { available: false, installed: false, ios: false, error: "" };
const subscribers = new Set<() => void>();

function update(changes: Partial<typeof snapshot>) {
  snapshot = { ...snapshot, ...changes };
  subscribers.forEach((notify) => notify());
}

export const getInstallSnapshot = () => snapshot;
export function subscribeInstall(notify: () => void) {
  subscribers.add(notify);
  return () => {
    subscribers.delete(notify);
  };
}

// Own the browser listeners at app startup, outside route mounts and StrictMode effects.
export function initializeInstallApp() {
  if (cleanup) return cleanup;

  const standalone = window.matchMedia("(display-mode: standalone)");

  let appInstalled = false;

  const navigatorIOS = navigator as Navigator & { standalone?: boolean };

  const ua = navigator.userAgent;

  const version = /OS (\d+)_(\d+)/.exec(ua);

  const modernIOS =
    version && (+version[1] > 16 || (+version[1] === 16 && +version[2] >= 4));

  const thirdPartyBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);

  const ios =
    /iPhone/.test(ua) &&
    /Safari\//.test(ua) &&
    (thirdPartyBrowser ? Boolean(modernIOS) : /Version\//.test(ua));

  const checkStandalone = () => {
    const installed =
      appInstalled || standalone.matches || navigatorIOS.standalone === true;
    if (installed) deferredPrompt = null;
    update({
      installed,
      ios,
      available: !installed && deferredPrompt !== null,
    });
  };

  const beforeInstall = (event: Event) => {
    event.preventDefault();
    if (snapshot.installed || prompting) return;
    deferredPrompt = event as InstallPromptEvent;
    update({ available: true, error: "" });
  };

  const installed = () => {
    appInstalled = true;
    deferredPrompt = null;
    update({ installed: true, available: false, error: "" });
  };

  window.addEventListener("beforeinstallprompt", beforeInstall);
  window.addEventListener("appinstalled", installed);
  window.addEventListener("pageshow", checkStandalone);

  standalone.addEventListener("change", checkStandalone);

  checkStandalone();

  cleanup = () => {
    window.removeEventListener("beforeinstallprompt", beforeInstall);
    window.removeEventListener("appinstalled", installed);
    window.removeEventListener("pageshow", checkStandalone);
    standalone.removeEventListener("change", checkStandalone);
    deferredPrompt = null;
    cleanup = undefined;
  };
  return cleanup;
}

export async function promptInstall() {
  if (!deferredPrompt || prompting || snapshot.installed) return;

  const event = deferredPrompt;

  deferredPrompt = null;

  prompting = true;

  update({ available: false, error: "" });

  try {
    await event.prompt();
    const { outcome } = await event.userChoice;

    return outcome;
  } catch {
    if (!snapshot.installed) {
      update({
        error: "Instalasi belum dapat dibuka. Coba lagi melalui menu browser.",
      });
    }
  } finally {
    prompting = false;
  }
}
