/**
 * IntegrationConnectButton — connect or disconnect a POD platform.
 *
 * When disconnected: shows "Connect" button.
 * When connected: shows "Disconnect" button with a confirm flow.
 */

import { Component, createSignal, Show } from 'solid-js';
import type { PODPlatform } from '../../lib/pod/types';

interface IntegrationConnectButtonProps {
  platform: PODPlatform;
  isConnected: boolean;
  loading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const IntegrationConnectButton: Component<
  IntegrationConnectButtonProps
> = (props) => {
  const [confirming, setConfirming] = createSignal(false);

  const handleClick = () => {
    if (props.isConnected) {
      if (confirming()) {
        props.onDisconnect();
        setConfirming(false);
      } else {
        setConfirming(true);
        // Auto-cancel confirm after 5s
        setTimeout(() => setConfirming(false), 5000);
      }
    } else {
      props.onConnect();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={props.loading}
      class={`
        inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
          props.isConnected
            ? confirming()
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'border border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }
      `}
    >
      <Show when={props.loading} fallback={null}>
        <svg
          class="-ml-0.5 mr-1.5 h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </Show>

      {props.loading
        ? props.isConnected
          ? 'Disconnecting...'
          : 'Connecting...'
        : props.isConnected
          ? confirming()
            ? 'Confirm disconnect'
            : 'Disconnect'
          : 'Connect'}
    </button>
  );
};
