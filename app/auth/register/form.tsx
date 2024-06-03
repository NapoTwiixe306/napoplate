"use client";
import React, { FormEvent, useState } from "react";
import * as z from "zod";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

const updateState = (name: string, value: string, setValues: React.Dispatch<React.SetStateAction<{ email: string; password: string; }>>, setErrors: React.Dispatch<React.SetStateAction<{ email: string; password: string; }>>) => {
  setValues((prevValues) => ({ ...prevValues, [name]: value }));
  setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
};

const handleErrors = (error: unknown, setErrors: React.Dispatch<React.SetStateAction<{ email: string; password: string; }>>) => {
  if (error instanceof z.ZodError) {
    error.errors.forEach((err) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [err.path[0]]: err.message,
      }));
    });
  } else {
    console.error("Unexpected error:", error);
  }
};


const Form = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateState(name, value, setValues, setErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Valider les données du formulaire
      const validationResult = FormSchema.safeParse(values);
      if (!validationResult.success) {
        throw new Error(validationResult.error.errors[0].message);
      }
  
      // Envoyer la requête au serveur
      const response = await fetch("/api/auth/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      // Vérifier la réponse du serveur
      if (response.ok) {
        console.log("Compte créé avec succès !");
        window.location.href = "/auth/signin";
      } else {
        // Gérer les erreurs de réponse
        const data = await response.json();
        console.error("Erreur API :", data.message);
      }
    } catch (error) {
      // Gérer les erreurs de validation ou de requête
      handleErrors(error, setErrors);
    }
  };  
  

  const emailInputClasses = ` ${errors.email && ""}`;

  return (
    <form onSubmit={handleSubmit} className="">
      <label>
        <span className="">Email :</span>
        <input
          name="email"
          className={emailInputClasses}
          type="email"
          placeholder="Entrez votre email..."
          value={values.email}
          onChange={handleChange}
        />
      </label>
      {errors.email && <p className="">{errors.email}</p>}

      <label>
        <span className="">Mot de passe :</span>
        <input
          name="password"
          className={` ${errors.password && ""}`}
          type="password"
          placeholder="Entrez votre mot de passe..."
          value={values.password}
          onChange={handleChange}
        />
      </label>
      {errors.password && <p className="">{errors.password}</p>}

      <button
        type="submit"
        className=""
      >
        signup
      </button>
    </form>
  );
};

export default Form;
