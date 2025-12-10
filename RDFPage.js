import { useState, useEffect } from "react";

export default function RDFPage({ user }) {
  const [format, setFormat] = useState("turtle");
  const [rdfData, setRdfData] = useState({ turtle: "", xml: "", jsonld: "" });

  useEffect(() => {
    if (user) {
      // --- RDF con datos del usuario ---
      const turtle = `
@prefix ex: <https://wildroots.com#> .
@prefix schema: <https://schema.org/> .

ex:${user.username || user.id} a schema:Person ;
  schema:name "${user.name}" ;
  schema:email "${user.email}" ;
  schema:homeLocation "${user.country}" ;
  schema:memberOf ex:WildRoots .

ex:WildRoots a schema:TouristInformationCenter ;
  schema:name "WildRoots" ;
  schema:description "Plataforma de turismo sostenible en Arequipa, Perú." ;
  schema:url <https://wildroots.com> ;
  schema:logo <https://wildroots.com/logo.png> .
      `;

      const xml = `
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:schema="https://schema.org/">

  <schema:Person rdf:about="https://wildroots.com#${user.username || user.id}">
    <schema:name>${user.name}</schema:name>
    <schema:email>${user.email}</schema:email>
    <schema:homeLocation>${user.country}</schema:homeLocation>
    <schema:memberOf rdf:resource="https://wildroots.com#WildRoots" />
  </schema:Person>

  <schema:TouristInformationCenter rdf:about="https://wildroots.com#WildRoots">
    <schema:name>WildRoots</schema:name>
    <schema:description>Plataforma de turismo sostenible en Arequipa, Perú.</schema:description>
    <schema:url>https://wildroots.com</schema:url>
    <schema:logo>https://wildroots.com/logo.png</schema:logo>
  </schema:TouristInformationCenter>

</rdf:RDF>
      `;

      const jsonld = `
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://wildroots.com#${user.username || user.id}",
      "name": "${user.name}",
      "email": "${user.email}",
      "homeLocation": "${user.country}",
      "memberOf": "https://wildroots.com#WildRoots"
    },
    {
      "@type": "TouristInformationCenter",
      "@id": "https://wildroots.com#WildRoots",
      "name": "WildRoots",
      "description": "Plataforma de turismo sostenible en Arequipa, Perú.",
      "url": "https://wildroots.com",
      "logo": "https://wildroots.com/logo.png"
    }
  ]
}
      `;

      setRdfData({ turtle, xml, jsonld });
    } else {
      // --- RDF solo de WildRoots (sin usuario) ---
      const turtle = `
@prefix ex: <https://wildroots.com#> .
@prefix schema: <https://schema.org/> .

ex:WildRoots a schema:TouristInformationCenter ;
  schema:name "WildRoots" ;
  schema:description "Plataforma de turismo sostenible en Arequipa, Perú." ;
  schema:location "Arequipa, Perú" ;
  schema:url <https://wildroots.com> ;
  schema:logo <https://wildroots.com/logo.png> .
      `;

      const xml = `
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:schema="https://schema.org/">

  <schema:TouristInformationCenter rdf:about="https://wildroots.com#WildRoots">
    <schema:name>WildRoots</schema:name>
    <schema:description>Plataforma de turismo sostenible en Arequipa, Perú.</schema:description>
    <schema:location>Arequipa, Perú</schema:location>
    <schema:url>https://wildroots.com</schema:url>
    <schema:logo>https://wildroots.com/logo.png</schema:logo>
  </schema:TouristInformationCenter>

</rdf:RDF>
      `;

      const jsonld = `
{
  "@context": "https://schema.org",
  "@type": "TouristInformationCenter",
  "@id": "https://wildroots.com#WildRoots",
  "name": "WildRoots",
  "description": "Plataforma de turismo sostenible en Arequipa, Perú.",
  "location": "Arequipa, Perú",
  "url": "https://wildroots.com",
  "logo": "https://wildroots.com/logo.png"
}
      `;

      setRdfData({ turtle, xml, jsonld });
    }
  }, [user]);


  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <br /><br /><br />
      <h2>
        {user ? `Representación RDF de ${user.name}` : "Representación RDF de WildRoots"}
      </h2>

      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        style={{ margin: "15px", padding: "8px" }}
      >
        <option value="turtle">Turtle (.ttl)</option>
        <option value="xml">RDF/XML (.rdf)</option>
        <option value="jsonld">JSON-LD (.jsonld)</option>
      </select>

      <pre
        style={{
          textAlign: "left",
          background: "#f4f4f4",
          color: "#000",
          padding: "15px",
          borderRadius: "8px",
          overflowX: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {rdfData[format]}
      </pre>
    </div>
  );
}
