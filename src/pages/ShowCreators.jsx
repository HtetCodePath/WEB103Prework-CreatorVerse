import { Link, Outlet, useOutlet } from "react-router-dom";
import Card from "../components/Card";

export default function ShowCreators({ creators = [], loading = false, errorMsg = "" }) {
  const outlet = useOutlet(); 

  if (loading) return <main className="container main">Loading…</main>;
  if (errorMsg) return <main className="container main" style={{ color: "crimson" }}>Error: {errorMsg}</main>;

  return (
    <main className="container main">
      <section
        className="hero"
        style={{
          backgroundImage: "url('/background3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <h1 className="hero-title">Creatorverse</h1>
        <div className="hero-actions">
          <a href="#cards" className="btn btn-primary">View All Creators</a>
          <Link to="creators/new" className="btn btn-outline">Add a Creator</Link>
        </div>
      </section>

      <section id="cards" className="cards-section">
        {outlet ? (
          <div className="detail-pane">{outlet}</div>
        ) : creators.length === 0 ? (
          <div className="empty">
            <p>No content creators yet. Add a couple in Supabase, then come back here.</p>
            <Link to="creators/new" className="btn btn-primary">Add your first</Link>
          </div>
        ) : (

          <ul className="cards two-col" role="list">
            {creators.map((c) => (
              <li key={c.id}>
                <Link to={`creators/${c.id}`} className="card-link">
                  <Card creator={c} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
