// import React from 'react'

// export default function TaskHookForm() {
//   return (
//     <div>Formunuzu react-hook-form kullanarak burada oluşturun. TaskForm dosyasındaki HTML yapısını vs app.css içerisindeki classları kullanabilirsiniz.</div>
//   )
// }

import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import "./app.css";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: nanoid(5), // unique bir id oluşturduk
      title: "",
      description: "",
      people: [],
    },
  });

  const onSubmit = (data, e) => {
    submitFn({
      ...data,
      status: "yapılacak",
    });
    e.target.reset();
  };

  const validateTitle = (value) => {
    return value.trim().length >= 3 || "Task başlığı en az 3 karakter olmalı";
  };

  const validateDescription = (value) => {
    return (
      value.trim().length >= 10 || "Task açıklaması en az 10 karakter olmalı"
    );
  };

  const validatePeople = (value) => {
    return (
      (value.length >= 1 && value.length <= 3) ||
      "Lütfen en az bir, en fazla üç kişi seçin"
    );
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", { validate: validateTitle })}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", { validate: validateDescription })}
        ></textarea>
        <p className="input-error">{errors.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", { validate: validatePeople })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit">
          Kaydet
        </button>
      </div>
    </form>
  );
}
