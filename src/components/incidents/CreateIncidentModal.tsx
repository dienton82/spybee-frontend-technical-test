"use client";

import { useEffect } from "react";

import type { CreateIncidentInput, Incident } from "@/types/incident";

import IncidentForm from "./IncidentForm";

interface CreateIncidentModalProps {
  incidents: Incident[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateIncidentInput) => void;
}

export default function CreateIncidentModal({
  incidents,
  isOpen,
  onClose,
  onSubmit,
}: CreateIncidentModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-labelledby="create-incident-title"
      aria-modal="true"
      className="modal"
      onMouseDown={onClose}
      role="dialog"
    >
      <div
        className="modal__panel"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal__header">
          <div>
            <p className="modal__eyebrow">Nueva incidencia</p>
            <h2 id="create-incident-title">Registrar hallazgo en mapa</h2>
          </div>
          <button
            aria-label="Cerrar modal"
            className="modal__close"
            onClick={onClose}
            type="button"
          >
            <svg aria-hidden="true" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 18 18" width="18">
              <path d="M2 2l14 14M16 2L2 16" />
            </svg>
          </button>
        </div>
        <IncidentForm incidents={incidents} onCancel={onClose} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
