import {
  useMemo,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./Table.css";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { CellContext } from "@tanstack/table-core";

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    align?: "left" | "right";
  }
}

type ProdutoAPI = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  validade: string;
};

const Table = forwardRef((_, ref) => {
  const [data, setData] = useState<Produto[]>([]);

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
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    reloadData: fetchData,
  }));

  type Produto = {
    produto: string;
    quantidade: number;
    valor: number;
    validade: string;
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
      columnHelper.display({
        id: "acoes",
        header: "Ações",
        cell: () => (
          <button className="btn-action">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="6"
              viewBox="0 0 24 6"
              fill="none"
            >
              <path
                d="M21.5 5.49995C22.8807 5.49995 24 4.38068 24 2.99998C24 1.61928 22.8807 0.5 21.5 0.5C20.1193 0.5 19 1.61928 19 2.99998C19 4.38068 20.1193 5.49995 21.5 5.49995Z"
                fill="#0D0D0D"
              />
              <path
                d="M12 5.49995C13.3807 5.49995 14.5 4.38068 14.5 2.99998C14.5 1.61928 13.3807 0.5 12 0.5C10.6193 0.5 9.5 1.61928 9.5 2.99998C9.5 4.38068 10.6193 5.49995 12 5.49995Z"
                fill="#0D0D0D"
              />
              <path
                d="M2.49998 5.49995C3.88069 5.49995 4.99997 4.38068 4.99997 2.99998C4.99997 1.61928 3.88069 0.5 2.49998 0.5C1.11928 0.5 0 1.61928 0 2.99998C0 4.38068 1.11928 5.49995 2.49998 5.49995Z"
                fill="#0D0D0D"
              />
            </svg>
          </button>
        ),
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
          className="body-medium"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>
        <span className="pagination-count small-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <button
          className="body-medium"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </button>
      </div>
    </div>
  );
});

export default Table;
