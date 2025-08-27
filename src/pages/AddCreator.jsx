import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../client.js";

export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    url: "",
    imageURL: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    const row = {
      name: form.name,
      url: form.url,
      description: form.description,
      imageURL: form.imageURL || null, 
    };

    const { data, error } = await supabase
    .from("creators")
    .insert(row)
    .select()
    .single();

    setSaving(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (data?.id) {
    navigate(`/creators/${data.id}`);
  } else {
    navigate("/");
  }
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: 12 }}>&larr; Back</Link>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Add Creator</h1>

      {errorMsg ? (
        <div style={{ marginBottom: 12, color: "crimson" }}>Error: {errorMsg}</div>
      ) : null}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          <div>Name</div>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="LazarBeam"
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          <div>URL</div>
          <input
            name="url"
            value={form.url}
            onChange={onChange}
            placeholder="https://www.youtube.com/@LazarBeam"
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          <div>Image URL</div>
          <input
            name="imageURL"
            value={form.imageURL}
            onChange={onChange}
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          <div>Description</div>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
            placeholder="Funny Australian gamer and content creator."
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          style={{ padding: "10px 14px", borderRadius: 8 }}
        >
          {saving ? "Saving…" : "Create"}
        </button>
      </form>
    </main>
  );
}
