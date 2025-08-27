import { FaYoutube, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Card({ creator = {} }) {
  const { name, url, description, imageURL, id } = creator;

  return (
    <article className="card overlay-card">
      {imageURL && (
        <img
          src={imageURL}
          alt={name || "creator image"}
          className="card-img"
        />
      )}

      <div className="card-content">
        {/* Title row with info icon on the far right */}
        <div className="card-title-row">
          <h3 className="card-title">{name}</h3>
          <Link to={`/creators/${id}`} className="card-link">
            <FaInfoCircle size={26} />
          </Link>
        </div>

        {/* YouTube icon stays in its own line */}
        {url && (
          <p className="card-linkline">
            <a href={url} target="_blank" rel="noreferrer" className="card-link">
              <FaYoutube size={36} color="#FF0000" />
            </a>
          </p>
        )}

        {description && <p className="card-desc">{description}</p>}
      </div>
    </article>
  );
}
