import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button ,Radio} from "flowbite-react";
export default function Provider() {
  const [policies, setPolicies] = useState([]);

  const handleAddProvider = () => {
    const newProvider = {
         id: "nuovo id",
        name: "nuovo nome",
        fullname: "full name",
        description: "description",
        location: "location",
        country: "country",
        contact: "contact",
        url: "url",
        defaultPolicy: "default policy",
    };

    setPolicies([...policies, newProvider]);
  };

  return (
    <div className="w-full space-y-4">
      <Button onClick={handleAddProvider}>Aggiungi provider</Button>

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
              <TableHeadCell><Button color="blue" onClick={handleAddProvider}>Aggiungi provider</Button>
              </TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="divide-y">
            {policies.map((provider) => (
              <TableRow key={provider.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {provider.name}
                </TableCell>
                <TableCell>{provider.name}</TableCell>
                <TableCell>{provider.fullname}</TableCell>
                <TableCell>{provider.description}</TableCell>
                <TableCell>{provider.location}</TableCell>
                <TableCell>{provider.country}</TableCell>
                <TableCell>{provider.contact}</TableCell>
                <TableCell>{provider.url}</TableCell>
                <TableCell>{provider.defaultPolicy}</TableCell>
                <TableCell><Radio></Radio>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
