import { table } from "console";
import React, { use, useEffect, useState } from "react";
import styles from "./table.module.css";

type Provider = {
  id: string;
  name: string;
  fullname: string;
  description?: string;
  location?: string;
  country?: string;
  contact?: string;
  url?: string;
  defaultPolicy?: string;
};

export default function ProviderTable() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    fullname: "",
    description: "",
    location: "",
    country: "",
    contact: "",
    url: "",
    defaultPolicy: "",
  });

  const clearForm = () => {
    setFormData({
      id: "",
      name: "",
      fullname: "",
      description: "",
      location: "",
      country: "",
      contact: "",
      url: "",
      defaultPolicy: "",
    });
  };

  useEffect(() => {
    async function fetchProviders() {
      try {
        const username = "user";
        const password = "secret";
        const basicAuth = "Basic " + btoa(`${username}:${password}`);

        const response = await fetch("http://127.0.0.1:3080/api/provider", {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch providers");
        }
        const data = await response.json();
        setProviders(data);
      } catch (error: any) {
        alert(error.message);
      }
    }
    fetchProviders();
  }, []);

  useEffect(() => {
    if (showModifyModal && formData.id) {
      const found = providers.find((p) => p.id === formData.id);
      if (found) {
        setFormData({
          id: found.id,
          name: found.name,
          fullname: found.fullname,
          description: found.description || "",
          location: found.location || "",
          country: found.country || "",
          contact: found.contact || "",
          url: found.url || "",
          defaultPolicy: found.defaultPolicy || "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.id, showModifyModal]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const username = "user";
    const password = "secret";
    const basicAuth = "Basic " + btoa(`${username}:${password}`);
    try {
      const response = await fetch("http://127.0.0.1:3080/api/provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMsg = "Failed to create provider:";
        try {
          const errorData = await response.json();
          errorMsg = errorMsg + " " + (errorData.error || "Unknown error");
        } catch {
          // Se non è JSON, lascia il messaggio generico
        }
        throw new Error(errorMsg);
      }

      const newProvider = await response.json();

      setProviders([...providers, newProvider]);
      setShowModal(false);
      setFormData({
        id: "",
        name: "",
        fullname: "",
        description: "",
        location: "",
        country: "",
        contact: "",
        url: "",
        defaultPolicy: "",
      });
    } catch (errorMsg: any) {
      alert(errorMsg.message);
    }
  }

  async function handleModifySubmit(e: React.FormEvent) {
    e.preventDefault();

    const username = "user";
    const password = "secret";
    const basicAuth = "Basic " + btoa(`${username}:${password}`);

    try {
      const response = await fetch(
        `http://127.0.0.1:3080/api/provider/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: basicAuth,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        let errorMsg = "Failed to edit provider:";
        try {
          const errorData = await response.json();
          errorMsg = errorMsg + " " + (errorData.error || "Unknown error");
        } catch {
          // Se non è JSON, lascia il messaggio generico
        }
        throw new Error(errorMsg);
      }
      const updatedProvider = await response.json();

      setProviders((prev) =>
        prev.map((p) => (p.id === updatedProvider.id ? updatedProvider : p))
      );
      setShowModifyModal(false);
      setFormData({
        id: "",
        name: "",
        fullname: "",
        description: "",
        location: "",
        country: "",
        contact: "",
        url: "",
        defaultPolicy: "",
      });
    } catch (errorData: any) {
      alert(errorData.message);
    }
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.headerRow}> </div>
      <div style={{ display: "inline-block" }}>
        <table className={styles.table}>
          <caption className={styles.tableTitle}> Providers</caption>
          <thead>
            <tr>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Full Name</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Location</th>
              <th className={styles.th}>Country</th>
              <th className={styles.th}>Contact</th>
              <th className={styles.th}>Url</th>
              <th className={styles.th}>Default Policy</th>
            </tr>
          </thead>
          <tbody>
            {providers.length === 0 ? (
              <tr>
                <td
                  className={styles.td}
                  colSpan={11}
                  style={{ textAlign: "center", fontStyle: "italic" }}
                >
                  No Provider Found
                </td>
              </tr>
            ) : (
              providers.map((provider) => (
                <tr key={provider.id}>
                  <td className={styles.td}>{provider.id}</td>
                  <td className={styles.td}>{provider.name}</td>
                  <td className={styles.td}>{provider.fullname}</td>
                  <td className={styles.td}>{provider.description || "-"}</td>
                  <td className={styles.td}>{provider.location || "-"}</td>
                  <td className={styles.td}>{provider.country || "-"}</td>
                  <td className={styles.td}>{provider.contact || "-"}</td>
                  <td className={styles.td}>{provider.url || "-"}</td>
                  <td className={styles.td}>{provider.defaultPolicy || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div
          style={{
            marginTop: "20px",
            textAlign: "left",
            display: "flex",
            gap: "15px",
          }}
        >
          <button
            className={styles.addButton}
            onClick={() =>{ clearForm(); setShowModal(true);}}
          >
            Add Provider
          </button>
          <button
            className={styles.addButton}
            onClick={() => setShowModifyModal(true)}
          >
            Edit Provider
          </button>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              onClick={() => {setShowModal(false);clearForm(); }}
              className={styles.closebutton}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className={styles.h3TitleButton}>Add new Provider</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={styles.inputAddProvider}
                />
                <input
                  name="fullname"
                  placeholder="Full name"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                  className={styles.inputAddProvider}
                />
                <input
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="contact"
                  placeholder="Contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="url"
                  placeholder="Url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="defaultPolicy"
                  placeholder="Default Policy"
                  value={formData.defaultPolicy}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <button type="submit" className={styles.savebutton}>
                  Save
                </button>
                <button
                  type="button"
                  className={styles.clearbutton}
                  onClick={() => clearForm()}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModifyModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              onClick={() =>{setShowModifyModal(false); clearForm(); }}
              className={styles.closebutton}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className={styles.h3TitleButton}>Edit a Provider</h3>
            <form onSubmit={handleModifySubmit}>
              <div className={styles.formGrid}>
                <input
                  name="id"
                  placeholder="Unique Identifier"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                  className={styles.inputAddProvider}
                />
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="fullname"
                  placeholder="Full name"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="contact"
                  placeholder="Contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="url"
                  placeholder="Url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
                <input
                  name="defaultPolicy"
                  placeholder="Default Policy"
                  value={formData.defaultPolicy}
                  onChange={handleInputChange}
                  className={styles.inputAddProvider}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <button type="submit" className={styles.savebutton}>
                  Save
                </button>
                <button
                  type="button"
                  className={styles.clearbutton}
                  onClick={() => clearForm()}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
