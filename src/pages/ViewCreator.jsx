import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../client.js";

export default function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleDelete() {
    if (!window.confirm("Delete this creator?")) return;
    const { error } = await supabase.from("creators").delete().eq("id", id);
    if (error) {
      alert("Error: " + error.message);
    } else {
      navigate("/"); // back to home after delete
    }
  }

  useEffect(() => {
    async function loadCreator() {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setErrorMsg(error.message);
      } else {
        setCreator({
          ...data,
          imageURL: data.imageURL ?? data.image_url ?? data.image,
        });
      }
      setLoading(false);
    }
    if (id) loadCreator();
  }, [id]);
  
  if (loading) return <main style={{ padding: 16 }}></main>;
  if (errorMsg) return <main style={{ padding: 16, color: "crimson" }}>Error: {errorMsg}</main>;
  if (!creator) return <main style={{ padding: 16 }}>Not found.</main>;

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
        <Link to="/" style={{ display: "inline-block", marginBottom: 12 }}>&larr; Back</Link>

        <Link to={`/creators/${id}/edit`} style={{ display: "inline-block", marginBottom: 12, marginLeft: 12 }}> Edit </Link>

        <button
        onClick={handleDelete}
        style={{
            background: "crimson",
            color: "white",
            padding: "6px 12px",
            borderRadius: 6,
            border: "none",
            marginLeft: 12,
            cursor: "pointer",
        }}
        >
        Delete
        </button>
      {creator.imageURL ? (
        <img
          src={creator.imageURL}
          alt={creator.name || "creator image"}
          style={{ width: "100%", maxHeight: 320, objectFit: "cover", borderRadius: 12, marginBottom: 16 }}
        />
      ) : null}

      <h1 style={{ fontSize: 28, margin: "0 0 8px" }}>{creator.name}</h1>

      {creator.url ? (
        <p style={{ margin: "0 0 8px" }}>
          <a href={creator.url} target="_blank" rel="noreferrer">{creator.url}</a>
        </p>
      ) : null}

      {creator.description ? <p style={{ lineHeight: 1.5 }}>{creator.description}</p> : null}
    </main>
  );
}
