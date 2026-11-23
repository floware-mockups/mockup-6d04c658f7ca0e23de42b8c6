// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("CategoriaControllo");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("CategoriaControllo");
import { useTable, type CellProps } from "../floware";

export default function CategoriaControllo({ pageId, rowIndex, value }: CellProps) {__mk();
  const table = useTable(pageId);
  if (!table || table.column("Controllo") < 0) return <span>{value}</span>;
  const controllo = table.value(rowIndex, "Controllo");
  const documentale = controllo === "Verifica atti di gara" || controllo === "Controllo documentazione progettuale";
  const temporale = controllo === "Verifica cronoprogramma lavori";
  if (!documentale && !temporale) return <span>{value}</span>;
  return (
    <div className={documentale ? "rounded-lg border border-(--mk-border) bg-(--mk-primary) p-3 text-(--mk-on-primary)" : "rounded-lg border border-(--mk-border) bg-(--mk-subtle) p-3 text-(--mk-text)"}>
      <div className="mb-1 text-xs font-semibold">{documentale ? "Verifica documentale" : "Pianificazione temporale"}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
