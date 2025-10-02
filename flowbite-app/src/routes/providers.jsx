import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  Radio,
  TextInput,
  Label,
} from "flowbite-react";

export default function Provider() {
  const [policies, setPolicies] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProvider = () => {
    if (!formData.id || !formData.name) {
      alert("Id e Name sono obbligatori");
      return;
    }
    setPolicies([...policies, formData]);
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
    setShowForm(false);
  };

  return (
    <div className="w-full p-4 space-y-6">
      {/* Pulsante in alto */}
      <div className="flex justify-end">
        <Button onClick={() => setShowForm(true)}>Aggiungi provider</Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="border p-4 rounded max-w-3xl space-y-4">
          {[
            "id",
            "name",
            "fullname",
            "description",
            "location",
            "country",
            "contact",
            "url",
            "defaultPolicy",
          ].map((field) => (
            <div key={field}>
              <Label
                htmlFor={field}
                value={field.charAt(0).toUpperCase() + field.slice(1)}
              />
              <TextInput
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={field === "id" || field === "name"}
              />
            </div>
          ))}

          <div className="flex space-x-2">
            <Button onClick={handleAddProvider} color="success">
              Salva provider
            </Button>
            <Button color="gray" onClick={() => setShowForm(false)}>
              Annulla
            </Button>
          </div>
        </div>
      )}

      {/* Tabella */}
      <div className="overflow-x-auto">
        <Table hoverable className="min-w-full">
          <TableHead>
            <TableRow>
              <TableHeadCell>Id</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Fullname</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell>Location</TableHeadCell>
              <TableHeadCell>Country</TableHeadCell>
              <TableHeadCell>Contact</TableHeadCell>
              <TableHeadCell>Url</TableHeadCell>
              <TableHeadCell>Default Policy</TableHeadCell>
              <TableHeadCell>
                <Radio disabled />
              </TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="divide-y">
            {policies.map((provider) => (
              <TableRow
                key={provider.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {provider.id}
                </TableCell>
                <TableCell>{provider.name}</TableCell>
                <TableCell>{provider.fullname}</TableCell>
                <TableCell>{provider.description}</TableCell>
                <TableCell>{provider.location}</TableCell>
                <TableCell>{provider.country}</TableCell>
                <TableCell>{provider.contact}</TableCell>
                <TableCell>{provider.url}</TableCell>
                <TableCell>{provider.defaultPolicy}</TableCell>
                <TableCell>
                  <Radio disabled />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
