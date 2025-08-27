import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../client.js";

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    url: "",
    imageURL: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setErrorMsg(error.message);
      } else if (data) {
        setForm({
          name: data.name ?? "",
          url: data.url ?? "",
          imageURL: data.imageURL ?? data.image_url ?? "",
          description: data.description ?? "",
        });
      }
      setLoading(false);
    }
    if (id) load();
  }, [id]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    const updateRow = {
      name: form.name,
      url: form.url,
      description: form.description,
      imageURL: form.imageURL || null,
    };

    const { error } = await supabase
      .from("creators")
      .update(updateRow)
      .eq("id", id);

    setSaving(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    navigate(`/creators/${id}`);
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <Link to={`/creators/${id}`} style={{ display: "inline-block", marginBottom: 12 }}>
        &larr; Cancel
      </Link>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Edit Creator</h1>

      {errorMsg ? (
        <div style={{ marginBottom: 12, color: "crimson" }}>Error: {errorMsg}</div>
      ) : null}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          <div>Name</div>
          <input name="name" value={form.name} onChange={onChange} required style={{ width: "100%", padding: 8 }} />
        </label>

        <label>
          <div>URL</div>
          <input name="url" value={form.url} onChange={onChange} style={{ width: "100%", padding: 8 }} />
        </label>

        <label>
          <div>Image URL</div>
          <input name="imageURL" value={form.imageURL} onChange={onChange} style={{ width: "100%", padding: 8 }} />
        </label>

        <label>
          <div>Description</div>
          <textarea name="description" value={form.description} onChange={onChange} rows={4} style={{ width: "100%", padding: 8 }} />
        </label>

        <button type="submit" disabled={saving} style={{ padding: "10px 14px", borderRadius: 8 }}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </main>
  );
}
