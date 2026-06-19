"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import type {
  CreateIncidentInput,
  Incident,
  IncidentPriority,
} from "@/types/incident";

interface IncidentFormProps {
  incidents: Incident[];
  onCancel: () => void;
  onSubmit: (input: CreateIncidentInput) => void;
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  priority?: string;
}

export default function IncidentForm({
  incidents,
  onCancel,
  onSubmit,
}: IncidentFormProps) {
  const categoryOptions = useMemo(() => {
    return Array.from(new Set(incidents.map((incident) => incident.type.name))).sort();
  }, [incidents]);

  const [values, setValues] = useState<CreateIncidentInput>({
    title: "",
    description: "",
    dueDate: "",
    category: "",
    priority: "medium",
    locationDescription: "",
    lat: undefined,
    lng: undefined,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = () => {
    setValues({
      title: "",
      description: "",
      dueDate: "",
      category: "",
      priority: "medium",
      locationDescription: "",
      lat: undefined,
      lng: undefined,
    });
    setErrors({});
  };

  const handleChange = <K extends keyof CreateIncidentInput>(
    key: K,
    value: CreateIncidentInput[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = "El titulo es obligatorio.";
    }

    if (!values.description.trim()) {
      nextErrors.description = "La descripcion es obligatoria.";
    }

    if (!values.category.trim()) {
      nextErrors.category = "La categoria es obligatoria.";
    }

    if (!values.priority) {
      nextErrors.priority = "La prioridad es obligatoria.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit(values);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <form className="incident-form" onSubmit={handleSubmit}>
      <div className="incident-form__grid">
        <label>
          <span>Titulo</span>
          <input
            className="form-control"
            onChange={(event) => handleChange("title", event.target.value)}
            placeholder="Ej. Fisura en fachada norte"
            value={values.title}
          />
          {errors.title ? <small>{errors.title}</small> : null}
        </label>

        <label>
          <span>Categoria</span>
          <select
            className="form-control form-control--select"
            onChange={(event) => handleChange("category", event.target.value)}
            value={values.category}
          >
            <option value="">Selecciona una categoria</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.category ? <small>{errors.category}</small> : null}
        </label>

        <label className="incident-form__full">
          <span>Descripcion</span>
          <textarea
            className="form-control"
            onChange={(event) => handleChange("description", event.target.value)}
            placeholder="Describe la incidencia detectada en obra"
            rows={4}
            value={values.description}
          />
          {errors.description ? <small>{errors.description}</small> : null}
        </label>

        <label>
          <span>Prioridad</span>
          <select
            className="form-control form-control--select"
            onChange={(event) =>
              handleChange("priority", event.target.value as IncidentPriority)
            }
            value={values.priority}
          >
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
          {errors.priority ? <small>{errors.priority}</small> : null}
        </label>

        <label>
          <span>Fecha de vencimiento</span>
          <input
            className="form-control"
            onChange={(event) => handleChange("dueDate", event.target.value)}
            type="date"
            value={values.dueDate}
          />
        </label>

        <label className="incident-form__full">
          <span>Ubicacion textual</span>
          <input
            className="form-control"
            onChange={(event) =>
              handleChange("locationDescription", event.target.value)
            }
            placeholder="Ej. Torre B, piso 7, costado oriental"
            value={values.locationDescription}
          />
        </label>

        <label>
          <span>Latitud opcional</span>
          <input
            className="form-control"
            onChange={(event) =>
              handleChange(
                "lat",
                event.target.value ? Number(event.target.value) : undefined,
              )
            }
            placeholder="4.711"
            step="0.000001"
            type="number"
            value={values.lat ?? ""}
          />
        </label>

        <label>
          <span>Longitud opcional</span>
          <input
            className="form-control"
            onChange={(event) =>
              handleChange(
                "lng",
                event.target.value ? Number(event.target.value) : undefined,
              )
            }
            placeholder="-74.0721"
            step="0.000001"
            type="number"
            value={values.lng ?? ""}
          />
        </label>
      </div>

      <div className="incident-form__actions">
        <Button onClick={handleCancel} type="button" variant="secondary">
          Cancelar
        </Button>
        <Button type="submit">Guardar incidencia</Button>
      </div>
    </form>
  );
}
