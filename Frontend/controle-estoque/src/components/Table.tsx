import React, { useMemo, useState, useEffect } from "react";
import "./Table.css";

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    align?: "left" | "right";
  }
}
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { CellContext } from "@tanstack/table-core";

type ProdutoAPI = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  validade: string;
};

const Table = () => {
  const [data, setData] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5000/produtos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result: ProdutoAPI[] = await response.json();
        const formattedData = result.map((item) => ({
          produto: item.nome,
          quantidade: item.quantidade,
          valor: item.preco,
          validade: new Date(item.validade).toLocaleDateString("pt-BR"),
          status: item.quantidade > 0 ? "Ativo" : "Inativo",
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  type Produto = {
    produto: string;
    quantidade: number;
    valor: number;
    validade: string;
    status: string;
  };

  const columnHelper = createColumnHelper<Produto>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("produto", {
        header: "Produto",
        cell: (info: CellContext<Produto, string>) => info.getValue(),
        meta: { align: "left" },
      }),
      columnHelper.accessor("quantidade", {
        header: "Quantidade",
        cell: (info: CellContext<Produto, number>) => info.getValue(),
        meta: { align: "left" },
      }),
      columnHelper.accessor("valor", {
        header: "Valor",
        cell: (info: CellContext<Produto, number>) =>
          `R$ ${info.getValue().toFixed(2)}`,
        meta: { align: "left" },
      }),
      columnHelper.accessor("validade", {
        header: "Validade",
        cell: (info: CellContext<Produto, string>) => info.getValue(),
        meta: { align: "left" },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info: CellContext<Produto, string>) => info.getValue(),
        meta: { align: "left" },
      }),
      columnHelper.display({
        id: "acoes",
        header: "Ações",
        cell: () => <button className="btn-action">Editar</button>,
        meta: { align: "right" },
      }),
    ],
    []
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="table-container">
      <table className="table-custom">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={
                    (header.column.columnDef.meta?.align === "right"
                      ? "col-right"
                      : "col-left") + " body-medium"
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={
                    (cell.column.columnDef.meta?.align === "right"
                      ? "col-right"
                      : "col-left") + " body-medium"
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>
        <span>
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Table;
