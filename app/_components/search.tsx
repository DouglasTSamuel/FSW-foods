"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!searchTerm) return;
    router.push(`/restaurants?search=${searchTerm}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleInputChange}
        value={searchTerm}
      />
      <Button size="icon" aria-label="Fazer busca" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
