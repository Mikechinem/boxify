"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type ModalSource = {
  sourceSection: string;
  sourceLabel: string;
};

type FulfilmentRequestContextValue = {
  openModal: (source: ModalSource) => void;
  closeModal: () => void;
};

const FulfilmentRequestContext =
  createContext<FulfilmentRequestContextValue | null>(null);

export function FulfilmentRequestProvider({
  children,
}: {
  children: ReactNode;
}) {
  function openModal(source: ModalSource) {
    if (typeof window === "undefined") return;

    try {
      window.sessionStorage.setItem(
        "boxify_modal_source",
        JSON.stringify(source)
      );
    } catch {
      // Ignore storage errors.
    }

    window.location.hash = "fulfilment-request-modal";
  }

  function closeModal() {
    if (typeof window === "undefined") return;

    window.location.hash = "";
  }

  return (
    <FulfilmentRequestContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
    </FulfilmentRequestContext.Provider>
  );
}

export function useFulfilmentRequest() {
  const context = useContext(FulfilmentRequestContext);

  if (!context) {
    throw new Error(
      "useFulfilmentRequest must be used inside FulfilmentRequestProvider."
    );
  }

  return context;
}