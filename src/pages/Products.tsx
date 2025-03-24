import { useState } from "react";
import Product from "../components/product";
import "../styles/Products.css";
import Navbar from "../components/navbar";

function Products() {
  const [fltr, setFilter] = useState<"all" | "favorites">("all");
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Navbar text="" onClick={undefined} />
      <div className="filtering">
        <div className="select-option">
          <select
            value={fltr}
            onChange={(e) => setFilter(e.target.value as "all" | "favorites")}
          >
            <option value="all">Список продуктов</option>
            <option value="favorites">Избранное</option>
          </select>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="products">
        <Product fltr={fltr} searchText={search} />
      </div>
    </>
  );
}

export default Products;
