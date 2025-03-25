"use client"
import { FormEvent } from "react";
import { changeProfile } from "@/lib/handler/user";
import React from "react";

type ImageForm = {
  closeState: () => void;
  imagePreview: (filename: FileList | null) => void;
  setFormStatus: React.Dispatch<React.SetStateAction<{ success: boolean | null; message: string | null }>>;
}


export default function ImageForm({ closeState, imagePreview, setFormStatus }: ImageForm) {
  async function uploadImage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const upload = await changeProfile(formData);

    if (upload) {
      setFormStatus(upload);
    }
  }

  return (
    <form className="flex lg:flex-row flex-col w-full border border-black/20 p-4 rounded-lg gap-y-3" onSubmit={uploadImage}>

      <input type="file" name="image" className="border-sky-600 border p-2 rounded-lg" accept=".jpg, .jpeg., .png, .pdf" onChange={(e) => { imagePreview(e.target.files) }} />
      <div className="place-content-end flex lg:flex-row gap-3 w-full">
        <button className="px-7 py-3 border border-sky-600 rounded-lg text-sky-600 hover:text-white hover:bg-sky-600 transition-all transition-duration-300  shadow-lg lg:w-min w-full" type={"submit"}>Update</button>
        <button className="px-7 py-3  border border-slate-600 rounded-lg hover:text-white hover:bg-slate-600 transition-all transition-duration-300  shadow-lg lg:w-min w-full" type={"button"} onClick={closeState}>Cancel</button>
      </div>

    </form>
  );
}
